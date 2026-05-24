import React, { useState, useEffect, useRef } from 'react';
import { Star, ShoppingCart, MessageCircle, ChevronRight, Share2, Shield, Truck, Trees, Check, Sparkles, Send } from 'lucide-react';
import { Product, Page } from '../../types';
import ProductCard from '../ProductCard';

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  onAddToCart: (product: Product, selectedColorIndex: number, selectedSize: 'Standard' | 'Compact' | 'Grand', quantity: number) => void;
  onSelectProduct: (productId: string) => void;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onShowToast: (msg: string) => void;
}

export default function ProductDetail({
  product,
  allProducts,
  onAddToCart,
  onSelectProduct,
  onNavigateHome,
  onNavigateShop,
  wishlist,
  onToggleWishlist,
  onShowToast
}: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<'Standard' | 'Compact' | 'Grand'>('Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'delivery' | 'reviews'>('desc');
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);
  
  // Custom Reviews List State
  const [reviewsList, setReviewsList] = useState([
    { author: 'Jane Wanjiku', rating: 5, date: 'May 12, 2026', title: 'Flawless Carpentry', text: 'This item fits our Westlands apartment with absolute elegance. The velvet is durable against pets and the solid mahogany structural frame feels unshakeable. Exceptional setup crew!' },
    { author: 'Omondi Onyango', rating: 5, date: 'April 28, 2026', title: 'Worth Every Single Cent', text: 'Truly high-class woodwork. Beautiful grain density that highlights authentic craftsmanship. Very pleased with Owen’s rapid WhatsApp recommendations!' },
    { author: 'Amina Abdi', rating: 4, date: 'April 15, 2026', title: 'Comfort and Sophistication', text: 'Stunning contours. Very comfortable depth profile. Upholstery looks premium under different lighting. Delivery delayed by 1 day due to rains but fully compensated in assembly support.' }
  ]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const mainSectionRef = useRef<HTMLDivElement>(null);

  // Synchronize dynamic active image when product opens
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedColorIndex(0);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [product]);

  // Scroll listener for sticky Add-To-Cart bar
  useEffect(() => {
    const handleScroll = () => {
      if (mainSectionRef.current) {
        const bottomOfMain = mainSectionRef.current.offsetTop + mainSectionRef.current.offsetHeight;
        if (window.scrollY > bottomOfMain) {
          setShowStickyBar(true);
        } else {
          setShowStickyBar(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format price helper
  const formatPriceValue = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount).replace('KES', 'KSh');
  };

  // Adjust Quantity
  const handleQtyChange = (val: number) => {
    const next = quantity + val;
    if (next >= 1) setQuantity(next);
  };

  // Submit Review Form
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewText.trim()) {
      const freshReview = {
        author: newReviewAuthor,
        rating: newReviewRating,
        date: 'Today',
        title: 'Verified Customer Review',
        text: newReviewText
      };
      setReviewsList([freshReview, ...reviewsList]);
      setNewReviewAuthor('');
      setNewReviewText('');
      onShowToast('✓ Thank you! Your verified purchase review is now live.');
    }
  };

  // Trigger WhatsApp Inquiry Link
  const triggerInquiryWhatsApp = () => {
    const text = `Hi A&O Furnitures! I am inquiring about the product: "${product.name}" in "${product.colors[selectedColorIndex].name}" finish, "${selectedSize}" size. What is the delivery timeframe? Link: https://aofurnitures.co.ke/product/${product.id}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/254700000000?text=${encoded}`, '_blank');
  };

  // Share product link helper
  const shareProductLink = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('✓ Product link copied to clipboard!');
    }
  };

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.badge === 'Bestseller'))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* breadcrumb row */}
      <nav className="font-sans text-xs text-charcoal/50 mb-8 flex items-center space-x-1.5 uppercase tracking-wider text-left">
        <span onClick={onNavigateHome} className="hover:text-gold cursor-pointer">Home</span>
        <ChevronRight className="w-3.5 h-3.5 text-charcoal/30 shrink-0" />
        <span onClick={onNavigateShop} className="hover:text-gold cursor-pointer">Browse Shop</span>
        <ChevronRight className="w-3.5 h-3.5 text-charcoal/30 shrink-0" />
        <span className="hover:text-gold cursor-pointer capitalize" onClick={onNavigateShop}>{product.category.replace('-', ' ')}</span>
        <ChevronRight className="w-3.5 h-3.5 text-charcoal/30 shrink-0" />
        <span className="text-charcoal/85 font-medium truncate">{product.name}</span>
      </nav>

      {/* TWO COLUMN DETAIL OVERVIEW STAGE */}
      <div 
        ref={mainSectionRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left mb-16"
      >
        
        {/* LEFT GALLERY BLOCK */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Active Image Box with zoom preview structure */}
          <div className="aspect-square w-full bg-walnut/5 rounded-lg overflow-hidden border border-walnut/10 relative group shadow-xs">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform hover:scale-115 duration-500 ease-out cursor-zoom-in"
            />
            
            {product.stockCount <= 3 && (
              <span className="absolute top-4 left-4 bg-red-600 text-cream text-[10px] font-sans font-bold py-1.5 px-3 uppercase tracking-wider rounded shadow-xs">
                Low Stock: Only {product.stockCount} Left!
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-4 gap-3">
            {product.gallery.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(imgUrl)}
                className={`aspect-square w-full rounded border overflow-hidden cursor-pointer bg-walnut/5 hover:border-gold transition-colors duration-200 ${
                  activeImage === imgUrl ? 'border-2 border-gold ring-1 ring-gold/20' : 'border-walnut/10 hover:shadow-md'
                }`}
              >
                <img 
                  src={imgUrl} 
                  alt={`${product.name} alternate view ${i + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT DETAILS PANEL CONTAINER */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Header Row */}
          <div className="space-y-3">
            {product.badge && (
              <span className="inline-block bg-walnut text-gold uppercase font-sans font-bold text-[9px] py-1 px-2.5 rounded-none tracking-widest shadow-xs">
                {product.badge} Catalog Choice
              </span>
            )}
            <h1 className="font-serif text-3xl sm:text-4xl xl:text-5xl font-bold text-walnut leading-tight">
              {product.name}
            </h1>

            {/* Star feedback row */}
            <div className="flex items-center space-x-2">
              <div className="flex text-gold space-x-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>
              <span className="font-sans text-xs text-charcoal/50 font-bold underline cursor-pointer">
                ({reviewsList.length + 21} customer reviews)
              </span>
            </div>

            {/* Interactive Pricing Structure */}
            <div className="flex items-center space-x-3 pt-1 border-b border-walnut/10 pb-4">
              <span className="font-sans text-2xl sm:text-3xl font-bold text-walnut">
                {formatPriceValue(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="font-sans text-base text-charcoal/40 line-through">
                  {formatPriceValue(product.originalPrice)}
                </span>
              )}
              <span className="font-sans text-[10px] uppercase font-bold text-emerald-600 tracking-wider bg-emerald-50 px-2.5 py-1 rounded-none border border-emerald-15">
                VAT Inclusive Check
              </span>
            </div>
          </div>

          {/* Core short description copy */}
          <p className="font-sans text-sm text-charcoal/70 leading-relaxed font-light">
            {product.description}
          </p>

          {/* CUSTOM OPTIONS SELECTORS */}
          <div className="space-y-4 pt-2">
            
            {/* Color Swatch Panel */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline text-xs text-charcoal/70">
                <span className="font-sans font-bold uppercase tracking-wider">Premium Timber Wax Finish</span>
                <span className="font-sans text-gold-dark font-semibold">{product.colors[selectedColorIndex].name}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((col, idx) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-8 h-8 rounded-full border-2 focus:outline-hidden cursor-pointer flex items-center justify-center transition-all ${
                      selectedColorIndex === idx ? 'border-walnut scale-110 shadow-md ring-2 ring-gold/10' : 'border-transparent hover:border-walnut/30'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  >
                    {selectedColorIndex === idx && (
                      <span className="w-1.5 h-1.5 bg-white rounded-full mix-blend-difference" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size choice buttons */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-baseline text-xs text-charcoal/70">
                <span className="font-sans font-bold uppercase tracking-wider">Molded Dimension Spec</span>
                <span className="font-sans text-gold-dark font-semibold">
                  {selectedSize === 'Standard' ? 'Standard 100%' : selectedSize === 'Compact' ? 'Compact 85%' : 'Grand 120%'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Standard', 'Compact', 'Grand'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border text-[11px] font-sans py-2 rounded-none font-semibold cursor-pointer uppercase tracking-wider transition-all focus:outline-hidden text-center block ${
                      selectedSize === size 
                        ? 'border-walnut bg-walnut text-cream shadow-xs' 
                        : 'border-walnut/20 hover:border-gold text-charcoal'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ADD CART / QUANTITY TRIGGER ACTIONS */}
          <div className="pt-4 space-y-4">
            
            <div className="flex gap-4">
              
              {/* Quantity Select Slider */}
              <div className="border border-walnut/20 rounded-none flex items-center justify-between px-3 w-28 shrink-0 py-2 bg-white">
                <button 
                  onClick={() => handleQtyChange(-1)} 
                  className="p-1 hover:text-gold cursor-pointer font-bold focus:outline-hidden block"
                >
                  <span className="text-sm font-sans">-</span>
                </button>
                <span className="font-sans text-sm font-bold text-walnut px-1">{quantity}</span>
                <button 
                  onClick={() => handleQtyChange(1)} 
                  className="p-1 hover:text-gold cursor-pointer font-bold focus:outline-hidden block"
                >
                  <span className="text-sm font-sans">+</span>
                </button>
              </div>

              {/* Add to Cart full-width button */}
              {product.inStock ? (
                <button
                  onClick={() => {
                    onAddToCart(product, selectedColorIndex, selectedSize, quantity);
                    onShowToast(`✓ Added ${quantity} × ${product.name} to your Shopping Cart!`);
                  }}
                  className="flex-1 bg-gold hover:bg-gold-dark active:scale-95 text-walnut hover:text-white font-sans font-bold py-3 px-6 rounded-none transition-all duration-300 uppercase text-xs tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-xl border border-gold focus:outline-hidden"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add To Shopping Cart</span>
                </button>
              ) : (
                <span className="flex-1 bg-black/10 text-charcoal/40 text-xs font-bold text-center py-3.5 rounded-none uppercase tracking-wider">
                  Out of Stock Space
                </span>
              )}
            </div>

            {/* Custom Interactive Inquire WhatsApp button */}
            <button
              onClick={triggerInquiryWhatsApp}
              className="w-full border-2 border-[#25D366] text-walnut hover:text-emerald-700 hover:bg-[#25D366]/5 font-sans font-bold py-3.5 rounded-none transition-all duration-300 uppercase text-xs tracking-widest flex items-center justify-center gap-2 cursor-pointer focus:outline-hidden mt-2"
            >
              <MessageCircle className="w-4.5 h-4.5 text-[#25D366] fill-[#25D366]" />
              <span>Inquire / Request custom layout size</span>
            </button>

          </div>

          {/* ASSET ACCESS REASSURANCES ROW */}
          <div className="grid grid-cols-3 gap-2 border-y border-walnut/10 py-5 text-center font-sans">
            <div className="space-y-2">
              <Truck className="w-5 h-5 text-gold-dark mx-auto" />
              <p className="font-semibold text-[10px] text-walnut uppercase tracking-wider">Nairobi Free Setup</p>
            </div>
            <div className="space-y-2 border-x border-walnut/10">
              <Shield className="w-5 h-5 text-gold-dark mx-auto" />
              <p className="font-semibold text-[10px] text-walnut uppercase tracking-wider">2-Year Structural Warranty</p>
            </div>
            <div className="space-y-2">
              <Trees className="w-5 h-5 text-gold-dark mx-auto" />
              <p className="font-semibold text-[10px] text-walnut uppercase tracking-wider">Certified Organic Timber</p>
            </div>
          </div>

          {/* SOCIAL SHARES & WISHLIST */}
          <div className="flex items-center justify-between border-b border-walnut/10 pb-4">
            <button
              onClick={() => onToggleWishlist(product)}
              className="flex items-center space-x-2 text-xs font-sans font-bold text-walnut hover:text-gold cursor-pointer focus:outline-hidden"
            >
              <span className={`text-base ${wishlist.some(p => p.id === product.id) ? 'text-red-500' : 'text-charcoal/40'}`}>♥</span>
              <span>{wishlist.some(p => p.id === product.id) ? 'In Wishlist ✓' : 'Add to Wishlist Favorites'}</span>
            </button>

            <button
              onClick={shareProductLink}
              className="flex items-center space-x-1.5 text-xs font-sans text-charcoal/50 hover:text-walnut cursor-pointer focus:outline-hidden"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Link</span>
            </button>
          </div>

        </div>

      </div>

      {/* DYNAMIC SPECIFICATIONS TABS SYSTEM */}
      <section className="border-t border-walnut/10 pt-12 text-left mb-16">
        
        {/* Links Navigation */}
        <div className="flex border-b border-walnut/10 gap-8 justify-center sm:justify-start overflow-x-auto pb-px">
          {[
            { tag: 'desc', label: 'Artisan Description' },
            { tag: 'specs', label: 'Specifications & Lumber' },
            { tag: 'delivery', label: 'Delivery & Assembly' },
            { tag: 'reviews', label: `Customer Reviews (${reviewsList.length})` }
          ].map(tb => (
            <button
              key={tb.tag}
              onClick={() => setActiveTab(tb.tag as any)}
              className={`font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider pb-4 transition-all focus:outline-hidden cursor-pointer whitespace-nowrap relative
                ${activeTab === tb.tag ? 'text-walnut font-bold' : 'text-charcoal/50 hover:text-walnut'}`}
            >
              {tb.label}
              {activeTab === tb.tag && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content bodies */}
        <div className="py-8">
          
          {/* TAB: DESCRIPTION */}
          {activeTab === 'desc' && (
            <div className="space-y-4 max-w-3xl font-sans text-sm text-charcoal/70 leading-relaxed font-light">
              <p>
                Every angle of the <span className="font-semibold text-walnut">{product.name}</span> is sculpted to balance structural airiness with solid wood endurance. Each joint undergoes high-precision hand beveling and local wood peg locks, keeping standard steel hardware screws concealed to support vintage carpentry dynamics.
              </p>
              <ul className="list-disc pl-5 pt-2 space-y-1">
                <li>Double kiln-dried premium local lumber moisture-tested to resist warping</li>
                <li>Concealed dowel reinforcement slots and high-density anatomical cushioning</li>
                <li>Upholstery arrays backed with anti-fray backing guarantees</li>
                <li>Responsibly oiled or organic beeswax polished finishes without toxic chemical fumes</li>
              </ul>
            </div>
          )}

          {/* TAB: SPECIFICATIONS TABLE */}
          {activeTab === 'specs' && (
            <div className="max-w-2xl border border-walnut/15 rounded-none overflow-hidden bg-white shadow-xs">
              <table className="w-full text-left font-sans text-xs sm:text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <tr 
                      key={key}
                      className={idx % 2 === 0 ? 'bg-white/40' : 'bg-transparent'}
                    >
                      <td className="px-6 py-4 font-bold text-walnut uppercase tracking-wide border-r border-walnut/5 w-1/3">
                        {key}
                      </td>
                      <td className="px-6 py-4 text-charcoal/70 font-light">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB: DELIVERY POLICY */}
          {activeTab === 'delivery' && (
            <div className="space-y-4 max-w-3xl font-sans text-sm text-charcoal/70 leading-relaxed font-light">
              <div className="flex items-start gap-3 bg-gold/5 border border-gold/20 p-4 rounded-none mb-6">
                <Truck className="w-5 h-5 text-gold-dark mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-serif font-bold text-walnut">Complimentary Full Service Setup & Installation</h4>
                  <p className="text-xs text-charcoal/60 mt-1">Our professional delivery crew won’t just drop off boxes. We bring the furniture straight to your desired space room, inspect it meticulously, sand any quick edges on site, and assemble it absolutely free of charge.</p>
                </div>
              </div>
              <p>
                Standard Nairobi Delivery takes 3 to 5 business days from order placement. Express options are routed within 48 hours for local stocks.
              </p>
              <p>
                Outside of Nairobi (Mombasa, Kisumu, Nakuru, Eldoret), we ship via specialized private transit. Your item sits cushioned flat and wrapped under thick heavy-duty moving blankets.
              </p>
            </div>
          )}

          {/* TAB: CLIENT REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Reviews List */}
              <div className="lg:col-span-8 space-y-6">
                {reviewsList.map((rev, i) => (
                  <div key={i} className="bg-white border border-walnut/15 p-5 rounded-none">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-serif font-bold text-walnut text-sm sm:text-base">{rev.title}</h4>
                        <div className="flex items-center text-xs text-gold gap-1 mt-0.5">
                          {Array.from({ length: rev.rating }).map((_, rIdx) => <span key={rIdx}>★</span>)}
                        </div>
                      </div>
                      <span className="font-sans text-[10px] text-charcoal/40 uppercase tracking-widest">{rev.date}</span>
                    </div>
                    <p className="font-sans text-xs text-charcoal/70 leading-relaxed font-light mt-3">
                      {rev.text}
                    </p>
                    <span className="font-sans text-[10px] text-gold-dark font-semibold mt-2 block">— By {rev.author} (Verified purchase)</span>
                  </div>
                ))}
              </div>

              {/* Right Column: Write a Review Form */}
              <div className="lg:col-span-4 bg-white border border-walnut/10 p-6 rounded-none self-start">
                <h4 className="font-serif text-lg font-bold text-walnut mb-4">Share Your Feedback</h4>
                
                <form onSubmit={handleReviewSubmit} className="space-y-4 font-sans max-w-sm">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-charcoal/50 mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., Fatuma Mwangi"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full bg-cream/50 border border-walnut/15 rounded text-xs px-3 py-2 text-charcoal focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-charcoal/50 mb-1">Rating Stars</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full bg-cream/50 border border-walnut/15 rounded text-xs px-3 py-2 text-charcoal focus:outline-hidden"
                    >
                      <option value="5">★★★★★ Exceptional (5/5)</option>
                      <option value="4">★★★★☆ Solid Wood (4/5)</option>
                      <option value="3">★★★☆☆ Average (3/5)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-charcoal/50 mb-1">Feedback message</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Tell us about the wood quality and courier setup comfort..."
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      className="w-full bg-cream/50 border border-walnut/15 rounded text-xs px-3 py-2 text-charcoal focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-walnut hover:bg-gold hover:text-walnut text-cream font-sans font-bold py-2 px-4 rounded text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Publish Verified Review
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>

      </section>

      {/* RELATED PRODUCTS ("You May Also Like") */}
      <section className="border-t border-walnut/10 pt-16 text-center">
        <span className="font-sans text-xs uppercase text-gold-dark font-bold tracking-[0.25em]">Design Harmony</span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-walnut mt-1 mb-10">You May Also Like...</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={(prod, colIdx) => onAddToCart(prod, colIdx, 'Standard', 1)}
              onNavigateToDetail={onSelectProduct}
              isWishlisted={wishlist.some(item => item.id === p.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* STICKY BOTTOM ADD-TO-CART BAR */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-walnut/15 py-3.5 px-4 z-40 shadow-[0_-10px_30px_rgba(59,31,14,0.08)] animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3 text-left">
              <img 
                src={product.image} 
                className="w-10 h-10 object-cover rounded hidden sm:block border border-walnut/10" 
                alt=""
              />
              <div>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-walnut truncate max-w-xs sm:max-w-md">{product.name}</h4>
                <p className="font-sans text-xs font-bold text-gold-dark leading-none pt-0.5">{formatPriceValue(product.price)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={triggerInquiryWhatsApp}
                className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 p-2 sm:px-3 sm:py-2 rounded font-sans font-semibold text-[10px] uppercase flex items-center gap-1.5 cursor-pointer focus:outline-hidden"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                <span className="hidden md:inline">Ask Carpentry</span>
              </button>

              {product.inStock ? (
                <button
                  onClick={() => {
                    onAddToCart(product, selectedColorIndex, selectedSize, 1);
                    onShowToast(`✓ Added ${product.name} to Cart!`);
                  }}
                  className="bg-gold hover:bg-gold-dark text-walnut hover:text-white font-sans font-bold py-2 px-4 rounded text-[10px] uppercase tracking-wider flex items-center gap-1.5 focus:outline-hidden cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add To Cart</span>
                </button>
              ) : (
                <span className="text-[10px] font-bold text-charcoal/40 bg-black/5 py-2 px-3 rounded uppercase">Sold Out</span>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
