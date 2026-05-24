import { MessageCircle, Facebook, Instagram, Phone, MapPin, Mail, Clock, ArrowUp } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  selectedProductToInquire?: string;
}

export default function Footer({ setCurrentPage, selectedProductToInquire }: FooterProps) {
  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    const text = selectedProductToInquire 
      ? `Hi A&O Furnitures! I would like to inquire about the luxury item: ${selectedProductToInquire}. Is it in stock at your showroom?`
      : "Hi A&O Furnitures! I'd like to inquire about your handcrafted collections and custom sizes.";
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/254700000000?text=${encodedText}`, '_blank');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-walnut text-cream/90 pt-16 pb-8 border-t border-gold/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-6">
          <div className="text-left">
            <h3 className="font-serif text-3xl font-bold tracking-tight text-white leading-none">
              A & O
            </h3>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold font-semibold leading-none mt-1 block">
              Furnitures
            </span>
          </div>
          <p className="font-sans text-sm text-cream/70 leading-relaxed font-light">
            Crafting premium modern-African luxury furnishings. Every piece blends sustainable timber, expert Nairobi carpentry, and timeless mid-century profiles designed to serve you for a lifetime.
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-cream/60 hover:text-gold transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-cream/60 hover:text-gold transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-serif text-lg font-semibold text-white mb-6 tracking-wide border-b border-white/5 pb-2">
            Quick Navigation
          </h4>
          <ul className="space-y-3 font-sans text-sm font-light">
            <li>
              <button onClick={() => handleNavClick('home')} className="hover:text-gold transition-colors cursor-pointer text-left w-full focus:outline-hidden">
                Homepage Room Tour
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('shop')} className="hover:text-gold transition-colors cursor-pointer text-left w-full focus:outline-hidden">
                Browse Entire Collection
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('about')} className="hover:text-gold transition-colors cursor-pointer text-left w-full focus:outline-hidden">
                Our Nairobi Artisan Story
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('contact')} className="hover:text-gold transition-colors cursor-pointer text-left w-full focus:outline-hidden">
                Book a Showroom Visit
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h4 className="font-serif text-lg font-semibold text-white mb-6 tracking-wide border-b border-white/5 pb-2">
            Signature Ranges
          </h4>
          <ul className="space-y-3 font-sans text-sm font-light">
            <li>
              <button 
                onClick={() => {
                  window.location.hash = '#living-room';
                  handleNavClick('shop');
                }} 
                className="hover:text-gold transition-colors cursor-pointer text-left w-full focus:outline-hidden"
              >
                Living Room Living
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  window.location.hash = '#bedroom';
                  handleNavClick('shop');
                }} 
                className="hover:text-gold transition-colors cursor-pointer text-left w-full focus:outline-hidden"
              >
                Luxurious Bedrooms
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  window.location.hash = '#dining-room';
                  handleNavClick('shop');
                }} 
                className="hover:text-gold transition-colors cursor-pointer text-left w-full focus:outline-hidden"
              >
                Timeless Dining Tables
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  window.location.hash = '#office';
                  handleNavClick('shop');
                }} 
                className="hover:text-gold transition-colors cursor-pointer text-left w-full focus:outline-hidden"
              >
                Workplace & Office Desks
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="space-y-4 font-sans text-sm font-light">
          <h4 className="font-serif text-lg font-semibold text-white mb-6 tracking-wide border-b border-white/5 pb-2">
            The Showroom
          </h4>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <span>Mwanzi Road, Opp. Westgate Mall, Westlands, Nairobi, Kenya</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-gold shrink-0" />
            <span>+254 700 000 000</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-gold shrink-0" />
            <span>hello@aofurnitures.co.ke</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-4 h-4 text-gold shrink-0" />
            <span>Mon–Sat: 8am–7pm | Sun: 10am–5pm</span>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-cream/50 text-center sm:text-left">
          © 2026 A & O Furnitures. Hand-sanded with premium love in Nairobi, Kenya. All rights reserved.
        </p>
        <button 
          onClick={handleScrollToTop}
          className="bg-cream/10 hover:bg-gold hover:text-walnut p-2.5 rounded-full transition-all text-cream/80 cursor-pointer focus:outline-hidden"
          title="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* WhatsApp Floating Sticky Action Button button with pulse ring animation */}
      <div className="fixed bottom-6 right-6 z-50 group flex items-center justify-end">
        <span className="mr-3 bg-walnut text-cream text-[11px] font-sans px-3 py-1.5 rounded-md shadow-lg border border-gold/15 transition-all duration-300 opacity-0 scale-95 origin-right group-hover:opacity-100 group-hover:scale-100 pointer-events-none uppercase tracking-wider">
          Chat with us!
        </span>
        <button
          id="whatsapp-trigger"
          onClick={handleWhatsAppClick}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer focus:outline-hidden transition-all duration-300 transform hover:scale-110 active:scale-95 pulsater relative mr-1"
          aria-label="WhatsApp enquiry link"
        >
          <MessageCircle className="w-7 h-7 fill-white stroke-[#25D366]" />
        </button>
      </div>
    </footer>
  );
}
