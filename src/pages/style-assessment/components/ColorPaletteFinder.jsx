import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ColorPaletteFinder = ({ onSelectionChange, selectedColors }) => {
  const [draggedColor, setDraggedColor] = useState(null);

  const colorPalettes = {
    spring: {
      name: 'Spring',
      description: 'Warm, clear, and bright colors',
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F']
    },
    summer: {
      name: 'Summer',
      description: 'Cool, soft, and muted colors',
      colors: ['#6C5CE7', '#A29BFE', '#74B9FF', '#81ECEC', '#00B894', '#FDCB6E', '#E17055', '#FD79A8']
    },
    autumn: {
      name: 'Autumn',
      description: 'Warm, rich, and earthy colors',
      colors: ['#E17055', '#D63031', '#FDCB6E', '#E84393', '#00B894', '#6C5CE7', '#A29BFE', '#74B9FF']
    },
    winter: {
      name: 'Winter',
      description: 'Cool, clear, and intense colors',
      colors: ['#2D3436', '#636E72', '#B2BEC3', '#DDD', '#0984E3', '#6C5CE7', '#E84393', '#00B894']
    }
  };

  const neutralColors = ['#2D3436', '#636E72', '#B2BEC3', '#DDD', '#FFFFFF', '#F8F9FA', '#E9ECEF', '#CED4DA'];

  const handleDragStart = (e, color) => {
    setDraggedColor(color);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, category) => {
    e?.preventDefault();
    if (draggedColor) {
      const updatedColors = { ...selectedColors };
      if (!updatedColors?.[category]) {
        updatedColors[category] = [];
      }
      if (!updatedColors?.[category]?.includes(draggedColor)) {
        updatedColors[category] = [...updatedColors?.[category], draggedColor];
        onSelectionChange(updatedColors);
      }
    }
    setDraggedColor(null);
  };

  const removeColor = (category, colorToRemove) => {
    const updatedColors = { ...selectedColors };
    updatedColors[category] = updatedColors?.[category]?.filter(color => color !== colorToRemove);
    onSelectionChange(updatedColors);
  };

  const handleColorClick = (color) => {
    // Auto-assign to favorites if no category specified
    const updatedColors = { ...selectedColors };
    if (!updatedColors?.favorites) {
      updatedColors.favorites = [];
    }
    if (!updatedColors?.favorites?.includes(color)) {
      updatedColors.favorites = [...updatedColors?.favorites, color];
      onSelectionChange(updatedColors);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-brand-text-primary mb-2">
          Discover Your Color Palette
        </h2>
        <p className="text-brand-text-secondary">
          Drag colors to your preference categories or click to add to favorites
        </p>
      </div>
      {/* Seasonal Color Palettes */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-brand-text-primary">Seasonal Color Theory</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(colorPalettes)?.map(([season, palette]) => (
            <div key={season} className="bg-card p-4 rounded-xl border border-border">
              <h4 className="font-semibold text-brand-text-primary mb-2">{palette?.name}</h4>
              <p className="text-xs text-brand-text-secondary mb-3">{palette?.description}</p>
              <div className="grid grid-cols-4 gap-2">
                {palette?.colors?.map((color, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, color)}
                    onClick={() => handleColorClick(color)}
                    className="w-8 h-8 rounded-lg cursor-pointer hover:scale-110 transition-transform shadow-sm"
                    style={{ backgroundColor: color }}
                    title={`Click to add ${color} to favorites`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Neutral Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-brand-text-primary">Essential Neutrals</h3>
        <div className="flex flex-wrap gap-2">
          {neutralColors?.map((color, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, color)}
              onClick={() => handleColorClick(color)}
              className="w-10 h-10 rounded-lg cursor-pointer hover:scale-110 transition-transform shadow-sm border border-border"
              style={{ backgroundColor: color }}
              title={`Click to add ${color} to favorites`}
            />
          ))}
        </div>
      </div>
      {/* Color Preference Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['favorites', 'maybe', 'avoid']?.map((category) => {
          const categoryConfig = {
            favorites: { title: 'Love These!', icon: 'Heart', color: 'text-red-500' },
            maybe: { title: 'Maybe', icon: 'HelpCircle', color: 'text-yellow-500' },
            avoid: { title: 'Not For Me', icon: 'X', color: 'text-gray-500' }
          };

          return (
            <div
              key={category}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, category)}
              className="bg-card p-4 rounded-xl border-2 border-dashed border-border min-h-32 hover:border-brand-gold/50 transition-colors"
            >
              <div className="flex items-center space-x-2 mb-3">
                <Icon name={categoryConfig?.[category]?.icon} size={18} className={categoryConfig?.[category]?.color} />
                <h4 className="font-semibold text-brand-text-primary">{categoryConfig?.[category]?.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedColors?.[category]?.map((color, index) => (
                  <div
                    key={index}
                    className="relative group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <button
                      onClick={() => removeColor(category, color)}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="X" size={10} color="white" />
                    </button>
                  </div>
                ))}
              </div>
              {(!selectedColors?.[category] || selectedColors?.[category]?.length === 0) && (
                <p className="text-sm text-brand-text-secondary italic">
                  Drag colors here or click colors above
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="bg-brand-cream p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-brand-gold flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-brand-text-primary mb-1">Color Theory Tip</h4>
            <p className="text-sm text-brand-text-secondary">
              Your skin undertone determines which colors make you glow. Cool undertones suit blues and purples, 
              while warm undertones complement oranges and yellows. Neutral undertones can wear most colors beautifully!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteFinder;