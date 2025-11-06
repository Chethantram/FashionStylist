import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonModal = ({ isOpen, onClose, products, onAddToCart, onAddToWishlist }) => {
  const [selectedProducts, setSelectedProducts] = useState(products?.slice(0, 3));

  if (!isOpen) return null;

  const comparisonCategories = [
    { key: 'price', label: 'Price', type: 'price' },
    { key: 'rating', label: 'Rating', type: 'rating' },
    { key: 'sustainability', label: 'Sustainability', type: 'score' },
    { key: 'versatility', label: 'Versatility', type: 'score' },
    { key: 'quality', label: 'Quality', type: 'score' },
    { key: 'material', label: 'Material', type: 'text' },
    { key: 'care', label: 'Care Instructions', type: 'text' },
    { key: 'sizing', label: 'Sizing', type: 'text' },
    { key: 'returnPolicy', label: 'Return Policy', type: 'text' }
  ];

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getBestValue = (products, key, type) => {
    if (type === 'price') {
      return Math.min(...products?.map(p => p?.[key]));
    }
    if (type === 'rating' || type === 'score') {
      return Math.max(...products?.map(p => p?.[key] || 0));
    }
    return null;
  };

  const isBestValue = (product, key, type, bestValue) => {
    if (type === 'price') {
      return product?.[key] === bestValue;
    }
    if (type === 'rating' || type === 'score') {
      return (product?.[key] || 0) === bestValue;
    }
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-brand-modal max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-brand-text-primary">
            Product Comparison
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            {/* Product Headers */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="hidden md:block"></div>
              {selectedProducts?.map((product) => (
                <div key={product?.id} className="text-center">
                  <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={product?.images?.[0]}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-brand-text-primary mb-1 line-clamp-2">
                    {product?.name}
                  </h3>
                  <p className="text-sm text-brand-text-secondary">{product?.brand}</p>
                </div>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="space-y-4">
              {comparisonCategories?.map((category) => {
                const bestValue = getBestValue(selectedProducts, category?.key, category?.type);
                
                return (
                  <div key={category?.key} className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4 border-b border-border last:border-b-0">
                    <div className="font-medium text-brand-text-primary">
                      {category?.label}
                    </div>
                    {selectedProducts?.map((product) => {
                      const value = product?.[category?.key];
                      const isHighlighted = isBestValue(product, category?.key, category?.type, bestValue);
                      
                      return (
                        <div key={product?.id} className="text-center">
                          {category?.type === 'price' && (
                            <div className={`font-semibold ${isHighlighted ? 'text-green-600' : 'text-brand-text-primary'}`}>
                              ${value}
                              {isHighlighted && (
                                <Icon name="Crown" size={14} className="inline ml-1 text-yellow-500" />
                              )}
                            </div>
                          )}
                          {category?.type === 'rating' && (
                            <div className="flex items-center justify-center gap-1">
                              <div className="flex">
                                {[...Array(5)]?.map((_, i) => (
                                  <Icon
                                    key={i}
                                    name="Star"
                                    size={14}
                                    className={i < Math.floor(value || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}
                                  />
                                ))}
                              </div>
                              <span className={`text-sm ml-1 ${isHighlighted ? 'font-semibold text-green-600' : 'text-brand-text-secondary'}`}>
                                {value || 'N/A'}
                                {isHighlighted && (
                                  <Icon name="Crown" size={12} className="inline ml-1 text-yellow-500" />
                                )}
                              </span>
                            </div>
                          )}
                          {category?.type === 'score' && (
                            <div className="flex items-center justify-center">
                              <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                                isHighlighted ? 'bg-green-100 text-green-700' : getScoreColor(value || 0)
                              }`}>
                                {value || 0}/10
                                {isHighlighted && (
                                  <Icon name="Crown" size={12} className="inline ml-1 text-yellow-500" />
                                )}
                              </span>
                            </div>
                          )}
                          {category?.type === 'text' && (
                            <div className="text-sm text-brand-text-secondary">
                              {value || 'Not specified'}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="hidden md:block"></div>
              {selectedProducts?.map((product) => (
                <div key={product?.id} className="space-y-2">
                  <Button
                    variant="default"
                    size="sm"
                    fullWidth
                    iconName="ShoppingCart"
                    iconPosition="left"
                    onClick={() => onAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Heart"
                    iconPosition="left"
                    onClick={() => onAddToWishlist(product?.id, true)}
                  >
                    Wishlist
                  </Button>
                </div>
              ))}
            </div>

            {/* AI Recommendation */}
            <div className="mt-6 p-4 bg-brand-cream rounded-lg border border-brand-gold/20">
              <div className="flex items-start gap-2">
                <Icon name="Sparkles" size={16} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-brand-text-primary mb-1">
                    AI Recommendation
                  </p>
                  <p className="text-sm text-brand-text-secondary">
                    Based on your style profile and preferences, the {selectedProducts?.[0]?.name} offers the best balance of quality, versatility, and value for your wardrobe goals. It scores highest in sustainability and versatility, making it a smart long-term investment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;