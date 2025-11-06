import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const WardrobeHeader = ({ 
  viewMode, 
  setViewMode, 
  searchQuery, 
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedColor,
  setSelectedColor,
  selectedSeason,
  setSelectedSeason,
  onAddItem 
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const colorOptions = [
    { value: 'all', label: 'All Colors' },
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'navy', label: 'Navy' },
    { value: 'gray', label: 'Gray' },
    { value: 'beige', label: 'Beige' },
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' }
  ];

  const seasonOptions = [
    { value: 'all', label: 'All Seasons' },
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'fall', label: 'Fall' },
    { value: 'winter', label: 'Winter' }
  ];

  return (
    <div className="bg-card border-b border-border p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title and Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-brand-text-primary">
              Virtual Wardrobe
            </h1>
            <p className="text-sm text-brand-text-secondary mt-1">
              Organize, plan, and optimize your style collection
            </p>
          </div>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={onAddItem}
            className="lg:hidden"
          >
            Add Item
          </Button>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={onAddItem}
          >
            Add Item
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              iconName="Grid3X3"
              onClick={() => setViewMode('grid')}
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              iconName="List"
              onClick={() => setViewMode('list')}
            />
          </div>
        </div>
      </div>
      {/* Search and Filter Bar */}
      <div className="mt-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search your wardrobe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Filter"
              iconPosition="left"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
            <div className="lg:hidden flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                iconName="Grid3X3"
                onClick={() => setViewMode('grid')}
              />
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                iconName="List"
                onClick={() => setViewMode('list')}
              />
            </div>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <Select
              label="Category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
            <Select
              label="Color"
              options={colorOptions}
              value={selectedColor}
              onChange={setSelectedColor}
            />
            <Select
              label="Season"
              options={seasonOptions}
              value={selectedSeason}
              onChange={setSelectedSeason}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WardrobeHeader;