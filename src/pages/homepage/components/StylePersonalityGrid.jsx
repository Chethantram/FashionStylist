import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StylePersonalityGrid = () => {
  const [hoveredStyle, setHoveredStyle] = useState(null);

  const styleCategories = [
    {
      id: 'minimalist',
      title: 'Minimalist',
      description: 'Clean lines, neutral colors, and timeless pieces',
      icon: 'Minus',
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      outfits: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=250&fit=crop",
        "https://images.unsplash.com/photo-1544957992-20349e67893a?w=200&h=250&fit=crop",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&h=250&fit=crop"
      ],
      keywords: ['Clean', 'Simple', 'Elegant', 'Neutral']
    },
    {
      id: 'bohemian',
      title: 'Bohemian',
      description: 'Free-spirited, artistic, and eclectic combinations',
      icon: 'Flower',
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      outfits: [
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=250&fit=crop",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=250&fit=crop",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=250&fit=crop"
      ],
      keywords: ['Artistic', 'Flowy', 'Layered', 'Earthy']
    },
    {
      id: 'classic',
      title: 'Classic',
      description: 'Timeless sophistication and refined elegance',
      icon: 'Crown',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      outfits: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=250&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=250&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=250&fit=crop"
      ],
      keywords: ['Timeless', 'Polished', 'Structured', 'Refined']
    },
    {
      id: 'edgy',
      title: 'Edgy',
      description: 'Bold statements, leather, and contemporary edge',
      icon: 'Zap',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      outfits: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&h=250&fit=crop",
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=250&fit=crop",
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&h=250&fit=crop"
      ],
      keywords: ['Bold', 'Modern', 'Statement', 'Confident']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text-primary mb-4">
            Discover Your Style Personality
          </h2>
          <p className="text-xl text-brand-text-secondary max-w-3xl mx-auto">
            Explore different aesthetic categories and find the style that resonates with your authentic self. Each personality offers endless possibilities for expression.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {styleCategories?.map((style) => (
            <div
              key={style?.id}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredStyle(style?.id)}
              onMouseLeave={() => setHoveredStyle(null)}
            >
              {/* Main Card */}
              <div className={`relative overflow-hidden rounded-2xl ${style?.bgColor} border-2 border-transparent group-hover:border-current transition-all duration-500 transform group-hover:scale-105 shadow-subtle group-hover:shadow-elevated`}>
                {/* Header */}
                <div className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${style?.color} mb-4 transform group-hover:rotate-12 transition-transform duration-300`}>
                    <Icon name={style?.icon} size={24} color="white" />
                  </div>
                  <h3 className={`text-xl font-semibold ${style?.textColor} mb-2`}>
                    {style?.title}
                  </h3>
                  <p className="text-sm text-brand-text-secondary leading-relaxed">
                    {style?.description}
                  </p>
                </div>

                {/* Outfit Preview */}
                <div className="relative h-48 overflow-hidden">
                  {hoveredStyle === style?.id ? (
                    <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2 bg-white/90 backdrop-blur-sm">
                      {style?.outfits?.map((outfit, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg">
                          <Image 
                            src={outfit}
                            alt={`${style?.title} outfit ${index + 1}`}
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="absolute inset-0">
                      <Image 
                        src={style?.outfits?.[0]}
                        alt={`${style?.title} style`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                  )}
                </div>

                {/* Keywords */}
                <div className="p-4 bg-white/80 backdrop-blur-sm">
                  <div className="flex flex-wrap gap-2">
                    {style?.keywords?.map((keyword, index) => (
                      <span 
                        key={index}
                        className={`px-2 py-1 text-xs font-medium rounded-full ${style?.textColor} bg-current bg-opacity-10`}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Link to="/style-assessment">
                    <button className="bg-white text-brand-text-primary px-6 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-brand-cream">
                      Explore {style?.title}
                    </button>
                  </Link>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-brand-gold to-brand-cta rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-brand-cta to-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{animationDelay: '0.2s'}}></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-brand-text-secondary mb-6">
            Not sure which style fits you? Let our AI analyze your preferences.
          </p>
          <Link to="/style-assessment">
            <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-gold to-brand-cta text-white px-8 py-4 rounded-xl font-semibold hover:from-brand-cta hover:to-brand-gold transition-all duration-300 transform hover:scale-105 shadow-brand">
              <Icon name="Sparkles" size={20} />
              <span>Take Style Assessment</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StylePersonalityGrid;