import { useState, useEffect } from 'react';
import { Page, Product, CartItem } from './types';
import { PRODUCTS } from './data';

// Component imports
import Header from './components/Header';
import Footer from './components/Footer';
import ExitIntentPopup from './components/ExitIntentPopup';
import WishlistDrawer from './components/WishlistDrawer';

// Pages imports
import Home from './components/pages/Home';
import Shop from './components/pages/Shop';
import ProductDetail from './components/pages/ProductDetail';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';

import { Sparkles, X, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('oslo-sofa');
  
  // Real Local Storage state integrations
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dynamic Coupons status
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // Custom Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('ao_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem('ao_wishlist');
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

      const storedRecent = localStorage.getItem('ao_recently_viewed');
      if (storedRecent) setRecentlyViewedIds(JSON.parse(storedRecent));

      const storedCoupon = localStorage.getItem('ao_applied_coupon');
      if (storedCoupon) {
        const parsed = JSON.parse(storedCoupon);
        setCouponCode(parsed.code);
        setDiscountPercentage(parsed.percentage);
      }
    } catch (e) {
      console.error('Error parsing localStorage indexes', e);
    }
  }, []);

  // Save states back to local storage
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('ao_cart', JSON.stringify(updatedCart));
  };

  const saveWishlistToStorage = (updatedWishlist: Product[]) => {
    setWishlist(updatedWishlist);
    localStorage.setItem('ao_wishlist', JSON.stringify(updatedWishlist));
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3800);
    return () => clearTimeout(timer);
  };

  // 1. ADD TO CART FUNCTION
  const handleAddToCart = (
    product: Product, 
    colorIndex: number = 0, 
    size: 'Standard' | 'Compact' | 'Grand' = 'Standard',
    quantity: number = 1
  ) => {
    const selectedColor = product.colors[colorIndex] || product.colors[0];
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && 
                item.selectedColor.name === selectedColor.name && 
                item.selectedSize === size
    );

    let nextCart = [...cart];
    if (existingIndex > -1) {
      nextCart[existingIndex].quantity += quantity;
    } else {
      nextCart.push({
        id: `${product.id}-${selectedColor.name}-${size}`,
        product,
        quantity,
        selectedColor,
        selectedSize: size
      });
    }

    saveCartToStorage(nextCart);
  };

  // 2. MODIFY CART QUANTITIES
  const handleUpdateCartQty = (productId: string, delta: number) => {
    let nextCart = cart.map(item => {
      if (item.product.id === productId) {
        const nextQty = item.quantity + delta;
        return { ...item, quantity: nextQty >= 1 ? nextQty : 1 };
      }
      return item;
    });
    saveCartToStorage(nextCart);
  };

  // 3. REMOVE ITEM FROM CART
  const handleRemoveCartItem = (productId: string) => {
    const nextCart = cart.filter(item => item.product.id !== productId);
    saveCartToStorage(nextCart);
    showToast('✓ Removed item from your cart.');
  };

  // 4. CLEAR ENTIRE CART
  const handleClearCart = () => {
    saveCartToStorage([]);
    setCouponCode('');
    setDiscountPercentage(0);
    localStorage.removeItem('ao_applied_coupon');
  };

  // 5. HEART WISHLIST TOGGLE
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    let nextWishlist = [];
    if (exists) {
      nextWishlist = wishlist.filter((item) => item.id !== product.id);
      saveWishlistToStorage(nextWishlist);
      showToast(`Removed "${product.name}" from your wishlist favorites.`);
    } else {
      nextWishlist = [...wishlist, product];
      saveWishlistToStorage(nextWishlist);
      showToast(`✓ Added "${product.name}" to your wishlist favorites.`);
    }
  };

  // 6. SAVE RECENTLY VIEWED
  const handleViewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
    
    // Add unique to array
    const filteredRecent = recentlyViewedIds.filter(id => id !== productId);
    const nextRecentIds = [productId, ...filteredRecent].slice(0, 4);
    
    setRecentlyViewedIds(nextRecentIds);
    localStorage.setItem('ao_recently_viewed', JSON.stringify(nextRecentIds));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // 7. SAVE APPLIED COUPONS
  const handleApplyCouponCode = (code: string) => {
    setCouponCode(code);
    setDiscountPercentage(10);
    localStorage.setItem('ao_applied_coupon', JSON.stringify({ code, percentage: 10 }));
    showToast(`✓ Discount coupon "${code}" applied successfully!`);
  };

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products for dynamic search updates
  const handleSearchTrigger = (query: string) => {
    setSearchQuery(query);
    showToast(`Filtering catalogue for "${query}"`);
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans flex flex-col justify-between selection:bg-gold/25 relative">
      
      {/* Dynamic Toast Alerts Popup (Natively built, custom high-contrast styling) */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-walnut text-cream border border-gold/30 px-6 py-3.5 rounded-lg shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
          <span className="font-sans text-xs sm:text-sm font-medium tracking-wide">
            {toastMessage}
          </span>
          <button 
            onClick={() => setToastMessage(null)} 
            className="text-white/40 hover:text-white shrink-0 ml-2 focus:outline-hidden cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Global Navigation Header props */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartItemCount}
        wishlistCount={wishlist.length}
        onSearch={handleSearchTrigger}
        setWishlistOpen={setWishlistOpen}
      />

      {/* Primary dynamic screen routing portal */}
      <main className="flex-1 w-full relative">
        {currentPage === 'home' && (
          <Home
            products={PRODUCTS}
            onNavigate={setCurrentPage}
            onAddToCart={(prod, idx) => {
              handleAddToCart(prod, idx, 'Standard', 1);
              showToast(`✓ Added ${prod.name} to Cart!`);
            }}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleViewProduct}
          />
        )}

        {currentPage === 'shop' && (
          <Shop
            products={PRODUCTS}
            onAddToCart={(prod, idx) => {
              handleAddToCart(prod, idx, 'Standard', 1);
              showToast(`✓ Added ${prod.name} to Cart!`);
            }}
            onSelectProduct={handleViewProduct}
            currentPage={currentPage}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentPage === 'product' && (
          <ProductDetail
            product={selectedProduct}
            allProducts={PRODUCTS}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleViewProduct}
            onNavigateHome={() => setCurrentPage('home')}
            onNavigateShop={() => setCurrentPage('shop')}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'about' && (
          <About onNavigate={setCurrentPage} />
        )}

        {currentPage === 'contact' && (
          <Contact onShowToast={showToast} />
        )}

        {currentPage === 'cart' && (
          <Cart
            cart={cart}
            allProducts={PRODUCTS}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveCartItem}
            onNavigate={setCurrentPage}
            onSelectProduct={handleViewProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentage={discountPercentage}
            setDiscountPercentage={setDiscountPercentage}
            onShowToast={showToast}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'checkout' && (
          <Checkout
            cart={cart}
            onClearCart={handleClearCart}
            onNavigate={setCurrentPage}
            discountPercentage={discountPercentage}
            couponCode={couponCode}
          />
        )}
      </main>

      {/* Global shared footer */}
      <Footer 
        setCurrentPage={setCurrentPage} 
        selectedProductToInquire={selectedProduct?.name}
      />

      {/* Right-aligned sliding wishlist drawer portal */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(prod, colIdx) => {
          handleAddToCart(prod, colIdx, 'Standard', 1);
          showToast(`✓ Sourced ${prod.name} to Cart from Wishlists.`);
        }}
      />

      {/* Exit Intent popup dialogue monitor */}
      <ExitIntentPopup onClaimDiscount={handleApplyCouponCode} />

    </div>
  );
}
