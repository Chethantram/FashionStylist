import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import WardrobeHeader from './components/WardrobeHeader';
import WardrobeItem from './components/WardrobeItem';
import OutfitPlanner from './components/OutfitPlanner';
import WardrobeAnalytics from './components/WardrobeAnalytics';
import AddItemModal from './components/AddItemModal';
import OutfitHistory from './components/OutfitHistory';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VirtualWardrobe = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [showOutfitPlanner, setShowOutfitPlanner] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOutfitHistory, setShowOutfitHistory] = useState(false);
  const [wardrobeItems, setWardrobeItems] = useState([
    {
      id: 1,
      name: "Classic Navy Blazer",
      brand: "Zara",
      category: "outerwear",
      color: "#1e3a8a",
      season: "all-season",
      price: 89.99,
      wearFrequency: 23,
      costPerWear: 3.91,
      stylingPotential: 92,
      tags: ["professional", "versatile", "classic"],
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      addedAt: new Date('2024-12-15')
    },
    {
      id: 2,
      name: "White Cotton Blouse",
      brand: "H&M",
      category: "tops",
      color: "#ffffff",
      season: "all-season",
      price: 29.99,
      wearFrequency: 18,
      costPerWear: 1.67,
      stylingPotential: 88,
      tags: ["basic", "work", "casual"],
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      addedAt: new Date('2024-11-20')
    },
    {
      id: 3,
      name: "Black Skinny Jeans",
      brand: "Levi\'s",
      category: "bottoms",
      color: "#000000",
      season: "all-season",
      price: 79.99,
      wearFrequency: 31,
      costPerWear: 2.58,
      stylingPotential: 85,
      tags: ["casual", "versatile", "denim"],
      image: "https://images.unsplash.com/photo-1506629905607-d405b7a30db4?w=400&h=400&fit=crop",
      addedAt: new Date('2024-10-10')
    },
    {
      id: 4,
      name: "Floral Summer Dress",
      brand: "Mango",
      category: "dresses",
      color: "#ff69b4",
      season: "summer",
      price: 59.99,
      wearFrequency: 8,
      costPerWear: 7.50,
      stylingPotential: 72,
      tags: ["feminine", "summer", "floral"],
      image: "https://images.unsplash.com/photo-1566479179817-c0b9b5b5b5b5?w=400&h=400&fit=crop",
      addedAt: new Date('2024-06-15')
    },
    {
      id: 5,
      name: "Brown Leather Boots",
      brand: "Dr. Martens",
      category: "shoes",
      color: "#8b4513",
      season: "fall",
      price: 159.99,
      wearFrequency: 15,
      costPerWear: 10.67,
      stylingPotential: 78,
      tags: ["leather", "boots", "autumn"],
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
      addedAt: new Date('2024-09-05')
    },
    {
      id: 6,
      name: "Gold Statement Necklace",
      brand: "Accessorize",
      category: "accessories",
      color: "#ffd700",
      season: "all-season",
      price: 24.99,
      wearFrequency: 12,
      costPerWear: 2.08,
      stylingPotential: 65,
      tags: ["jewelry", "statement", "gold"],
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      addedAt: new Date('2024-08-20')
    },
    {
      id: 7,
      name: "Denim Jacket",
      brand: "Gap",
      category: "outerwear",
      color: "#4169e1",
      season: "spring",
      price: 69.99,
      wearFrequency: 14,
      costPerWear: 5.00,
      stylingPotential: 80,
      tags: ["denim", "casual", "layering"],
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
      addedAt: new Date('2024-03-12')
    },
    {
      id: 8,
      name: "Striped T-Shirt",
      brand: "Uniqlo",
      category: "tops",
      color: "#000000",
      season: "all-season",
      price: 19.99,
      wearFrequency: 22,
      costPerWear: 0.91,
      stylingPotential: 75,
      tags: ["stripes", "casual", "basic"],
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      addedAt: new Date('2024-07-08')
    }
  ]);

  const [savedOutfits, setSavedOutfits] = useState([]);

  // Filter wardrobe items based on search and filters
  const filteredItems = useMemo(() => {
    return wardrobeItems?.filter(item => {
      const matchesSearch = item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           item?.brand?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           item?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || item?.category === selectedCategory;
      const matchesColor = selectedColor === 'all' || item?.color === selectedColor;
      const matchesSeason = selectedSeason === 'all' || item?.season === selectedSeason || item?.season === 'all-season';
      
      return matchesSearch && matchesCategory && matchesColor && matchesSeason;
    });
  }, [wardrobeItems, searchQuery, selectedCategory, selectedColor, selectedSeason]);

  const handleAddItem = (newItem) => {
    setWardrobeItems(prev => [...prev, newItem]);
  };

  const handleEditItem = (item) => {
    console.log('Edit item:', item);
    // Implement edit functionality
  };

  const handleDeleteItem = (item) => {
    setWardrobeItems(prev => prev?.filter(i => i?.id !== item?.id));
  };

  const handleAddToOutfit = (item) => {
    console.log('Add to outfit:', item);
    setShowOutfitPlanner(true);
  };

  const handleSaveOutfit = (outfit) => {
    setSavedOutfits(prev => [...prev, outfit]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <WardrobeHeader
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
          onAddItem={() => setShowAddModal(true)}
        />

        <div className="p-4 lg:p-6">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Button
              variant="outline"
              iconName="Palette"
              iconPosition="left"
              onClick={() => setShowOutfitPlanner(true)}
            >
              Create Outfit
            </Button>
            <Button
              variant="outline"
              iconName="BarChart3"
              iconPosition="left"
              onClick={() => setShowAnalytics(true)}
            >
              Analytics
            </Button>
            <Button
              variant="outline"
              iconName="History"
              iconPosition="left"
              onClick={() => setShowOutfitHistory(true)}
            >
              Outfit History
            </Button>
            <Button
              variant="outline"
              iconName="Heart"
              iconPosition="left"
            >
              Wishlist ({Math.floor(Math.random() * 15) + 5})
            </Button>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <p className="text-sm text-brand-text-secondary">
                Showing {filteredItems?.length} of {wardrobeItems?.length} items
              </p>
              {(searchQuery || selectedCategory !== 'all' || selectedColor !== 'all' || selectedSeason !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedColor('all');
                    setSelectedSeason('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
            
            {savedOutfits?.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-brand-text-secondary">
                <Icon name="Bookmark" size={16} />
                <span>{savedOutfits?.length} saved outfits</span>
              </div>
            )}
          </div>

          {/* Wardrobe Grid/List */}
          {filteredItems?.length > 0 ? (
            <div className={
              viewMode === 'grid' ?'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4' :'space-y-4'
            }>
              {filteredItems?.map((item) => (
                <WardrobeItem
                  key={item?.id}
                  item={item}
                  viewMode={viewMode}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                  onAddToOutfit={handleAddToOutfit}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Icon name="Shirt" size={64} className="mx-auto mb-4 text-brand-text-secondary opacity-50" />
              <h3 className="text-xl font-medium text-brand-text-primary mb-2">
                No items found
              </h3>
              <p className="text-brand-text-secondary mb-6">
                {searchQuery || selectedCategory !== 'all' || selectedColor !== 'all' || selectedSeason !== 'all' ?'Try adjusting your filters or search terms' :'Start building your virtual wardrobe by adding your first item'
                }
              </p>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setShowAddModal(true)}
              >
                Add Your First Item
              </Button>
            </div>
          )}

          {/* Wardrobe Insights */}
          {wardrobeItems?.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="TrendingUp" size={20} className="text-success" />
                  <h3 className="font-medium text-brand-text-primary">Most Versatile</h3>
                </div>
                <p className="text-sm text-brand-text-secondary">
                  Your navy blazer has the highest styling potential at 92%
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="DollarSign" size={20} className="text-brand-gold" />
                  <h3 className="font-medium text-brand-text-primary">Best Value</h3>
                </div>
                <p className="text-sm text-brand-text-secondary">
                  Striped t-shirt at $0.91 per wear is your most cost-effective piece
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                  <h3 className="font-medium text-brand-text-primary">Underutilized</h3>
                </div>
                <p className="text-sm text-brand-text-secondary">
                  3 items worn less than 5 times - try styling them differently
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      <OutfitPlanner
        isOpen={showOutfitPlanner}
        onClose={() => setShowOutfitPlanner(false)}
        wardrobeItems={wardrobeItems}
        onSaveOutfit={handleSaveOutfit}
      />
      <WardrobeAnalytics
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
        wardrobeItems={wardrobeItems}
      />
      <AddItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddItem={handleAddItem}
      />
      <OutfitHistory
        isOpen={showOutfitHistory}
        onClose={() => setShowOutfitHistory(false)}
      />
    </div>
  );
};

export default VirtualWardrobe;