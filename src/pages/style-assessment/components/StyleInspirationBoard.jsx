import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const StyleInspirationBoard = ({ onSelectionChange, likedOutfits, dislikedOutfits }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const outfitInspiration = [
    {
      id: 'minimalist-chic',
      title: 'Minimalist Chic',
      description: 'Clean lines, neutral colors, effortless elegance',
      image: '/style1.png',
      tags: ['Minimalist', 'Professional', 'Timeless'],
      style: 'minimalist'
    },
    {
      id: 'bohemian-free',
      title: 'Bohemian Free Spirit',
      description: 'Flowing fabrics, earthy tones, artistic flair',
      image: '/style2.png',
      tags: ['Bohemian', 'Artistic', 'Relaxed'],
      style: 'bohemian'
    },
    {
      id: 'classic-elegant',
      title: 'Classic Elegance',
      description: 'Tailored pieces, sophisticated silhouettes',
      image: '/style3.png',
      tags: ['Classic', 'Elegant', 'Sophisticated'],
      style: 'classic'
    },
    {
      id: 'edgy-modern',
      title: 'Edgy Modern',
      description: 'Bold statements, unexpected combinations',
      image: '/style4.png',
      tags: ['Edgy', 'Modern', 'Bold'],
      style: 'edgy'
    },
    {
      id: 'romantic-feminine',
      title: 'Romantic Feminine',
      description: 'Soft textures, delicate details, graceful silhouettes',
      image: '/style5.png',
      tags: ['Romantic', 'Feminine', 'Soft'],
      style: 'romantic'
    },
    {
      id: 'casual-comfort',
      title: 'Casual Comfort',
      description: 'Relaxed fits, comfortable fabrics, everyday ease',
      image: '/style6.png',
      tags: ['Casual', 'Comfortable', 'Relaxed'],
      style: 'casual'
    },
    {
      id: 'business-power',
      title: 'Business Power',
      description: 'Sharp tailoring, confident silhouettes, professional polish',
      image: '/style7.png',
      tags: ['Business', 'Professional', 'Powerful'],
      style: 'business'
    },
    {
      id: 'creative-artistic',
      title: 'Creative Artistic',
      description: 'Unique pieces, mixed patterns, expressive style',
      image: '/style8.png',
      tags: ['Creative', 'Artistic', 'Unique'],
      style: 'creative'
    }
  ];

  const currentOutfit = outfitInspiration?.[currentIndex];

  const handleLike = () => {
    const updatedLiked = [...likedOutfits, currentOutfit?.id];
    onSelectionChange(updatedLiked, dislikedOutfits);
    nextOutfit();
  };

  const handleDislike = () => {
    const updatedDisliked = [...dislikedOutfits, currentOutfit?.id];
    onSelectionChange(likedOutfits, updatedDisliked);
    nextOutfit();
  };

  const nextOutfit = () => {
    if (currentIndex < outfitInspiration?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousOutfit = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progress = ((currentIndex + 1) / outfitInspiration?.length) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-brand-text-primary mb-2">
          Style Inspiration Discovery
        </h2>
        <p className="text-brand-text-secondary">
          Swipe through styles and heart the ones that speak to you
        </p>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-border rounded-full h-2">
        <div 
          className="bg-brand-gold h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-center text-sm text-brand-text-secondary">
        {currentIndex + 1} of {outfitInspiration?.length}
      </div>
      {/* Main Card */}
      <div className="max-w-md mx-auto">
        <div className="bg-card rounded-2xl shadow-brand-modal overflow-hidden">
          <div className="aspect-[3/4] overflow-hidden relative">
            <Image
              src={currentOutfit?.image}
              alt={currentOutfit?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Navigation Arrows */}
            {currentIndex > 0 && (
              <button
                onClick={previousOutfit}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Icon name="ChevronLeft" size={20} color="white" />
              </button>
            )}
            
            {currentIndex < outfitInspiration?.length - 1 && (
              <button
                onClick={nextOutfit}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Icon name="ChevronRight" size={20} color="white" />
              </button>
            )}
          </div>

          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-brand-text-primary mb-2">
                {currentOutfit?.title}
              </h3>
              <p className="text-brand-text-secondary mb-3">
                {currentOutfit?.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {currentOutfit?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-brand-cream text-brand-text-secondary text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDislike}
                className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors group"
              >
                <Icon name="X" size={24} className="text-gray-600 group-hover:text-gray-800" />
              </button>
              
              <button
                onClick={handleLike}
                className="w-14 h-14 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors group"
              >
                <Icon name="Heart" size={24} className="text-red-500 group-hover:text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Liked Styles Summary */}
      {likedOutfits?.length > 0 && (
        <div className="bg-brand-cream p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Heart" size={18} className="text-red-500" />
            <h4 className="font-semibold text-brand-text-primary">
              Styles You Love ({likedOutfits?.length})
            </h4>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {likedOutfits?.map((outfitId) => {
              const outfit = outfitInspiration?.find(o => o?.id === outfitId);
              return outfit ? (
                <span
                  key={outfitId}
                  className="px-3 py-1 bg-white text-brand-text-secondary text-sm rounded-full"
                >
                  {outfit?.title}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
      {/* Instructions */}
      <div className="text-center space-y-2">
        <p className="text-sm text-brand-text-secondary">
          💡 Tip: The more styles you heart, the better we can understand your preferences!
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs text-brand-trust">
          <div className="flex items-center space-x-1">
            <Icon name="X" size={16} />
            <span>Skip</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Heart" size={16} />
            <span>Love it</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleInspirationBoard;