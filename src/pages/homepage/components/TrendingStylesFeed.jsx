import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrendingStylesFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleOutfits, setVisibleOutfits] = useState(8);

  const categories = [
    { id: 'all', name: 'All Styles', icon: 'Grid3X3' },
    { id: 'work', name: 'Work', icon: 'Briefcase' },
    { id: 'casual', name: 'Casual', icon: 'Coffee' },
    { id: 'evening', name: 'Evening', icon: 'Moon' },
    { id: 'weekend', name: 'Weekend', icon: 'Sun' }
  ];

  const trendingOutfits = [
    {
      id: 1,
      title: 'Power Blazer Ensemble',
      category: 'work',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      user: {
        name: 'Sarah M.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
      },
      likes: 234,
      saves: 89,
      tags: ['Professional', 'Confident', 'Classic'],
      aiScore: 95,
      trending: true
    },
    {
      id: 2,
      title: 'Effortless Weekend Chic',
      category: 'casual',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
      user: {
        name: 'Emma R.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
      },
      likes: 189,
      saves: 67,
      tags: ['Relaxed', 'Trendy', 'Comfortable'],
      aiScore: 92,
      trending: false
    },
    {
      id: 3,
      title: 'Date Night Elegance',
      category: 'evening',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop',
      user: {
        name: 'Lisa K.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
      },
      likes: 312,
      saves: 145,
      tags: ['Romantic', 'Elegant', 'Sophisticated'],
      aiScore: 98,
      trending: true
    },
    {
      id: 4,
      title: 'Modern Minimalist',
      category: 'work',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop',
      user: {
        name: 'Alex T.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      likes: 156,
      saves: 78,
      tags: ['Minimal', 'Clean', 'Timeless'],
      aiScore: 89,
      trending: false
    },
    {
      id: 5,
      title: 'Boho Festival Vibes',
      category: 'weekend',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop',
      user: {
        name: 'Maya P.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face'
      },
      likes: 278,
      saves: 123,
      tags: ['Bohemian', 'Artistic', 'Free-spirited'],
      aiScore: 94,
      trending: true
    },
    {
      id: 6,
      title: 'Street Style Edge',
      category: 'casual',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop',
      user: {
        name: 'Jordan L.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      },
      likes: 201,
      saves: 91,
      tags: ['Edgy', 'Urban', 'Bold'],
      aiScore: 91,
      trending: false
    },
    {
      id: 7,
      title: 'Cocktail Hour Glam',
      category: 'evening',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop',
      user: {
        name: 'Sophia C.',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face'
      },
      likes: 345,
      saves: 167,
      tags: ['Glamorous', 'Chic', 'Statement'],
      aiScore: 96,
      trending: true
    },
    {
      id: 8,
      title: 'Sunday Brunch Ready',
      category: 'weekend',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=400&fit=crop',
      user: {
        name: 'Rachel W.',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face'
      },
      likes: 167,
      saves: 54,
      tags: ['Casual', 'Fresh', 'Approachable'],
      aiScore: 87,
      trending: false
    }
  ];

  const filteredOutfits = selectedCategory === 'all' 
    ? trendingOutfits 
    : trendingOutfits?.filter(outfit => outfit?.category === selectedCategory);

  const displayedOutfits = filteredOutfits?.slice(0, visibleOutfits);

  return (
    <section className="py-20 bg-gradient-to-br from-white to-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text-primary mb-4">
            Trending Style Combinations
          </h2>
          <p className="text-xl text-brand-text-secondary max-w-3xl mx-auto">
            Discover what's popular in our community. Real outfits from real users, curated by AI and loved by style enthusiasts worldwide.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category?.id
                  ? 'bg-gradient-to-r from-brand-gold to-brand-cta text-white shadow-brand'
                  : 'bg-white text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-cream border border-brand-cream'
              }`}
            >
              <Icon name={category?.icon} size={18} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>

        {/* Outfit Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayedOutfits?.map((outfit) => (
            <div key={outfit?.id} className="group relative bg-white rounded-2xl shadow-brand hover:shadow-elevated transition-all duration-300 transform hover:scale-105 overflow-hidden">
              
              {/* Image */}
              <div className="relative overflow-hidden">
                <Image 
                  src={outfit?.image}
                  alt={outfit?.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-3">
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors duration-200">
                      <Icon name="Heart" size={18} className="text-red-500" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors duration-200">
                      <Icon name="Bookmark" size={18} className="text-brand-gold" />
                    </button>
                    <Link to="/ai-stylist-chat">
                      <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors duration-200">
                        <Icon name="MessageCircle" size={18} className="text-brand-cta" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-brand-text-primary mb-2 line-clamp-1">
                  {outfit?.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {outfit?.tags?.slice(0, 2)?.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-brand-cream text-brand-text-secondary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                
              </div>
            </div>
          ))}
        </div>

        {/* Load More / CTA */}
        <div className="text-center space-y-6">
          {visibleOutfits < filteredOutfits?.length && (
            <button
              onClick={() => setVisibleOutfits(prev => prev + 4)}
              className="inline-flex items-center space-x-2 bg-white text-brand-text-primary px-8 py-4 rounded-xl font-semibold border-2 border-brand-cream hover:border-brand-gold hover:bg-brand-cream transition-all duration-300"
            >
              <Icon name="Plus" size={20} />
              <span>Load More Styles</span>
            </button>
          )}
          
          <div className="pt-8">
            <p className="text-brand-text-secondary mb-6">
              Ready to create your own trending looks?
            </p>
            <Link to="/ai-stylist-chat">
              <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-gold to-brand-cta text-white px-8 py-4 rounded-xl font-semibold hover:from-brand-cta hover:to-brand-gold transition-all duration-300 transform hover:scale-105 shadow-brand">
                <Icon name="Sparkles" size={20} />
                <span>Start Creating Outfits</span>
              </button>
            </Link>
          </div>
        </div>

        {/* FOMO Banner */}
        <div className="mt-16 bg-gradient-to-r from-brand-charcoal to-brand-cta rounded-2xl p-8 text-center text-white">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Users" size={24} />
            <span className="text-lg font-semibold">Join 150K+ Style Enthusiasts</span>
          </div>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Don't miss out on the latest style trends and personalized recommendations. 
            Our community creates over 1,000 new outfit combinations daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/style-assessment">
              <button className="bg-white text-brand-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-brand-cream transition-colors duration-300">
                Get Started Free
              </button>
            </Link>
            <Link to="/virtual-wardrobe">
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-charcoal transition-all duration-300">
                Explore Features
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingStylesFeed;