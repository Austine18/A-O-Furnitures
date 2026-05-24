import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowLeft, Percent, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';
import { Product, CartItem, Page } from '../../types';
import ProductCard from '../ProductCard';

interface CartProps {
  cart: CartItem[];
  allProducts: Product[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (page: Page) => void;
  onSelectProduct: (productId: string) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  discountPercentage: number;
  setDiscountPercentage: (pct: number) => void;
  onShowToast: (msg: string) => void;
  onAddToCart: (product: Product, selectedColorIndex: number, selectedSize: 'Standard' | 'Compact' | 'Grand', quantity: number) => void;
}

export default function Cart({
  cart,
  allProducts,
  onUpdateQty,
  onRemoveItem,
  onNavigate,
  onSelectProduct,
  wishlist,
  onToggleWishlist,
  couponCode,
  setCouponCode,
  discountPercentage,
  setDiscountPercentage,
  onShowToast,
  onAddToCart
}: CartProps) {
  const [couponInput, setCouponInput] = useState(couponCode);

  // Format KSh price helper
  const formattingPrice = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount).replace('KES', 'KSh');
  };

  // Totals calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 30000 ? 0 : 500;
  const discountAmount = subtotal * (discountPercentage / 100);
  const total = subtotal + deliveryFee - discountAmount;

  // Coupon application logic block
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = couponInput.trim().toUpperCase();
    if (normalized === 'WELCOME10') {
      setDiscountPercentage(10);
      setCouponCode('WELCOME10');
      onShowToast('✓ WELCOME10 applied! 10% discount on your premium furniture has been saved.');
    } else if (normalized === 'AO20') {
      setDiscountPercentage(20);
      setCouponCode('AO20');
      onShowToast('✓ AO20 applied! Secret 20% discount unlocked successfully.');
    } else if (normalized === 'FREESHIP') {
      setDiscountPercentage(0); // FREE shipping is auto or we handles it
      setCouponCode('FREESHIP');
      onShowToast('✓ FREESHIP applied! Delivery fee waived successfully.');
    } else {
      onShowToast('❌ Invalid coupon code. Try WELCOME10 for 10% off!');
    }
  };

  const recommendedItems = allProducts
    .filter(p => !cart.some(item => item.product.id === p.id))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* BREADCRUMB HEADER */}
      <div className="border-b border-walnut/10 pb-6 mb-8 text-left">
        <nav className="font-sans text-xs text-charcoal/50 mb-2 flex items-center space-x-1.5 uppercase tracking-wider">
          <span onClick={() => onNavigate('home')} className="hover:text-gold cursor-pointer">Home</span>
          <span>/</span>
          <span className="text-charcoal/80 font-medium">Your Shopping Cart</span>
        </nav>
        <h1 className="font-serif text-4xl font-bold text-walnut">Shopping Cart</h1>
      </div>

      {cart.length === 0 ? (
        
        /* EMPTY CART STATE CASE */
        <div className="py-16 text-center space-y-6 max-w-md mx-auto">
          <div className="w-20 h-20 bg-walnut/5 text-charcoal/40 rounded-none flex items-center justify-center mx-auto mb-4 scale-105">
            <ShoppingBag className="w-9 h-9" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-walnut">Your furniture cart is empty</h2>
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
              Add some of our handcrafted masterpieces to build a modern-African space you adore coming home to.
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="inline-block bg-walnut hover:bg-gold text-cream hover:text-walnut font-sans font-bold py-3.5 px-8 rounded-none transition-all uppercase text-xs tracking-widest cursor-pointer mt-4 border border-walnut hover:border-gold"
          >
            Start Shopping Collection
          </button>
        </div>
      ) : (
        
        /* TWO COLUMN GRID CART */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT PANEL: CART LISTING TABLE */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="bg-white border border-walnut/15 rounded-none overflow-hidden">
              
              {/* Table header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 bg-walnut/5 p-4 text-[10px] font-bold uppercase tracking-wider text-walnut border-b border-walnut/10">
                <div className="col-span-6">Furniture details</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Items row loop iteration */}
              <div className="divide-y divide-walnut/10">
                {cart.map((item) => (
                  <div 
                    key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                    className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                  >
                    
                    {/* Item Thumbnail & Description details */}
                    <div className="col-span-12 sm:col-span-6 flex gap-4 min-w-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-none bg-walnut/5 overflow-hidden border border-walnut/15 shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left space-y-1">
                        <h4 
                          onClick={() => onSelectProduct(item.product.id)}
                          className="font-serif text-sm sm:text-base font-semibold text-walnut hover:text-gold cursor-pointer truncate max-w-xs"
                        >
                          {item.product.name}
                        </h4>
                        
                        {/* Variant markers tags */}
                        <div className="flex flex-wrap gap-1.5 font-sans text-[9px] uppercase font-bold tracking-wider text-charcoal/50">
                          <span className="bg-walnut/5 px-1.5 py-0.5 rounded-none border border-walnut/5">
                            Tone: {item.selectedColor.name}
                          </span>
                          <span className="bg-walnut/5 px-1.5 py-0.5 rounded-none border border-walnut/5">
                            Dim: {item.selectedSize}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-4 sm:col-span-2 text-left sm:text-center">
                      <span className="font-sans text-[10px] sm:hidden text-charcoal/40 uppercase font-bold block">Unit Price</span>
                      <span className="font-sans text-xs sm:text-sm text-charcoal/70">
                        {formattingPrice(item.product.price)}
                      </span>
                    </div>

                    {/* Quantity selectors (+ / -) */}
                    <div className="col-span-4 sm:col-span-2 flex justify-start sm:justify-center">
                      <div>
                        <span className="font-sans text-[10px] sm:hidden text-charcoal/40 uppercase font-bold block mb-1">Quantity</span>
                        <div className="border border-walnut/20 rounded-none flex items-center justify-between px-2 w-20 py-1 bg-white">
                          <button 
                            onClick={() => onUpdateQty(item.product.id, -1)} 
                            className="p-0.5 text-charcoal hover:text-gold cursor-pointer"
                          >
                            <span className="text-xs font-sans">-</span>
                          </button>
                          <span className="font-sans text-xs font-bold text-walnut">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQty(item.product.id, 1)} 
                            className="p-0.5 text-charcoal hover:text-gold cursor-pointer"
                          >
                            <span className="text-xs font-sans">+</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Line totals and Delete action block */}
                    <div className="col-span-4 sm:col-span-2 text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                      <span className="font-sans text-[10px] sm:hidden text-charcoal/40 uppercase font-bold text-left block">Subtotal</span>
                      <div className="space-y-1">
                        <p className="font-sans text-xs sm:text-sm font-bold text-walnut">
                          {formattingPrice(item.product.price * item.quantity)}
                        </p>
                        
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-rose-500 hover:text-rose-700 text-[10px] font-sans font-bold flex items-center gap-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* Back action + Promo coupon submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
              
              <button
                onClick={() => onNavigate('shop')}
                className="font-sans text-xs uppercase font-bold tracking-wider text-walnut hover:text-gold flex items-center gap-1.5 focus:outline-hidden cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping Collection</span>
              </button>

              {/* Promo code field */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 w-full sm:w-auto">
                <div className="relative shrink-0 w-44">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-dark"><Percent className="w-3.5 h-3.5" /></span>
                  <input
                    type="text"
                    placeholder="COUPON (e.g. AO20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full bg-white border border-walnut/20 font-sans text-xs rounded-none px-3 py-2.5 pl-8 uppercase text-charcoal focus:outline-hidden text-left"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-walnut hover:bg-gold text-cream hover:text-walnut font-sans text-xs uppercase font-bold py-2.5 px-4 rounded-none transition-colors border border-walnut hover:border-gold cursor-pointer"
                >
                  Apply
                </button>
              </form>

            </div>

          </div>

          {/* RIGHT PANEL: ORDER TOTAL CARD SUMMARY */}
          <div className="lg:col-span-4 text-left">
            <div className="bg-white border border-walnut/15 p-6 rounded-none space-y-6 shadow-xs sticky top-24">
              <h3 className="font-serif text-2xl font-bold text-walnut border-b border-walnut/10 pb-3">Order Summary</h3>

              <div className="space-y-3 font-sans text-xs text-charcoal/70">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-walnut">{formattingPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span>Nairobi Delivery setup</span>
                    {subtotal >= 30000 ? (
                      <span className="block text-[9px] uppercase font-bold text-emerald-600 tracking-wider">Free Shipping applied ★</span>
                    ) : (
                      <span className="block text-[9px] text-charcoal/40 italic">Add {formattingPrice(30000 - subtotal)} for free delivery</span>
                    )}
                  </div>
                  <span className="font-semibold text-walnut">
                    {deliveryFee === 0 ? 'FREE' : formattingPrice(deliveryFee)}
                  </span>
                </div>

                {discountPercentage > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold bg-emerald-50 p-2.5 rounded-none border border-emerald-100 items-baseline">
                    <span className="text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                      <Percent className="w-3 h-3" />
                      <span>{couponCode} Discount</span>
                    </span>
                    <span>-{formattingPrice(discountAmount)} ({discountPercentage}%)</span>
                  </div>
                )}

                <div className="border-t border-walnut/10 pt-4 flex justify-between items-baseline">
                  <span className="font-serif text-lg font-bold text-walnut">Total Cost</span>
                  <span className="font-sans text-xl sm:text-2xl font-bold text-walnut">{formattingPrice(total)}</span>
                </div>
              </div>

              {/* Checkout proceed action CTA */}
              <button
                onClick={() => onNavigate('checkout')}
                className="w-full bg-gold hover:bg-gold-dark text-walnut hover:text-white font-sans font-bold py-3.5 px-4 rounded-none transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-xl border border-gold focus:outline-hidden"
              >
                <span>Proceed to Secure Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Trust badges footer */}
              <div className="space-y-2 pt-2 border-t border-walnut/5 font-sans text-[10px] text-charcoal/50">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>🔒 SSL Secure Multi-payment Encryptions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>Supports M-PESA, Visa, Bank transfers</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* RECOMMENDED PRODUCTS ("You Might Like") */}
      {recommendedItems.length > 0 && (
        <section className="border-t border-walnut/10 pt-16 text-center mt-16">
          <span className="font-sans text-xs uppercase text-gold-dark font-bold tracking-[0.25em]">Add More Luxury</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-walnut mt-1 mb-10">Recommended For Your Space</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedItems.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={(prod, idx) => {
                  onAddToCart(prod, idx, 'Standard', 1);
                }}
                onNavigateToDetail={onSelectProduct}
                isWishlisted={wishlist.some(item => item.id === p.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
