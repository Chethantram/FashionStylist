import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProofSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const metrics = [
    {
      id: 1,
      value: '2k+',
      label: 'Outfits Created',
      icon: 'Shirt',
      color: 'text-brand-gold'
    },
    {
      id: 2,
      value: '40%',
      label: 'Average Confidence Boost',
      icon: 'TrendingUp',
      color: 'text-green-500'
    },
    {
      id: 3,
      value: '1.5+',
      label: 'Happy Users',
      icon: 'Users',
      color: 'text-brand-cta'
    },
    {
      id: 4,
      value: '4.5/5',
      label: 'User Rating',
      icon: 'Star',
      color: 'text-yellow-500'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Marketing Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      beforeImage: '/before3.png',
      afterImage: '/after3.png',
      quote: `StyleMind AI completely transformed my professional wardrobe. I went from feeling uncertain about my outfit choices to receiving compliments daily. The AI understood my body type and lifestyle perfectly.`,
      rating: 5,
      transformation: 'Professional Confidence'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Creative Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      beforeImage: '/before2.png',
      afterImage: '/after2.png',
      quote: `As someone who travels constantly for work, having an AI stylist that understands my schedule and climate needs has been game-changing. My style evolved from basic to sophisticated effortlessly.`,
      rating: 5,
      transformation: 'Style Evolution'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Entrepreneur',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      beforeImage: '/before1.png',
      afterImage: '/after1.png',
      quote: `After having my second child, I felt lost with my style identity. StyleMind AI helped me rediscover my personal aesthetic while accommodating my new lifestyle. I feel like myself again, but better.`,
      rating: 5,
      transformation: 'Identity Rediscovery'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentUser = testimonials?.[currentTestimonial];

  return (
    <section className="py-20 bg-gradient-to-br from-brand-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metrics Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-charcoal mb-4">
            Trusted by Style Enthusiasts Worldwide
          </h2>
          <p className="text-xl text-brand-text-secondary mb-12 max-w-3xl mx-auto">
            Join millions who have discovered their authentic style and boosted their confidence with AI-powered styling.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics?.map((metric) => (
              <div key={metric?.id} className="text-center group">
                <div className="bg-white rounded-2xl p-8 shadow-brand hover:shadow-elevated transition-all duration-300 transform group-hover:scale-105">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-transparent ${metric?.color} bg-opacity-10 mb-4 `}>
                    <Icon name={metric?.icon} size={24}  />
                  </div>
                  <div className="text-3xl font-bold text-brand-charcoal mb-2">
                    {metric?.value}
                  </div>
                  <div className="text-sm font-medium text-brand-text-secondary">
                    {metric?.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="bg-white rounded-3xl shadow-brand-modal p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Before/After Images */}
            <div className="relative">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-brand-text-primary mb-2">
                  Transformation Story
                </h3>
                <span className="inline-block bg-gradient-to-r from-brand-gold to-brand-cta bg-clip-text text-transparent font-medium">
                  {currentUser?.transformation}
                </span>
              </div>
              
              <div className="flex justify-center space-x-6">
                <div className="text-center">
                  <div className="relative overflow-hidden rounded-2xl shadow-brand mb-3">
                    <Image 
                      src={currentUser?.beforeImage}
                      alt="Before transformation"
                      className="w-32 h-40 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Before
                    </div>
                  </div>
                  <span className="text-sm text-brand-text-secondary">Uncertain Style</span>
                </div>
                
                <div className="flex items-center">
                  <Icon name="ArrowRight" size={24} className="text-brand-gold" />
                </div>
                
                <div className="text-center">
                  <div className="relative overflow-hidden rounded-2xl shadow-brand mb-3">
                    <Image 
                      src={currentUser?.afterImage}
                      alt="After transformation"
                      className="w-32 h-40 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      After
                    </div>
                  </div>
                  <span className="text-sm text-brand-text-secondary">Confident Style</span>
                </div>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Image 
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-brand-text-primary">
                    {currentUser?.name}
                  </h4>
                  <p className="text-brand-text-secondary">{currentUser?.role}</p>
                </div>
              </div>

              <div className="flex space-x-1 mb-4">
                {[...Array(currentUser?.rating)]?.map((_, index) => (
                  <Icon key={index} name="Star" size={20} className="text-yellow-500 fill-current" />
                ))}
              </div>

              <blockquote className="text-lg text-brand-text-primary leading-relaxed italic">
                "{currentUser?.quote}"
              </blockquote>

              <div className="flex items-center space-x-4 pt-4">
                <div className="flex items-center space-x-2 text-green-500">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm font-medium">Verified Purchase</span>
                </div>
                <div className="flex items-center space-x-2 text-brand-gold">
                  <Icon name="Award" size={16} />
                  <span className="text-sm font-medium">Style Success Story</span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Navigation */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-brand-gold scale-125' :'bg-brand-cream hover:bg-brand-gold/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;