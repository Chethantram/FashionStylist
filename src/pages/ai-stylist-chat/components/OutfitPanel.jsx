import React, { useEffect, useState, useMemo } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import axios from "axios";
import { analyzeOutfitDetails } from "services/geminiStyleService";
import { ChevronRight, Loader2, MoveRight } from "lucide-react";
import toast from "react-hot-toast";
import LoaderHanger from "components/Loader";

const LOCAL_STORAGE_KEY = "recommendations";

const OutfitPanel = ({
  isOpen,
  onClose,
  currentOutfit,
  onCustomizeOutfit,
  onSaveOutfit,
}) => {
  // 🔹 All hooks must be declared at top level (in same order each render)
  const [activeTab, setActiveTab] = useState("customize");
  const [customizationOptions, setCustomizationOptions] = useState([]);
  const [outfitAnalysis, setOutfitAnalysis] = useState(null);
  const [clothesLoading, setClothesLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [recommendations, setRecommendations] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedItems, setSelectedItems] = useState({
    tops: null,
    bottoms: null,
    shoes: null,
    accessories: null,
  });

  // 🔹 Fetch clothes (runs once)
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/clothes");
        if (response?.data?.data) {
          setCustomizationOptions(response.data.data);
        } else {
          setCustomizationOptions([]);
        }
      } catch (error) {
        console.error("Error fetching clothes:", error);
        setCustomizationOptions([]);
      } finally {
        setClothesLoading(false);
      }
    };
    fetchClothes();
  }, []);



  // 🔹 Group items by category
  const groupedItems = useMemo(() => {
    if (!Array.isArray(customizationOptions)) return new Map();
    return customizationOptions.reduce((acc, item) => {
      const category = item.category;
      if (!acc.has(category)) {
        acc.set(category, []);
      }
      acc.get(category).push(item);
      return acc;
    }, new Map());
  }, [customizationOptions]);

  // 🔹 Analyze outfit details when active tab is "details"
  useEffect(() => {
    const analyzeIfNeeded = async () => {
      if (activeTab === "details") {
        try {
          const analysis = await analyzeOutfitDetails(selectedItems);

          setOutfitAnalysis(analysis);
        } catch (err) {
          console.error("Error analyzing outfit:", err);
        } finally {
          setDetailsLoading(false);
        }
      }
    };
    analyzeIfNeeded();
  }, [activeTab, selectedItems]);

  // 🔹 Save recommendations in localStorage whenever updated
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recommendations));
  }, [recommendations]);

  // 🧩 Event handlers
  const handleItemSelect = (category, item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: item,
    }));
    onCustomizeOutfit(category, item);
  };

  const calculateTotalPrice = () => {
    return Object.values(selectedItems)
      .filter((item) => item)
      .reduce((total, item) => total + item?.price, 0);
  };

  const saveOutfit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/save-outfit",
        { outfit: selectedItems },
        { withCredentials: true }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Outfit saved successfully!");
      } else {
        toast.error(res?.data?.message || "Failed to save outfit.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductClick = async (productName) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/recommend", {
        item_name: productName, // <-- Use the clicked product's name
      });

      if (res.data.recommendations) {
        const newList = [...res.data.recommendations, ...recommendations];
        if (newList.length > 30) newList.splice(30);
        setCount(newList.length);
        setRecommendations(newList);
      } else {
        console.error("No recommendations found in response", res.data.error);
      }
    } catch (error) {
      console.error("Failed to fetch recommendations", error);
    }
  };

    if (clothesLoading) {
    return <LoaderHanger/>;
  }
  // 🧭 Tabs config
  const tabs = [
    { id: "customize", label: "Customize", icon: "Palette" },
    { id: "details", label: "Details", icon: "Info" },
    { id: "similar", label: "Similar", icon: "Search" },
  ];

  // 🧩 Renderers
  const renderCustomizeTab = () => (
    <div className="space-y-6">
      {groupedItems.size > 0
        ? Array.from(groupedItems.entries()).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-sm font-semibold text-brand-text-primary capitalize">
                {category}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {items.map((item) => (
                  <div
                    key={item?.id}
                    onClick={() => {
                      handleItemSelect(category, item);
                      handleProductClick(item?.name);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-smooth ${
                      selectedItems?.[category]?.id === item?.id
                        ? "border-brand-gold  border-2 bg-brand-cream"
                        : "border-border  hover:border-brand-gold hover:bg-muted"
                    }`}
                  >
                    <div className="aspect-square bg-white rounded-lg overflow-hidden mb-2">
                      <Image
                        src={item?.imageUrl}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h5 className="text-xs font-medium text-brand-text-primary mb-1 line-clamp-2">
                      {item?.name}
                    </h5>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-brand-gold font-semibold">
                        ${item?.price}
                      </p>
                      <a
                        target="_blank"
                        href={item?.link || "https://www.amazon.in/"}
                        className="flex items-center text-xs font-medium hover:text-brand-gold gap-1"
                      >
                        Link <ChevronRight className="size-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        : null}
    </div>
  );

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {/* Analysis */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="text-sm font-semibold text-brand-text-primary mb-3">
          Outfit Analysis
        </h4>
        {!outfitAnalysis ? (
          <p className="text-sm text-brand-text-secondary">
            No analysis available.
          </p>
        ) : (
          <div className="space-y-3 text-sm text-brand-text-secondary">
            <div className="flex justify-between">
              <span>Style Category:</span>
              <span className="text-brand-text-primary font-medium">
                {outfitAnalysis?.styleCategory}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Occasion:</span>
              <span className="text-brand-text-primary font-medium">
                {outfitAnalysis?.occasion}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Season:</span>
              <span className="text-brand-text-primary font-medium">
                {outfitAnalysis?.season}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Formality Level:</span>
              <span className="text-brand-text-primary font-medium">
                {outfitAnalysis?.formalityLevel}/10
              </span>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">
                Selected Items
              </h4>

              {Object.values(selectedItems).every((item) => !item) ? (
                <p className="text-sm text-gray-500">No items selected yet.</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(selectedItems).map(([category, item]) =>
                    item ? (
                      <div
                        key={category}
                        className="flex items-center gap-3 p-2 border rounded-lg bg-white"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs  font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {category}
                          </p>
                        </div>
                        <div className="flex flex-col gap-10 items-center justify-between">
                      <p className="text-xs text-brand-gold font-semibold">
                        ${item?.price}
                      </p>
                      <a
                        target="_blank"
                        href={item?.link || "https://www.amazon.in/"}
                        className="flex items-center text-xs font-medium hover:text-brand-gold gap-1"
                      >
                        Link <ChevronRight className="size-4" />
                      </a>
                    </div>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Styling tips */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-brand-text-primary">
          Styling Tips
        </h4>
        {outfitAnalysis?.stylingTips?.length > 0 ? (
          outfitAnalysis.stylingTips.map((tip, index) => (
            <p key={index} className="text-sm text-brand-text-secondary">
              • {tip}
            </p>
          ))
        ) : (
          <p className="text-sm text-brand-text-secondary">
            No styling tips available.
          </p>
        )}
      </div>

      {/* Color palette */}
      <div className="bg-brand-cream rounded-lg p-4">
        <h4 className="text-sm font-semibold text-brand-text-primary mb-2">
          Color Palette
        </h4>
        {outfitAnalysis?.colorPalette?.length > 0 ? (
          <div className="flex space-x-2">
            {outfitAnalysis.colorPalette.map((color, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border border-border"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-brand-text-secondary">
            No color palette available.
          </p>
        )}
      </div>
    </div>
  );

  const renderSimilarTab = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-brand-text-primary">
        Similar Outfits ({count})
      </h4>
      <div className="grid grid-cols-2 gap-4">
        {recommendations.length === 0 ? (
          <p className="text-sm text-brand-text-secondary">
            No similar outfits found.
          </p>
        ) : (
          recommendations.map((item) => (
            <div
              key={item?.id}
              onClick={() => {
                handleItemSelect("similar", item);
                handleProductClick(item?.name);
              }}
              className={`p-3 rounded-lg border border-brand-gold cursor-pointer transition-smooth ${
                selectedItems?.similar?.id === item?.id
                  ? "border-brand-gold bg-brand-cream"
                  : "border-border hover:border-brand-gold hover:bg-muted"
              }`}
            >
              <div className="aspect-square bg-white rounded-lg overflow-hidden mb-2">
                <Image
                  src={item?.imageUrl}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="text-xs font-medium text-brand-text-primary mb-1 line-clamp-2">
                {item?.name}
              </h5>
              <div className="flex items-center justify-between">
                <p className="text-xs text-brand-gold font-semibold">
                  ${item?.price}
                </p>
                <a
                  target="_blank"
                  href={item?.link || "https://www.amazon.in/"}
                  className="flex items-center text-xs font-medium hover:text-brand-gold gap-1"
                >
                  Link <ChevronRight className="size-4" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // 🧩 Conditional renders for loading states
  if (!isOpen) return null;
  if (clothesLoading)
    return (
      <div className="fixed inset-y-0 right-0 w-96 bg-card border-l border-border shadow-brand-modal z-50 flex items-center justify-center">
        <Loader2 className="animate-spin w-5 h-5 mr-2" />
        <p className="text-brand-text-secondary">Loading outfit options...</p>
      </div>
    );

  if (activeTab === "details" && detailsLoading)
    return (
      <div className="fixed inset-y-0 right-0 w-96 bg-card border-l border-border shadow-brand-modal z-50 flex items-center justify-center">
        <Loader2 className="animate-spin w-5 h-5 mr-2" />
        <p className="text-brand-text-secondary">Analyzing outfit details...</p>
      </div>
    );

  // 🧭 Final render
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-card border-l border-border shadow-brand-modal z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-bold text-gray-800">Outfit Studio</h3>
        <Button variant="ghost" className="hover:bg-brand-gold" size="icon" iconName="X" onClick={onClose} />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 p-3 text-sm font-medium transition-smooth ${
              activeTab === tab.id
                ? "text-brand-gold border-b-2 border-brand-gold"
                : "text-brand-text-secondary hover:text-brand-text-primary"
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "customize" && renderCustomizeTab()}
        {activeTab === "details" && renderDetailsTab()}
        {activeTab === "similar" && renderSimilarTab()}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-3">
        {Object.values(selectedItems).some((item) => item) && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-brand-text-secondary">Total:</span>
            <span className="text-lg font-semibold text-brand-text-primary">
              ${calculateTotalPrice()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitPanel;
