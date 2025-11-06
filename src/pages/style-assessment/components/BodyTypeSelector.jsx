import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BodyTypeSelector = ({ onSelectionChange, selectedBodyType }) => {
  const bodyTypes = [
    {
      id: 'apple',
      name: 'Apple',
      description: 'Fuller midsection with narrower hips',
      illustration: `<svg viewBox="0 0 100 120" className="w-full h-full">
        <path d="M30 40 Q30 25 50 25 Q70 25 70 40 L70 70 Q70 85 50 85 Q30 85 30 70 Z" 
              fill="currentColor" opacity="0.8"/>
        <circle cx="50" cy="15" r="8" fill="currentColor"/>
      </svg>`,
      tips: 'Emphasize your shoulders and legs while creating a defined waistline'
    },
    {
      id: 'pear',
      name: 'Pear',
      description: 'Fuller hips with narrower shoulders',
      illustration: `<svg viewBox="0 0 100 120" className="w-full h-full">
        <path d="M40 40 L60 40 L65 70 Q65 85 50 85 Q35 85 35 70 Z" 
              fill="currentColor" opacity="0.8"/>
        <circle cx="50" cy="15" r="8" fill="currentColor"/>
      </svg>`,
      tips: 'Balance your silhouette by highlighting your upper body'
    },
    {
      id: 'hourglass',
      name: 'Hourglass',
      description: 'Balanced shoulders and hips with defined waist',
      illustration: `<svg viewBox="0 0 100 120" className="w-full h-full">
        <path d="M35 40 Q35 30 50 30 Q65 30 65 40 L60 55 Q50 50 40 55 L35 40 Z" 
              fill="currentColor" opacity="0.8"/>
        <path d="M40 55 Q50 60 60 55 L65 70 Q65 85 50 85 Q35 85 35 70 Z" 
              fill="currentColor" opacity="0.8"/>
        <circle cx="50" cy="15" r="8" fill="currentColor"/>
      </svg>`,
      tips: 'Celebrate your natural curves with fitted silhouettes'
    },
    {
      id: 'rectangle',
      name: 'Rectangle',
      description: 'Balanced proportions with minimal waist definition',
      illustration: `<svg viewBox="0 0 100 120" className="w-full h-full">
        <rect x="35" y="30" width="30" height="55" rx="5" 
              fill="currentColor" opacity="0.8"/>
        <circle cx="50" cy="15" r="8" fill="currentColor"/>
      </svg>`,
      tips: 'Create curves and definition with strategic styling'
    },
    {
      id: 'inverted-triangle',
      name: 'Inverted Triangle',
      description: 'Broader shoulders with narrower hips',
      illustration: `<svg viewBox="0 0 100 120" className="w-full h-full">
        <path d="M25 40 Q25 30 50 30 Q75 30 75 40 L65 70 Q65 85 50 85 Q35 85 35 70 Z" 
              fill="currentColor" opacity="0.8"/>
        <circle cx="50" cy="15" r="8" fill="currentColor"/>
      </svg>`,
      tips: 'Balance your frame by adding volume to your lower half'
    },
    {
      id: 'plus-size',
      name: 'Plus Size',
      description: 'Beautiful curves in all the right places',
      illustration: `<svg viewBox="0 0 100 120" className="w-full h-full">
        <path d="M25 40 Q25 25 50 25 Q75 25 75 40 L75 70 Q75 85 50 85 Q25 85 25 70 Z" 
              fill="currentColor" opacity="0.8"/>
        <circle cx="50" cy="15" r="10" fill="currentColor"/>
      </svg>`,
      tips: 'Embrace your curves with confidence and flattering fits'
    }
  ];

  const handleBodyTypeSelect = (bodyTypeId) => {
    onSelectionChange(bodyTypeId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-brand-text-primary mb-2">
          Celebrate Your Beautiful Shape
        </h2>
        <p className="text-brand-text-secondary">
          Every body is unique and beautiful. Help us understand your shape to provide the best styling advice.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bodyTypes?.map((bodyType) => {
          const isSelected = selectedBodyType === bodyType?.id;
          
          return (
            <div
              key={bodyType?.id}
              onClick={() => handleBodyTypeSelect(bodyType?.id)}
              className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-elevated ${
                isSelected 
                  ? 'border-brand-gold bg-brand-cream shadow-brand' 
                  : 'border-border bg-card hover:border-brand-gold/50'
              }`}
            >
              <div className="text-center space-y-4">
                <div className={`w-20 h-24 mx-auto ${isSelected ? 'text-brand-gold' : 'text-brand-text-secondary'}`}>
                  <div dangerouslySetInnerHTML={{ __html: bodyType?.illustration }} />
                </div>
                
                <div>
                  <h3 className="font-semibold text-brand-text-primary mb-1">
                    {bodyType?.name}
                  </h3>
                  <p className="text-sm text-brand-text-secondary mb-3">
                    {bodyType?.description}
                  </p>
                  <p className="text-xs text-brand-trust italic">
                    {bodyType?.tips}
                  </p>
                </div>

                {isSelected && (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center">
                      <Icon name="Check" size={16} color="white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-brand-cream p-4 rounded-lg text-center">
        <Icon name="Heart" size={20} className="text-brand-gold mx-auto mb-2" />
        <p className="text-sm text-brand-text-secondary">
          Remember: These are just guidelines to help us style you better. Every body is beautiful and unique!
        </p>
      </div>
    </div>
  );
};

export default BodyTypeSelector;