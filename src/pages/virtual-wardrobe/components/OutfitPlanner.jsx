import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OutfitPlanner = ({ isOpen, onClose, wardrobeItems, onSaveOutfit }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('casual');

  const occasions = [
    { id: 'casual', name: 'Casual', icon: 'Coffee' },
    { id: 'work', name: 'Work', icon: 'Briefcase' },
    { id: 'formal', name: 'Formal', icon: 'Crown' },
    { id: 'date', name: 'Date Night', icon: 'Heart' },
    { id: 'workout', name: 'Workout', icon: 'Dumbbell' },
    { id: 'travel', name: 'Travel', icon: 'Plane' }
  ];

  const categories = [
    { id: 'tops', name: 'Tops', items: wardrobeItems?.filter(item => item?.category === 'tops') },
    { id: 'bottoms', name: 'Bottoms', items: wardrobeItems?.filter(item => item?.category === 'bottoms') },
    { id: 'shoes', name: 'Shoes', items: wardrobeItems?.filter(item => item?.category === 'shoes') },
    { id: 'accessories', name: 'Accessories', items: wardrobeItems?.filter(item => item?.category === 'accessories') }
  ];

  const handleItemSelect = (item) => {
    const existingIndex = selectedItems?.findIndex(selected => selected?.category === item?.category);
    if (existingIndex >= 0) {
      const newSelected = [...selectedItems];
      newSelected[existingIndex] = item;
      setSelectedItems(newSelected);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems?.filter(item => item?.id !== itemId));
  };

  const handleSaveOutfit = () => {
    if (selectedItems?.length > 0) {
      const outfit = {
        id: Date.now(),
        name: outfitName || `${selectedOccasion} Outfit`,
        occasion: selectedOccasion,
        items: selectedItems,
        createdAt: new Date(),
        aiScore: Math.floor(Math.random() * 20) + 80 // Mock AI score
      };
      onSaveOutfit(outfit);
      setSelectedItems([]);
      setOutfitName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-brand-modal w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-brand-text-primary">
            Create New Outfit
          </h2>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Left Panel - Wardrobe Items */}
          <div className="flex-1 p-6 overflow-y-auto border-r border-border">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-brand-text-primary mb-4">
                Select Items
              </h3>
              
              {categories?.map((category) => (
                <div key={category?.id} className="mb-6">
                  <h4 className="text-sm font-medium text-brand-text-secondary mb-3 uppercase tracking-wide">
                    {category?.name}
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                    {category?.items?.map((item) => (
                      <div
                        key={item?.id}
                        className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-smooth ${
                          selectedItems?.find(selected => selected?.id === item?.id)
                            ? 'border-brand-gold shadow-brand'
                            : 'border-transparent hover:border-border'
                        }`}
                        onClick={() => handleItemSelect(item)}
                      >
                        <Image
                          src={item?.image}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Outfit Preview */}
          <div className="w-80 p-6 bg-muted">
            <h3 className="text-lg font-medium text-brand-text-primary mb-4">
              Outfit Preview
            </h3>

            {/* Occasion Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium text-brand-text-secondary mb-3 block">
                Occasion
              </label>
              <div className="grid grid-cols-2 gap-2">
                {occasions?.map((occasion) => (
                  <button
                    key={occasion?.id}
                    onClick={() => setSelectedOccasion(occasion?.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg text-sm transition-smooth ${
                      selectedOccasion === occasion?.id
                        ? 'bg-brand-gold text-white' :'bg-card text-brand-text-secondary hover:bg-border'
                    }`}
                  >
                    <Icon name={occasion?.icon} size={16} />
                    {occasion?.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Items */}
            <div className="mb-6">
              <label className="text-sm font-medium text-brand-text-secondary mb-3 block">
                Selected Items ({selectedItems?.length})
              </label>
              <div className="space-y-3">
                {selectedItems?.map((item) => (
                  <div key={item?.id} className="flex items-center gap-3 p-3 bg-card rounded-lg">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brand-text-primary truncate">
                        {item?.name}
                      </p>
                      <p className="text-xs text-brand-text-secondary">
                        {item?.category}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => handleRemoveItem(item?.id)}
                    />
                  </div>
                ))}
                
                {selectedItems?.length === 0 && (
                  <div className="text-center py-8 text-brand-text-secondary">
                    <Icon name="Shirt" size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Select items to create your outfit</p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Feedback */}
            {selectedItems?.length > 1 && (
              <div className="mb-6 p-4 bg-card rounded-lg border border-success">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Sparkles" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">AI Styling Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full transition-smooth"
                      style={{ width: '85%' }}
                    />
                  </div>
                  <span className="text-sm font-medium text-brand-text-primary">85%</span>
                </div>
                <p className="text-xs text-brand-text-secondary mt-2">
                  Great color harmony and style cohesion!
                </p>
              </div>
            )}

            {/* Save Button */}
            <Button
              variant="default"
              fullWidth
              iconName="Save"
              iconPosition="left"
              onClick={handleSaveOutfit}
              disabled={selectedItems?.length === 0}
            >
              Save Outfit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitPlanner;