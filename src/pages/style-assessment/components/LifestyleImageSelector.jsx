import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const LifestyleImageSelector = ({ onSelectionChange, selectedImages }) => {
  const lifestyleScenarios = [
    {
      id: 'boardroom',
      title: 'Boardroom Meetings',
      description: 'Professional presentations and corporate environments',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Professional'
    },
    {
      id: 'weekend-brunch',
      title: 'Weekend Brunches',
      description: 'Casual dining and social gatherings',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Casual'
    },
    {
      id: 'creative-workspace',
      title: 'Creative Workspaces',
      description: 'Artistic environments and collaborative spaces',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Creative'
    },
    {
      id: 'evening-events',
      title: 'Evening Events',
      description: 'Dinners, parties, and social occasions',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Social'
    },
    {
      id: 'outdoor-activities',
      title: 'Outdoor Activities',
      description: 'Parks, hiking, and recreational pursuits',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Active'
    },
    {
      id: 'travel-adventures',
      title: 'Travel Adventures',
      description: 'Exploring new places and cultures',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Travel'
    }
  ];

  const handleImageSelect = (scenarioId) => {
    const updatedSelection = selectedImages?.includes(scenarioId)
      ? selectedImages?.filter(id => id !== scenarioId)
      : [...selectedImages, scenarioId];
    
    onSelectionChange(updatedSelection);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-brand-text-primary mb-2">
          What's Your Lifestyle Like?
        </h2>
        <p className="text-brand-text-secondary">
          Select the scenarios that best represent your daily life
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lifestyleScenarios?.map((scenario) => {
          const isSelected = selectedImages?.includes(scenario?.id);
          
          return (
            <div
              key={scenario?.id}
              onClick={() => handleImageSelect(scenario?.id)}
              className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                isSelected 
                  ? 'ring-4 ring-brand-gold shadow-brand-modal' 
                  : 'hover:shadow-elevated'
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={scenario?.image}
                  alt={scenario?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                    {scenario?.category}
                  </span>
                  {isSelected && (
                    <div className="w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center">
                      <Icon name="Check" size={16} color="white" />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-sm mb-1">{scenario?.title}</h3>
                <p className="text-xs opacity-90">{scenario?.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center text-sm text-brand-text-secondary">
        Select 2-4 scenarios that best match your lifestyle
      </div>
    </div>
  );
};

export default LifestyleImageSelector;