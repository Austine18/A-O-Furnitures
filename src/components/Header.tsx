import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Heart, Search } from 'lucide-react';
import { Page, Product } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartCount: number;
  wishlistCount: number;
  onSearch: (query: string) => void;
  setWishlistOpen: (open: boolean) => void;
}

export default function Header({
  currentPage,
  setCurrentPage,
  cartCount,
  wishlistCount,
  onSearch,
  setWishlistOpen
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setCurrentPage('shop');
    setSearchOpen(false);
  };

  const menuItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Our Story', page: 'about' },
    { label: 'Showroom & Contact', page: 'contact' }
  ];

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-walnut text-cream text-center py-2 px-4 text-xs font-light tracking-wider flex items-center justify-center gap-2 border-b border-white/10 uppercase">
        <span>Free delivery on orders above KSh 30,000 🚚</span>
        <span className="hidden md:inline text-gold">•</span>
        <span className="hidden md:inline">Visit Showroom for 10% Off Cash Orders ✨</span>
      </div>

      {/* Main Bar */}
      <div className="bg-cream/90 backdrop-blur-md border-b border-walnut/10 sticky top-0 z-40 transition-shadow duration-300 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-start focus:outline-hidden text-left cursor-pointer group"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-walnut leading-none group-hover:text-gold transition-colors duration-300">
              A & O
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-medium text-gold-dark leading-none mt-1">
              Furnitures
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 lg:space-x-12">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`font-sans text-sm tracking-wide transition-all duration-300 cursor-pointer focus:outline-hidden relative pb-1
                  ${currentPage === item.page 
                    ? 'text-walnut font-semibold' 
                    : 'text-charcoal/75 hover:text-walnut hover:font-medium'
                  }`}
              >
                {item.label}
                {currentPage === item.page && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Icon System */}
          <div className="flex items-center space-x-1.5 sm:space-x-4">
            {/* Search Bar Toggle */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-cream border border-walnut/20 rounded-none px-2 py-1 w-48 sm:w-60 shadow-lg z-50">
                  <input
                    type="text"
                    placeholder="Search furniture..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs text-charcoal focus:outline-hidden py-0.5"
                    autoFocus
                  />
                  <button type="submit" className="text-walnut hover:text-gold cursor-pointer mr-1">
                    <Search className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => setSearchOpen(false)} className="text-charcoal/50 hover:text-charcoal cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-walnut hover:text-gold focus:outline-hidden rounded-full hover:bg-walnut/5 transition-colors cursor-pointer"
                  title="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={() => setWishlistOpen(true)}
              className="p-2 text-walnut hover:text-gold focus:outline-hidden rounded-full hover:bg-walnut/5 transition-colors relative cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-gold text-walnut font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-cream shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon */}
            <button
              onClick={() => handleNavClick('cart')}
              className="p-2 text-walnut hover:text-gold focus:outline-hidden rounded-full hover:bg-walnut/5 transition-colors relative cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-walnut text-cream font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-cream shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-walnut hover:text-gold focus:outline-hidden rounded-full hover:bg-walnut/5 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-cream border-b border-walnut/15 px-4 pt-2 pb-6 space-y-3 shadow-lg absolute left-0 w-full z-45">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`block w-full text-left font-sans py-2.5 px-3 rounded-none text-base transition-colors duration-200 cursor-pointer
                  ${currentPage === item.page 
                    ? 'bg-walnut/5 text-walnut font-semibold border-l-4 border-gold' 
                    : 'text-charcoal hover:bg-walnut/3 hover:text-walnut'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
