import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedColorIndex: number) => void;
  onNavigateToDetail: (productId: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onNavigateToDetail,
  isWishlisted,
  onToggleWishlist
}: ProductCardProps & { key?: any }) {
  const [isHovered, setIsHovered] = useState(false);

  // Formatting Kenyan Shillings currency safely
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('KES', 'KSh');
  };

  const currentBadge = product.stockCount <= 3 ? 'Only 3 left!' : product.badge;

  return (
    <div
      className="bg-cream border border-walnut/15 rounded-none overflow-hidden transition-all duration-300 shadow-xs hover:shadow-2xl hover:border-gold flex flex-col h-full group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`product-card-${product.id}`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square overflow-hidden bg-walnut/5">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Dynamic Badges */}
        {currentBadge && (
          <span 
            className={`absolute top-4 left-4 font-sans text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-none uppercase shadow-xs z-10
              ${currentBadge === 'Only 3 left!' 
                ? 'bg-red-600 text-white' 
                : currentBadge === 'Sale' 
                  ? 'bg-rose-500 text-cream' 
                  : currentBadge === 'New' 
                    ? 'bg-gold text-walnut' 
                    : 'bg-walnut text-cream'
              }`}
          >
            {currentBadge}
          </span>
        )}

        {/* Wishlist Button (Heart) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-4 right-4 p-2 rounded-none backdrop-blur-md transition-all duration-300 z-10 shadow-xs focus:outline-hidden cursor-pointer
            ${isWishlisted 
              ? 'bg-red-50 text-red-500 scale-110' 
              : 'bg-white/70 text-walnut hover:bg-white hover:text-red-500 hover:scale-105'
            }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Action Overlay for desktops */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 px-4 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10">
          <button
            onClick={() => onNavigateToDetail(product.id)}
            className="flex-1 bg-white hover:bg-walnut hover:text-white text-walnut font-sans text-xs font-semibold py-2.5 px-3 rounded-none transition-all duration-200 border border-walnut shadow-md flex items-center justify-center gap-1.5 focus:outline-hidden cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
          
          {product.inStock ? (
            <button
              onClick={() => onAddToCart(product, 0)}
              className="flex-1 bg-gold hover:bg-gold-dark text-walnut hover:text-white font-sans text-xs font-semibold py-2.5 px-3 rounded-none transition-all duration-200 border border-gold hover:border-gold-dark shadow-md flex items-center justify-center gap-1.5 focus:outline-hidden cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add Cart</span>
            </button>
          ) : (
            <span className="flex-1 bg-black/40 text-cream text-[10px] uppercase font-bold text-center py-2.5 rounded-none flex items-center justify-center">
              Sold Out
            </span>
          )}
        </div>
      </div>

      {/* Product Information Body */}
      <div 
        onClick={() => onNavigateToDetail(product.id)}
        className="p-4 sm:p-5 flex flex-col flex-1 cursor-pointer"
      >
        <span className="font-sans text-[10px] text-gold-dark font-semibold tracking-widest uppercase mb-1">
          {product.category.replace('-', ' ')}
        </span>
        <h3 className="font-serif text-base sm:text-lg font-medium text-walnut group-hover:text-gold transition-colors duration-300 leading-snug line-clamp-1">
          {product.name}
        </h3>

        {/* Star Ratings Row */}
        <div className="flex items-center space-x-1 my-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              className={`w-3 h-3 ${idx < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-walnut/20'}`}
            />
          ))}
          <span className="font-sans text-[10px] text-charcoal/50 font-medium ml-1">
            ({product.reviewCount})
          </span>
        </div>

        {/* Pricing Rows */}
        <div className="mt-auto pt-2 flex items-baseline justify-between border-t border-walnut/5">
          <div className="flex items-baseline space-x-2">
            <span className="font-sans text-base sm:text-lg font-bold text-walnut leading-none">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-sans text-xs text-charcoal/40 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="font-sans text-[10px] text-charcoal/40 italic">
            {product.material.split('&')[0]}
          </span>
        </div>

        {/* Mobile quick actions (since no hover is possible on mobile devices) */}
        <div className="mt-4 grid grid-cols-2 gap-2 md:hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigateToDetail(product.id);
            }}
            className="bg-walnut/5 active:bg-walnut/10 text-walnut font-sans text-xs font-semibold py-2 px-1 rounded-none text-center focus:outline-hidden cursor-pointer"
          >
            Details
          </button>
          {product.inStock ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product, 0);
              }}
              className="bg-gold hover:bg-gold-dark text-walnut font-sans text-xs font-semibold py-2 px-1 rounded-none text-center focus:outline-hidden cursor-pointer"
            >
              + Cart
            </button>
          ) : (
            <span className="bg-black/10 text-charcoal/40 text-[10px] font-bold text-center py-2 rounded-none">
              Sold Out
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
