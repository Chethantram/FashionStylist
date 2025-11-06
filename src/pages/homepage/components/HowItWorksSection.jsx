import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: 'Style Assessment',
      subtitle: 'Discover Your Unique Style DNA',
      description: 'Complete our comprehensive style quiz that analyzes your preferences, lifestyle, body type, and color palette. Our AI learns what makes you feel confident and authentic.',
      icon: 'User',
      color: 'from-blue-500 to-indigo-600',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=300&fit=crop',
      features: [
        'Personal style preferences',
        'Lifestyle & occasion needs',
        'Body type analysis',
        'Color palette discovery'
      ],
      duration: '5 minutes'
    },
    {
      id: 2,
      title: 'AI Analysis',
      subtitle: 'Intelligent Style Processing',
      description: 'Our advanced AI processes your responses, analyzing thousands of style combinations and fashion trends to create your personalized style profile and recommendations.',
      icon: 'Brain',
      color: 'from-purple-500 to-pink-600',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      features: [
        'Machine learning analysis',
        'Trend pattern recognition',
        'Style compatibility matching',
        'Personalization algorithms'
      ],
      duration: 'Instant'
    },
    {
      id: 3,
      title: 'Personalized Recommendations',
      subtitle: 'Your Curated Style Journey',
      description: 'Receive tailored outfit suggestions, shopping recommendations, and styling tips that evolve with your preferences. Chat with your AI stylist anytime for instant advice.',
      icon: 'Sparkles',
      color: 'from-brand-gold to-brand-cta',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      features: [
        'Daily outfit suggestions',
        'Occasion-specific looks',
        'Shopping recommendations',
        '24/7 AI stylist chat'
      ],
      duration: 'Ongoing'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentStep = steps?.[activeStep];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-charcoal mb-4">
            How StyleMind AI Works
          </h2>
          <p className="text-xl text-brand-text-secondary max-w-3xl mx-auto">
            Three simple steps to unlock your personal style potential and transform your wardrobe with intelligent recommendations.
          </p>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4 bg-brand-cream rounded-full p-2">
            {steps?.map((step, index) => (
              <React.Fragment key={step?.id}>
                <button
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 ${
                    index === activeStep
                      ? 'bg-white shadow-brand text-brand-text-primary'
                      : 'text-brand-text-secondary hover:text-brand-text-primary'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${step?.color} ${
                    index === activeStep ? 'scale-110' : 'scale-100'
                  } transition-transform duration-300`}>
                    <Icon name={step?.icon} size={16} color="white" />
                  </div>
                  <span className="font-medium hidden sm:block">{step?.title}</span>
                </button>
                {index < steps?.length - 1 && (
                  <div className="w-8 h-0.5 bg-brand-cream"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <div className="bg-gradient-to-br from-brand-cream to-white rounded-3xl shadow-brand-modal overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentStep?.color} flex items-center justify-center`}>
                    <Icon name={currentStep?.icon} size={24} color="white" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-brand-text-secondary">
                      Step {currentStep?.id} • {currentStep?.duration}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-brand-text-primary mb-2">
                  {currentStep?.title}
                </h3>
                <p className="text-lg font-medium text-brand-gold mb-4">
                  {currentStep?.subtitle}
                </p>
                <p className="text-brand-text-secondary leading-relaxed">
                  {currentStep?.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {currentStep?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${currentStep?.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon name="Check" size={14} color="white" />
                    </div>
                    <span className="text-brand-text-primary font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div>
                <Link to="/style-assessment">
                  <button className={`inline-flex items-center space-x-2 bg-gradient-to-r ${currentStep?.color} text-white px-8 py-4 rounded-xl font-semibold hover:shadow-elevated transition-all duration-300 transform hover:scale-105`}>
                    <Icon name="ArrowRight" size={20} />
                    <span>
                      {activeStep === 0 ? 'Start Assessment' : 
                       activeStep === 1 ? 'See AI in Action': 'Get Recommendations'}
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Visual Side */}
            <div className="relative bg-gradient-to-br from-gray-50 to-white p-8 lg:p-12">
              <div className="relative">
                {/* Main Image */}
                <div className="relative overflow-hidden rounded-2xl shadow-brand">
                  <Image 
                    src={currentStep?.image}
                    alt={currentStep?.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-brand animate-bounce">
                  <Icon name="Sparkles" size={20} className="text-brand-gold" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-brand animate-pulse">
                  <Icon name="Heart" size={20} className="text-red-500" />
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-brand-text-primary">
                      {currentStep?.title} Progress
                    </span>
                    <span className="text-brand-text-secondary">
                      {Math.round(((activeStep + 1) / steps?.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-brand-cream rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${currentStep?.color} transition-all duration-1000`}
                      style={{ width: `${((activeStep + 1) / steps?.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-brand-cream px-6 py-3 rounded-full">
            <Icon name="Clock" size={16} className="text-brand-text-secondary" />
            <span className="text-sm font-medium text-brand-text-secondary">
              Complete setup in under 10 minutes • Start styling immediately
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;