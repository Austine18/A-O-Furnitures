import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, selectedColorIndex: number) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  // Format price safely for KSh
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('KES', 'KSh');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="wishlist-drawer">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Panel container */}
      <div className="relative w-full max-w-md bg-cream shadow-2xl h-full flex flex-col z-10 border-l border-walnut/15 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-walnut/10 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 text-walnut">
            <Heart className="w-5 h-5 fill-current text-gold-dark" />
            <h2 className="font-serif text-2xl font-bold">Your Wishlist</h2>
            <span className="font-sans text-xs bg-walnut/5 text-walnut px-2.5 py-0.5 rounded-full font-medium">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-black/5 rounded-full text-charcoal/65 hover:text-walnut transition-colors focus:outline-hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-walnut/5 flex items-center justify-center text-charcoal/40 mb-2">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-medium text-walnut">Your wishlist is empty</h3>
              <p className="font-sans text-xs text-charcoal/50 max-w-xs leading-relaxed">
                Add beautiful items that inspire you. Revisit them and refine your home design choices anytime.
              </p>
              <button
                onClick={onClose}
                className="mt-2 font-sans text-xs uppercase tracking-wider font-bold bg-walnut hover:bg-gold text-cream hover:text-walnut py-2.5 px-6 rounded-md transition-all cursor-pointer"
              >
                Browse Our Collection
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div 
                key={product.id}
                className="flex gap-4 p-4 bg-white border border-walnut/5 rounded-lg hover:shadow-md transition-shadow relative group"
              >
                {/* Thumbnail Image */}
                <div className="w-20 h-20 rounded-md overflow-hidden bg-walnut/5 shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details layout */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-walnut truncate group-hover:text-gold transition-colors">
                      {product.name}
                    </h4>
                    <span className="font-sans text-[10px] text-gold-dark tracking-wider uppercase">
                      {product.category.replace('-', ' ')}
                    </span>
                    <p className="font-sans text-xs font-bold text-walnut mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-2">
                    {product.inStock ? (
                      <button
                        onClick={() => {
                          onAddToCart(product, 0);
                          onRemoveFromWishlist(product);
                        }}
                        className="flex-1 bg-gold hover:bg-gold-dark text-walnut font-sans text-[11px] font-semibold py-1.5 px-3 rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add To Cart</span>
                      </button>
                    ) : (
                      <span className="flex-1 text-[10px] text-center font-bold text-charcoal/40 tracking-wider bg-black/5 py-1.5 rounded-md uppercase">
                        Sold Out
                      </span>
                    )}

                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-md transition-colors cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info banner */}
        {wishlist.length > 0 && (
          <div className="p-6 bg-white border-t border-walnut/10 space-y-3">
            <p className="font-sans text-xs text-charcoal/60 leading-relaxed text-center">
              Create a space that celebrates you. Add these to your cart or share them directly with us via WhatsApp for a personalized custom wood layout quote!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
