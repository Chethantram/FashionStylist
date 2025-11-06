import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";

const FilterSidebar = ({ isOpen, onClose, filters = {}, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    priceRange: true,
    brand: false,
    size: false,
    color: false,
    sustainability: false,
    occasion: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev?.[section],
    }));
  };

  const clearAllFilters = () => {
    onFilterChange("clear", null, null);
  };

  // helper to parse preset like "0-50" or "500+"
  const parsePricePreset = (val) => {
    if (!val) return { min: "", max: "" };
    if (val.endsWith("+")) {
      const min = val.replace("+", "");
      return { min, max: "" };
    }
    const [min, max] = val.split("-");
    return { min: min || "", max: max || "" };
  };

  const filterSections = [
    {
      key: "category",
      title: "Category",
      options: [
        { value: "tops", label: "Tops", count: 234 },
        { value: "bottoms", label: "Bottoms", count: 156 },
        { value: "shoes", label: "Shoes", count: 145 },
        { value: "accessories", label: "Accessories", count: 98 },
      ],
    },
    {
      key: "priceRange",
      title: "Price Range",
      options: [
        { value: "0-50", label: "Under $50", count: 123 },
        { value: "50-100", label: "$50 - $100", count: 234 },
        { value: "100-200", label: "$100 - $200", count: 156 },
        { value: "200-500", label: "$200 - $500", count: 89 },
        { value: "500+", label: "$500+", count: 45 },
      ],
    },
    {
      key: "brand",
      title: "Brand",
      options: [
        { value: "zara", label: "Zara", count: 45 },
        { value: "hm", label: "H&M", count: 67 },
        { value: "uniqlo", label: "Uniqlo", count: 34 },
        { value: "mango", label: "Mango", count: 23 },
        { value: "cos", label: "COS", count: 18 },
      ],
    },
    {
      key: "occasion",
      title: "Occasion",
      options: [
        { value: "work", label: "Work", count: 156 },
        { value: "casual", label: "Casual", count: 234 },
        { value: "formal", label: "Formal", count: 89 },
        { value: "party", label: "Party", count: 67 },
        { value: "vacation", label: "Vacation", count: 45 },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-card border-r border-border z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        overflow-y-auto
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <h2 className="text-lg font-semibold text-brand-text-primary">
            Filters
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
        </div>

        <div className="p-4 space-y-6">
          {/* Clear Filters */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-brand-text-primary hidden lg:block">
              Filters
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-brand-text-secondary hover:text-brand-text-primary"
            >
              Clear All
            </Button>
          </div>

          {/* Filter Sections */}
          {filterSections.map((section) => (
            <div
              key={section.key}
              className="border-b border-border pb-4 last:border-b-0"
            >
              <button
                onClick={() => toggleSection(section.key)}
                className="flex items-center justify-between w-full py-2 text-left"
              >
                <h3 className="font-medium text-brand-text-primary">
                  {section.title}
                </h3>
                <Icon
                  name={expandedSections?.[section.key] ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-brand-text-secondary"
                />
              </button>

              {expandedSections?.[section.key] && (
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {section.options.map((option) => {
                    // calculate checked state safely
                    let checked = false;

                    if (section.key === "priceRange") {
                      // compare parsed preset to current filters.priceRange
                      const preset = parsePricePreset(option.value);
                      const curr = filters?.priceRange || {};
                      checked =
                        String(curr.min || "") === String(preset.min || "") &&
                        String(curr.max || "") === String(preset.max || "");
                    } else {
                      // only call includes if the target is an array
                      const target = filters?.[section.key];
                      checked = Array.isArray(target) && target.includes(option.value);
                    }

                    return (
                      <div key={option.value} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1">
                          <Checkbox
                            label={option.label}
                            checked={checked}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              if (section.key === "priceRange") {
                                const parsed = parsePricePreset(option.value);
                                onFilterChange("priceRange", parsed, isChecked);
                              } else {
                                onFilterChange(section.key, option.value, isChecked);
                              }
                            }}
                            className="text-sm"
                          />
                        </div>
                        {/* <span className="text-xs text-brand-text-secondary ml-2">
                          ({option.count})
                        </span> */}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Custom Price Range */}
          <div className="border-b border-border pb-4">
            <h3 className="font-medium text-brand-text-primary mb-3">
              Custom Price Range
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  id="minPrice"
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                  min="0"
                />
                <input
                  id="maxPrice"
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                  min="0"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => {
                  const min = document.querySelector("#minPrice")?.value;
                  const max = document.querySelector("#maxPrice")?.value;
                  onFilterChange("priceRange", { min, max }, true);
                }}
              >
                Apply Range
              </Button>
            </div>
          </div>

          <div className="lg:hidden pt-4">
            <Button variant="default" size="default" fullWidth onClick={onClose}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
