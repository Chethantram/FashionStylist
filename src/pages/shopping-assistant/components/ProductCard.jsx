import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onAddToWishlist, onViewStyling, onCompare ,viewMode, handleProductClick}) => {


  const [isWishlisted, setIsWishlisted] = useState(product?.favorite || false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


const handleWishlistToggle = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/clothes/wishlist", {
      itemId: product._id,  // product being toggled
    });

    setIsWishlisted(response.data.favorite);
    toast.success(response.data.message);
  } catch (error) {
    console.error("Error updating wishlist:", error);
    toast.error("Failed to add or remove Favorite");
  }
};


  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product?.images?.length - 1 : prev - 1
    );
  };

  const getSustainabilityColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div onClick={()=>handleProductClick(product?.name)} className="bg-card rounded-xl shadow-brand border border-border overflow-hidden group hover:shadow-elevated transition-smooth">
     
     <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product?.imageUrl}
          alt={product?.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-smooth`}
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-smooth"
        >
          <Icon
            name="Heart"
            size={18}
            className={
              isWishlisted ? "text-red-500 fill-current" : "text-gray-600"
            }
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Brand and Name */}
        <div className="mb-2">
          <p className="text-sm text-brand-text-secondary font-medium">
            {product?.brand}
          </p>
          <h3 className="text-base font-semibold text-brand-text-primary line-clamp-2">
            {product?.name}
          </h3>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-brand-gold">
            ${product?.price}
          </span>
        </div>

        {/* Category / Occasion */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-muted text-xs bg-blue-100 border-brand-gold text-brand-gold font-semibold border rounded-full capitalize">
              {product?.category}
            </span>
            <span className="px-2 py-1 bg-muted text-xs bg-blue-100 border-brand-gold text-brand-gold font-semibold border rounded-full capitalize">
              {product?.occasion || "None"}
            </span>
          </div>
        </div>
        <a
                  target="_blank"
                  href={product?.link || "https://www.amazon.in/"}
                  className="flex items-center text-sm font-medium hover:text-brand-gold gap-1"
                >
                  Link <ChevronRight className="size-4" />
                </a>
      </div>
    </div>
  );
};

export default ProductCard;


