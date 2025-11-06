import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StylingModal = ({ isOpen, onClose, product, onAddToCart, onAddToWishlist }) => {
  const [selectedOutfit, setSelectedOutfit] = useState(0);
  const [selectedBodyType, setSelectedBodyType] = useState('average');

  if (!isOpen || !product) return null;

  const outfitSuggestions = [
    {
      id: 1,
      name: "Professional Chic",
      occasion: "Work",
      items: [
        { name: product?.name, image: product?.images?.[0], isMainItem: true },
        { name: "Tailored Blazer", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400" },
        { name: "Classic Pumps", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400" },
        { name: "Structured Handbag", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" }
      ],
      description: "Perfect for important meetings and professional events. This combination creates a polished, confident look that commands respect.",
      styling_tips: [
        "Tuck in the top for a more structured silhouette",
        "Add a statement watch for professional polish",
        "Keep accessories minimal and sophisticated"
      ]
    },
    {
      id: 2,
      name: "Weekend Casual",
      occasion: "Casual",
      items: [
        { name: product?.name, image: product?.images?.[0], isMainItem: true },
        { name: "Denim Jacket", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400" },
        { name: "White Sneakers", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400" },
        { name: "Canvas Tote", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" }
      ],
      description: "Effortlessly stylish for weekend outings, coffee dates, and casual social gatherings.",
      styling_tips: [
        "Layer with a light cardigan for cooler weather",
        "Roll up sleeves for a more relaxed vibe",
        "Add delicate jewelry for feminine touches"
      ]
    },
    {
      id: 3,
      name: "Date Night Glam",
      occasion: "Evening",
      items: [
        { name: product?.name, image: product?.images?.[0], isMainItem: true },
        { name: "Statement Earrings", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
        { name: "Heeled Sandals", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400" },
        { name: "Clutch Bag", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" }
      ],
      description: "Sophisticated and alluring for romantic dinners and special evening occasions.",
      styling_tips: [
        "Choose one statement piece to avoid overwhelming",
        "Opt for a bold lip color to complete the look",
        "Consider a light wrap for outdoor venues"
      ]
    }
  ];

  const bodyTypes = [
    { value: 'petite', label: 'Petite', description: 'Under 5\'4"' },
    { value: 'average', label: 'Average', description: '5\'4" - 5\'7"' },
    { value: 'tall', label: 'Tall', description: 'Over 5\'7"' },
    { value: 'curvy', label: 'Curvy', description: 'Fuller figure' },
    { value: 'athletic', label: 'Athletic', description: 'Toned build' }
  ];

  const currentOutfit = outfitSuggestions?.[selectedOutfit];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-brand-modal max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-brand-text-primary">
              Styling Options
            </h2>
            <p className="text-sm text-brand-text-secondary mt-1">
              {product?.name} by {product?.brand}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left Side - Outfit Visualization */}
            <div>
              {/* Body Type Selector */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-brand-text-primary mb-2">
                  Select Body Type for Virtual Try-On
                </h3>
                <div className="flex flex-wrap gap-2">
                  {bodyTypes?.map((type) => (
                    <button
                      key={type?.value}
                      onClick={() => setSelectedBodyType(type?.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${
                        selectedBodyType === type?.value
                          ? 'bg-brand-gold text-white' :'bg-muted text-brand-text-secondary hover:bg-brand-cream'
                      }`}
                    >
                      {type?.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Outfit Visualization */}
              <div className="bg-muted rounded-lg p-6 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  {currentOutfit?.items?.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className={`aspect-square rounded-lg overflow-hidden mb-2 ${
                        item?.isMainItem ? 'ring-2 ring-brand-gold' : ''
                      }`}>
                        <Image
                          src={item?.image}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-brand-text-secondary">
                        {item?.name}
                        {item?.isMainItem && (
                          <Icon name="Star" size={12} className="inline ml-1 text-brand-gold" />
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Virtual Try-On Preview */}
              <div className="bg-gradient-to-b from-brand-cream to-white rounded-lg p-4 text-center">
                <Icon name="User" size={48} className="text-brand-text-secondary mx-auto mb-2" />
                <p className="text-sm text-brand-text-secondary">
                  Virtual try-on for {bodyTypes?.find(t => t?.value === selectedBodyType)?.label} body type
                </p>
                <Button variant="outline" size="sm" className="mt-2" iconName="Camera">
                  Upload Your Photo
                </Button>
              </div>
            </div>

            {/* Right Side - Outfit Details */}
            <div>
              {/* Outfit Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-brand-text-primary mb-3">
                  Styling Options
                </h3>
                <div className="space-y-2">
                  {outfitSuggestions?.map((outfit, index) => (
                    <button
                      key={outfit?.id}
                      onClick={() => setSelectedOutfit(index)}
                      className={`w-full p-3 rounded-lg text-left transition-smooth ${
                        selectedOutfit === index
                          ? 'bg-brand-cream border-2 border-brand-gold' :'bg-muted hover:bg-brand-cream border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-brand-text-primary">
                            {outfit?.name}
                          </h4>
                          <p className="text-sm text-brand-text-secondary">
                            {outfit?.occasion}
                          </p>
                        </div>
                        <Icon 
                          name={selectedOutfit === index ? "CheckCircle" : "Circle"} 
                          size={20} 
                          className={selectedOutfit === index ? "text-brand-gold" : "text-brand-text-secondary"} 
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Outfit Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-brand-text-primary mb-2">
                    {currentOutfit?.name}
                  </h4>
                  <p className="text-sm text-brand-text-secondary">
                    {currentOutfit?.description}
                  </p>
                </div>

                {/* Styling Tips */}
                <div>
                  <h5 className="font-medium text-brand-text-primary mb-2 flex items-center gap-2">
                    <Icon name="Lightbulb" size={16} />
                    Styling Tips
                  </h5>
                  <ul className="space-y-1">
                    {currentOutfit?.styling_tips?.map((tip, index) => (
                      <li key={index} className="text-sm text-brand-text-secondary flex items-start gap-2">
                        <Icon name="Check" size={14} className="text-brand-gold mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Insights */}
                <div className="p-3 bg-brand-cream rounded-lg border border-brand-gold/20">
                  <div className="flex items-start gap-2">
                    <Icon name="Sparkles" size={16} className="text-brand-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-brand-text-primary mb-1">
                        AI Styling Insight
                      </p>
                      <p className="text-sm text-brand-text-secondary">
                        This piece works exceptionally well with your style profile. The versatile design allows for easy transition between casual and formal settings, making it a valuable addition to your capsule wardrobe.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4">
                  <Button
                    variant="default"
                    size="default"
                    fullWidth
                    iconName="ShoppingCart"
                    iconPosition="left"
                    onClick={() => onAddToCart(product)}
                  >
                    Add to Cart - ${product?.currentPrice}
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="default"
                      className="flex-1"
                      iconName="Heart"
                      iconPosition="left"
                      onClick={() => onAddToWishlist(product?.id, true)}
                    >
                      Wishlist
                    </Button>
                    <Button
                      variant="outline"
                      size="default"
                      className="flex-1"
                      iconName="Share"
                      iconPosition="left"
                    >
                      Share Look
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylingModal;