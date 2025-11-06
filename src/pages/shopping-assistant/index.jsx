import React, { useState, useEffect } from "react";

import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import ProductCard from "./components/ProductCard";
import FilterSidebar from "./components/FilterSidebar";
import StylingGoalsSection from "./components/StylingGoalsSection";
import ComparisonModal from "./components/ComparisonModal";
import StylingModal from "./components/StylingModal";
import BudgetPlanner from "./components/BudgetPlanner";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import Image from "components/AppImage";
import { motion } from "framer-motion";
import LoaderHanger from "components/Loader";

const LOCAL_STORAGE_KEY = "recommendations1";

const ShoppingAssistant = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("capsule");
  const [sortBy, setSortBy] = useState("price-low");
  const [viewMode, setViewMode] = useState("grid");
  const [comparisonProducts, setComparisonProducts] = useState([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [stylingProduct, setStylingProduct] = useState(null);
  const [isStylingOpen, setIsStylingOpen] = useState(false);
  const [isBudgetPlannerOpen, setIsBudgetPlannerOpen] = useState(false);
  const [budgetPlan, setBudgetPlan] = useState(null);
  const [wishlistItems, setWishlistItems] = useState(new Set());
  // State for sorted/filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [count, setCount] = useState(0);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    occasion: [],
    priceRange: { min: "", max: "" },
  });
  const [recommendations, setRecommendations] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/clothes/get");

        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortOptions = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  // Sort products based on selected option
  useEffect(() => {
    if (!products || products.length === 0) return;

    let sorted = [...products];

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;

      case "price-high":
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;

      default:
        // Keep default order
        break;
    }

    setFilteredProducts(sorted);
  }, [products, sortBy]);

  const handleAddToWishlist = async (productId, isWishlisted) => {
    try {
      const product = products.find((p) => p._id === productId);

      if (!product) {
        console.warn("Product not found for ID:", productId);
        return;
      }

      // 🟩 Send full product and wishlist state
      const response = await axios.post(
        `http://localhost:5000/api/users/wishlist`,
        {
          product,
          isWishlisted,
        }
      );

    } catch (error) {
      console.error("❌ Wishlist update error:", error.response?.data || error);
    }
  };

  const handleViewStyling = (product) => {
    setStylingProduct(product);
    setIsStylingOpen(true);
  };

  const handleCompare = (product) => {
    if (comparisonProducts?.length < 3) {
      setComparisonProducts((prev) => [...prev, product]);
    }
    if (comparisonProducts?.length >= 2) {
      setIsComparisonOpen(true);
    }
  };

  const handleAddToCart = (product) => {
    // Mock add to cart functionality
  };

  const handleBudgetSet = (budget) => {
    setBudgetPlan(budget);
  };

  const fetchFilteredItems = async (reset = false) => {
    try {
      setLoading(true);

      const params = {
        page,
        limit: 20,
        sort: sortBy,
      };

      if (filters.category.length) params.category = filters.category.join(",");
      if (filters.brand.length) params.brand = filters.brand.join(",");
      if (filters.occasion.length) params.occasion = filters.occasion.join(",");
      if (filters.priceRange.min) params.minPrice = filters.priceRange.min;
      if (filters.priceRange.max) params.maxPrice = filters.priceRange.max;

      const { data } = await axios.get(
        "http://localhost:5000/api/clothes/get",
        {
          params,
        }
      );

      if (reset) {
        setProducts(data.data || []);
      } else {
        setProducts((prev) => [...prev, ...(data.data || [])]);
      }

      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching filtered items:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Trigger fetch whenever filters change
  // useEffect(() => {
  //   fetchFilteredItems();
  // }, [filters]);
  useEffect(() => {
    setPage(1);
    fetchFilteredItems(true);
  }, [filters, sortBy]);

  useEffect(() => {
    if (page > 1) fetchFilteredItems();
  }, [page]);

  // ✅ handleFilterChange — same as yours
  const handleFilterChange = (category, value, checked) => {
    setFilters((prev) => {
      if (category === "clear") {
        return {
          category: [],
          brand: [],
          occasion: [],
          priceRange: { min: "", max: "" },
        };
      }

      if (category === "priceRange") {
        return { ...prev, priceRange: value };
      }

      const currentValues = prev[category] || [];
      let updatedValues = checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      return { ...prev, [category]: updatedValues };
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        if (filters.category.length)
          params.append("category", filters.category.join(","));
        if (filters.brand.length)
          params.append("brand", filters.brand.join(","));
        if (filters.occasion.length)
          params.append("occasion", filters.occasion.join(","));

        if (filters.priceRange.min)
          params.append("minPrice", filters.priceRange.min);
        if (filters.priceRange.max)
          params.append("maxPrice", filters.priceRange.max);

        if (sortBy) params.append("sort", sortBy);

        const res = await axios.get(
          `http://localhost:5000/api/clothes/get?${params.toString()}`
        );

        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, sortBy]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recommendations));
  }, [recommendations]);

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

  if (loading) {
    return <LoaderHanger />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-background"
    >
      <Header />
      <div className="pt-16">
        <div className="flex lg:w-30">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Main Content */}
          <div className="flex-1 lg:ml-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-brand-text-primary mb-2">
                      Shopping Assistant
                    </h1>
                    <p className="text-brand-text-secondary">
                      Intelligent product discovery tailored to your style goals
                      and preferences
                    </p>
                  </div>
                </div>
              </div>

              {/* Controls Bar */}
              <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-brand-text-secondary">
                    {filteredProducts?.length} products found
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Select
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    placeholder="Sort by"
                    className="w-48 hover:bg-gray-100"
                  />

                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${
                        viewMode === "grid"
                          ? "bg-brand-cream text-brand-text-primary"
                          : "text-brand-text-secondary hover:text-brand-text-primary"
                      }`}
                    >
                      <Icon name="Grid3X3" size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${
                        viewMode === "list"
                          ? "bg-brand-cream text-brand-text-primary"
                          : "text-brand-text-secondary hover:text-brand-text-primary"
                      }`}
                    >
                      <Icon name="List" size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* recommended product  */}
              <div className="   overflow-hidden">
                <h1 className="text-3xl font-bold mb-6">Suggested Clothes</h1>
                <div className="flex gap-5 overflow-x-auto scrollbar-hide  pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scroll-m-0">
                  {recommendations.length === 0 ? (
                    <p className="text-sm text-brand-text-secondary mb-4">
                      No similar outfits found.
                    </p>
                  ) : (
                    recommendations.map((product, index) => (
                      <div
                        key={product?._id}
                        className="min-w-[290px] bg-card rounded-xl shadow-brand border border-border overflow-hidden group hover:shadow-elevated transition-smooth sc"
                      >
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          <Image
                            src={product?.imageUrl}
                            alt={product?.name}
                            className={`w-full h-full object-cover group-hover:scale-105 transition-smooth`}
                          />
                        </div>

                        {/* Content Section */}
                        <div className="p-4">
                          {/* Brand and Name */}
                          <div className="mb-2">
                            <p className="text-sm text-brand-text-secondary font-medium">
                              {product?.brand}
                            </p>
                            <h3 className="text-base font-semibold text-brand-text-primary line-clamp-2">
                              {product?.name}
                            </h3>
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-brand-gold">
                              ${product?.price}
                            </span>
                          </div>

                          {/* Category / Occasion */}
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-muted text-xs bg-blue-100 border-brand-gold text-brand-gold font-semibold border rounded-full capitalize">
                                {product?.category}
                              </span>
                              <span className="px-2 py-1 bg-muted text-xs bg-blue-100 border-brand-gold text-brand-gold font-semibold border rounded-full capitalize">
                                {product?.occasion || "None"}
                              </span>
                            </div>
                          </div>
                          <a
                            target="_blank"
                            href={product?.link || "https://www.amazon.in/"}
                            className="flex items-center text-sm font-medium hover:text-brand-gold gap-1"
                          >
                            Link <ChevronRight className="size-4" />
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Products Grid */}
              <h1 className="text-3xl font-bold my-8">All Products</h1>

              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts?.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToWishlist={handleAddToWishlist}
                    onViewStyling={handleViewStyling}
                    onCompare={handleCompare}
                    viewMode={viewMode}
                    handleProductClick={handleProductClick}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={loading}
                    className={"hover:bg-brand-gold "}
                  >
                    {loading ? "Loading..." : "Load More Products"}
                  </Button>
                </div>
              )}

              {/* AI Shopping Insights */}
              <div className="mt-12 p-6 bg-brand-cream rounded-xl border border-brand-gold/20">
                <div className="flex items-start gap-3">
                  <Icon
                    name="Sparkles"
                    size={24}
                    className="text-brand-gold mt-1 flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-brand-text-primary mb-2">
                      AI Shopping Insights
                    </h3>
                    <div className="space-y-2 text-sm text-brand-text-secondary">
                      <p>
                        • Based on your recent activity, you're building a
                        strong foundation for a capsule wardrobe
                      </p>
                      <p>
                        • Consider adding a structured blazer to unlock 12+ new
                        outfit combinations
                      </p>
                      <p>
                        • Your style preferences align with sustainable fashion
                        trends - 67% of your wishlist items are eco-friendly
                      </p>
                      <p>
                        • Price tracking shows 3 of your wishlisted items are
                        currently on sale
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        products={comparisonProducts}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
      <StylingModal
        isOpen={isStylingOpen}
        onClose={() => setIsStylingOpen(false)}
        product={stylingProduct}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
      <BudgetPlanner
        isOpen={isBudgetPlannerOpen}
        onClose={() => setIsBudgetPlannerOpen(false)}
        onBudgetSet={handleBudgetSet}
      />
    </motion.div>
  );
};

export default ShoppingAssistant;
