import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WardrobeItem = ({ item, viewMode, onEdit, onDelete, onAddToOutfit }) => {
  const getFrequencyColor = (frequency) => {
    if (frequency >= 20) return 'text-success';
    if (frequency >= 10) return 'text-warning';
    return 'text-error';
  };

  const getStylingPotentialColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-brand-text-primary truncate">
                  {item?.name}
                </h3>
                <p className="text-sm text-brand-text-secondary">
                  {item?.category} • {item?.brand}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className={`${getFrequencyColor(item?.wearFrequency)}`}>
                    Worn {item?.wearFrequency}x
                  </span>
                  <span className="text-brand-text-secondary">
                    ${item?.costPerWear}/wear
                  </span>
                  <span className={`${getStylingPotentialColor(item?.stylingPotential)}`}>
                    {item?.stylingPotential}% versatile
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Plus"
                  onClick={() => onAddToOutfit(item)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onEdit(item)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onDelete(item)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth group">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={item?.image}
          alt={item?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth">
          <div className="flex gap-1">
            <Button
              variant="secondary"
              size="sm"
              iconName="Plus"
              onClick={() => onAddToOutfit(item)}
              className="shadow-brand"
            />
            <Button
              variant="secondary"
              size="sm"
              iconName="Edit"
              onClick={() => onEdit(item)}
              className="shadow-brand"
            />
          </div>
        </div>
        
        {/* Color indicator */}
        <div className="absolute bottom-2 left-2">
          <div 
            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: item?.color }}
          />
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-brand-text-primary text-sm truncate">
          {item?.name}
        </h3>
        <p className="text-xs text-brand-text-secondary mt-1">
          {item?.category} • {item?.brand}
        </p>
        
        <div className="flex items-center justify-between mt-3 text-xs">
          <div className="flex items-center gap-1">
            <Icon name="RotateCcw" size={12} />
            <span className={`${getFrequencyColor(item?.wearFrequency)}`}>
              {item?.wearFrequency}x
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="DollarSign" size={12} />
            <span className="text-brand-text-secondary">
              ${item?.costPerWear}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Star" size={12} />
            <span className={`${getStylingPotentialColor(item?.stylingPotential)}`}>
              {item?.stylingPotential}%
            </span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {item?.tags?.slice(0, 2)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-xs rounded-full text-brand-text-secondary"
            >
              {tag}
            </span>
          ))}
          {item?.tags?.length > 2 && (
            <span className="px-2 py-1 bg-muted text-xs rounded-full text-brand-text-secondary">
              +{item?.tags?.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WardrobeItem;