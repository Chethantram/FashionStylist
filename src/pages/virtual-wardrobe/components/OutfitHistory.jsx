import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OutfitHistory = ({ isOpen, onClose }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock outfit history data
  const outfitHistory = [
    {
      id: 1,
      name: "Work Meeting Look",
      occasion: "work",
      date: "2025-01-15",
      items: [
        { id: 1, name: "Navy Blazer", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop" },
        { id: 2, name: "White Blouse", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop" },
        { id: 3, name: "Black Trousers", image: "https://images.unsplash.com/photo-1506629905607-d405b7a30db4?w=200&h=200&fit=crop" }
      ],
      rating: 5,
      notes: "Perfect for client presentation. Felt confident and professional.",
      weather: "Cloudy, 18°C",
      photos: ["https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=400&fit=crop"]
    },
    {
      id: 2,
      name: "Weekend Brunch",
      occasion: "casual",
      date: "2025-01-12",
      items: [
        { id: 4, name: "Denim Jacket", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop" },
        { id: 5, name: "Striped Tee", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop" },
        { id: 6, name: "White Sneakers", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop" }
      ],
      rating: 4,
      notes: "Comfortable and stylish. Got compliments on the jacket.",
      weather: "Sunny, 22°C",
      photos: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop"]
    },
    {
      id: 3,
      name: "Date Night Elegance",
      occasion: "date",
      date: "2025-01-10",
      items: [
        { id: 7, name: "Black Dress", image: "https://images.unsplash.com/photo-1566479179817-c0b9b5b5b5b5?w=200&h=200&fit=crop" },
        { id: 8, name: "Gold Heels", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop" },
        { id: 9, name: "Statement Necklace", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop" }
      ],
      rating: 5,
      notes: "Felt amazing! The dress was perfect for the restaurant ambiance.",
      weather: "Clear, 16°C",
      photos: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop"]
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Outfits', icon: 'Calendar' },
    { value: 'work', label: 'Work', icon: 'Briefcase' },
    { value: 'casual', label: 'Casual', icon: 'Coffee' },
    { value: 'formal', label: 'Formal', icon: 'Crown' },
    { value: 'date', label: 'Date Night', icon: 'Heart' }
  ];

  const filteredOutfits = selectedFilter === 'all' 
    ? outfitHistory 
    : outfitHistory?.filter(outfit => outfit?.occasion === selectedFilter);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < rating ? 'text-brand-gold fill-current' : 'text-border'}
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-brand-modal w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-brand-text-primary">
            Outfit History
          </h2>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Filter Sidebar */}
          <div className="w-64 border-r border-border p-6">
            <h3 className="text-sm font-medium text-brand-text-secondary mb-4 uppercase tracking-wide">
              Filter by Occasion
            </h3>
            <div className="space-y-2">
              {filterOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => setSelectedFilter(option?.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                    selectedFilter === option?.value
                      ? 'bg-brand-cream text-brand-text-primary' :'text-brand-text-secondary hover:text-brand-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={option?.icon} size={18} />
                  {option?.label}
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-medium text-brand-text-primary mb-3">
                Quick Stats
              </h4>
              <div className="space-y-2 text-xs text-brand-text-secondary">
                <div className="flex justify-between">
                  <span>Total Outfits:</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span>This Month:</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Rating:</span>
                  <span className="font-medium">4.2/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Most Worn:</span>
                  <span className="font-medium">Work</span>
                </div>
              </div>
            </div>
          </div>

          {/* Outfit History Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {filteredOutfits?.map((outfit) => (
                <div key={outfit?.id} className="bg-muted p-6 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-brand-text-primary">
                        {outfit?.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-brand-text-secondary">
                        <span>{new Date(outfit.date)?.toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="capitalize">{outfit?.occasion}</span>
                        <span>•</span>
                        <span>{outfit?.weather}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(outfit?.rating)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Outfit Items */}
                    <div className="lg:col-span-2">
                      <h4 className="text-sm font-medium text-brand-text-secondary mb-3">
                        Items Worn
                      </h4>
                      <div className="flex flex-wrap gap-3 mb-4">
                        {outfit?.items?.map((item) => (
                          <div key={item?.id} className="flex items-center gap-2 bg-card p-2 rounded-lg">
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item?.image}
                                alt={item?.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm text-brand-text-primary">
                              {item?.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {outfit?.notes && (
                        <div>
                          <h4 className="text-sm font-medium text-brand-text-secondary mb-2">
                            Notes
                          </h4>
                          <p className="text-sm text-brand-text-primary bg-card p-3 rounded-lg">
                            {outfit?.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Outfit Photos */}
                    <div>
                      <h4 className="text-sm font-medium text-brand-text-secondary mb-3">
                        Photos
                      </h4>
                      <div className="space-y-3">
                        {outfit?.photos?.map((photo, index) => (
                          <div key={index} className="aspect-[3/4] rounded-lg overflow-hidden">
                            <Image
                              src={photo}
                              alt={`${outfit?.name} photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Copy"
                      iconPosition="left"
                    >
                      Recreate Outfit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Share"
                      iconPosition="left"
                    >
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Edit"
                      iconPosition="left"
                    >
                      Edit Notes
                    </Button>
                  </div>
                </div>
              ))}

              {filteredOutfits?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Calendar" size={48} className="mx-auto mb-4 text-brand-text-secondary opacity-50" />
                  <h3 className="text-lg font-medium text-brand-text-primary mb-2">
                    No outfits found
                  </h3>
                  <p className="text-brand-text-secondary">
                    {selectedFilter === 'all' ?'Start creating outfits to see your history here'
                      : `No ${selectedFilter} outfits recorded yet`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitHistory;