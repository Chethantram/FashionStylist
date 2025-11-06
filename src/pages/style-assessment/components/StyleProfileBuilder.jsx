import React from 'react';
import Icon from '../../../components/AppIcon';

const StyleProfileBuilder = ({ assessmentData }) => {
  const getStyleArchetype = () => {
    const { likedOutfits = [], selectedColors = {}, budgetData = {} } = assessmentData;
    
    // Simple logic to determine style archetype based on selections
    if (likedOutfits?.includes('minimalist-chic') || likedOutfits?.includes('classic-elegant')) {
      return {
        name: 'The Refined Minimalist',
        description: 'You appreciate clean lines, quality over quantity, and timeless elegance.',
        traits: ['Sophisticated', 'Timeless', 'Quality-focused'],
        color: 'text-blue-600',
        icon: 'Sparkles'
      };
    } else if (likedOutfits?.includes('bohemian-free') || likedOutfits?.includes('creative-artistic')) {
      return {
        name: 'The Creative Spirit',
        description: 'You love expressing your individuality through unique and artistic pieces.',
        traits: ['Creative', 'Expressive', 'Unique'],
        color: 'text-purple-600',
        icon: 'Palette'
      };
    } else if (likedOutfits?.includes('business-power') || likedOutfits?.includes('classic-elegant')) {
      return {
        name: 'The Power Player',
        description: 'You command attention with polished, professional, and confident style.',
        traits: ['Professional', 'Confident', 'Polished'],
        color: 'text-gray-700',
        icon: 'Crown'
      };
    } else {
      return {
        name: 'The Versatile Explorer',
        description: 'You enjoy experimenting with different styles and adapting to any occasion.',
        traits: ['Versatile', 'Adaptable', 'Experimental'],
        color: 'text-green-600',
        icon: 'Compass'
      };
    }
  };

  const styleArchetype = getStyleArchetype();

  const getColorPalette = () => {
    const { selectedColors = {} } = assessmentData;
    const favorites = selectedColors?.favorites || [];
    return favorites?.slice(0, 6); // Show first 6 favorite colors
  };

  const getStyleInsights = () => {
    const insights = [];
    const { selectedBodyType, selectedImages = [], budgetData = {} } = assessmentData;

    if (selectedBodyType) {
      insights?.push(`Body type: ${selectedBodyType?.charAt(0)?.toUpperCase() + selectedBodyType?.slice(1)}`);
    }

    if (selectedImages?.length > 0) {
      insights?.push(`Lifestyle: ${selectedImages?.length} scenarios selected`);
    }

    if (budgetData?.budget) {
      insights?.push(`Budget preference: ${budgetData?.budget?.replace('-', ' ')}`);
    }

    return insights;
  };

  const getRecommendations = () => {
    const { likedOutfits = [], budgetData = {} } = assessmentData;
    const recommendations = [];

    if (likedOutfits?.includes('minimalist-chic')) {
      recommendations?.push('Invest in a quality white button-down shirt');
      recommendations?.push('Add a tailored blazer in a neutral tone');
    }

    if (likedOutfits?.includes('bohemian-free')) {
      recommendations?.push('Try flowing maxi dresses with artistic prints');
      recommendations?.push('Layer with statement jewelry and scarves');
    }

    if (budgetData?.priorities?.includes('sustainable')) {
      recommendations?.push('Explore sustainable fashion brands');
      recommendations?.push('Consider capsule wardrobe building');
    }

    if (recommendations?.length === 0) {
      recommendations?.push('Start with versatile basics in your favorite colors');
      recommendations?.push('Add statement pieces that reflect your personality');
    }

    return recommendations;
  };

  const colorPalette = getColorPalette();
  const insights = getStyleInsights();
  const recommendations = getRecommendations();

  return (
    <div className="bg-card rounded-2xl shadow-brand-modal p-6 space-y-6">
      <div className="text-center">
        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-brand-gold to-brand-cta flex items-center justify-center mb-4`}>
          <Icon name={styleArchetype?.icon} size={32} color="white" />
        </div>
        
        <h3 className="text-xl font-semibold text-brand-text-primary mb-2">
          {styleArchetype?.name}
        </h3>
        
        <p className="text-brand-text-secondary mb-4">
          {styleArchetype?.description}
        </p>

        <div className="flex justify-center space-x-2 mb-6">
          {styleArchetype?.traits?.map((trait, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-brand-cream text-brand-text-secondary text-sm rounded-full"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
      {/* Color Palette */}
      {colorPalette?.length > 0 && (
        <div>
          <h4 className="font-semibold text-brand-text-primary mb-3 flex items-center">
            <Icon name="Palette" size={18} className="mr-2" />
            Your Color Palette
          </h4>
          <div className="flex space-x-2">
            {colorPalette?.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-lg shadow-sm border border-border"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
      {/* Style Insights */}
      {insights?.length > 0 && (
        <div>
          <h4 className="font-semibold text-brand-text-primary mb-3 flex items-center">
            <Icon name="TrendingUp" size={18} className="mr-2" />
            Style Insights
          </h4>
          <div className="space-y-2">
            {insights?.map((insight, index) => (
              <div key={index} className="flex items-center text-sm text-brand-text-secondary">
                <Icon name="Check" size={16} className="text-brand-gold mr-2 flex-shrink-0" />
                {insight}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Recommendations */}
      <div>
        <h4 className="font-semibold text-brand-text-primary mb-3 flex items-center">
          <Icon name="Lightbulb" size={18} className="mr-2" />
          Personalized Recommendations
        </h4>
        <div className="space-y-2">
          {recommendations?.map((recommendation, index) => (
            <div key={index} className="flex items-start text-sm text-brand-text-secondary">
              <Icon name="ArrowRight" size={16} className="text-brand-gold mr-2 flex-shrink-0 mt-0.5" />
              {recommendation}
            </div>
          ))}
        </div>
      </div>
      {/* Completion Status */}
      <div className="bg-brand-cream p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-semibold text-brand-text-primary">Profile Completion</h5>
            <p className="text-sm text-brand-text-secondary">
              {Object.keys(assessmentData)?.length > 3 ? 'Almost complete!' : 'Keep going to unlock more insights'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-brand-gold">
              {Math.round((Object.keys(assessmentData)?.length / 6) * 100)}%
            </div>
            <div className="text-xs text-brand-text-secondary">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleProfileBuilder;