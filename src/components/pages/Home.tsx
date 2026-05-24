import { ArrowRight, Truck, ShieldAlert, BadgeInfo, MessageSquareText, Instagram, MessageCircle, Heart } from 'lucide-react';
import { Product, Page } from '../../types';
import { TESTIMONIALS, INSTAGRAM_PHOTOS } from '../../data';
import ProductCard from '../ProductCard';

interface HomeProps {
  products: Product[];
  onNavigate: (page: Page) => void;
  onAddToCart: (product: Product, selectedColorIndex: number) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (productId: string) => void;
}

export default function Home({
  products,
  onNavigate,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onSelectProduct
}: HomeProps) {
  const bestsellers = products.filter(p => p.badge === 'Bestseller' || p.stockCount <= 3).slice(0, 4);

  const categories = [
    { name: 'Living Room', code: 'living-room', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', count: '5 products' },
    { name: 'Bedroom Cozy', code: 'bedroom', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80', count: '3 products' },
    { name: 'Dining Room Classic', code: 'dining-room', img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&q=80', count: '2 products' },
    { name: 'Professional Office', code: 'office', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80', count: '2 products' }
  ];

  const handleCategoryClick = (categoryCode: string) => {
    window.location.hash = `#${categoryCode}`;
    onNavigate('shop');
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/254700000000?text=Hi%20A%26O%20Furnitures!%20I%20saw%20your%20room%20tour%20page%20and%20I%27d%20love%20to%20request%20a%20showroom%20booking%20and%20catalogue%20quote.', '_blank');
  };

  return (
    <div className="w-full">
      
      {/* SECTION 1 — HERO SECTION */}
      <section className="relative w-full min-h-[calc(100vh-140px)] bg-cream flex flex-col lg:flex-row items-center justify-between border-b border-walnut/10 overflow-hidden">
        
        {/* Left Editorial Grid */}
        <div className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-12 lg:py-20 flex flex-col justify-center space-y-6 text-left max-w-2xl lg:max-w-none">
          <div className="w-12 h-1 bg-gold"></div>
          <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.3em] text-gold-dark uppercase leading-none block">
            A & O Handcrafted Living
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl text-walnut leading-[1.1] tracking-tight">
            Where Every <br />
            <span className="italic font-light">Room Tells</span> <br />
            a Story.
          </h1>
          <p className="font-sans text-base sm:text-lg text-charcoal/80 leading-relaxed font-light">
            Discover modern-African luxury. We source cured sustainable timber and sculpt elegant, timeless heirloom furniture made to anchor your home for generations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-walnut hover:bg-gold text-cream hover:text-walnut font-sans font-bold py-4 px-8 rounded-none transition-all duration-300 text-sm tracking-widest uppercase shadow-lg select-none flex items-center justify-center gap-2 cursor-pointer focus:outline-hidden"
            >
              <span>Shop the Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border border-walnut hover:bg-walnut hover:text-white font-sans font-bold py-4 px-8 rounded-none transition-all duration-300 text-sm tracking-widest uppercase focus:outline-hidden cursor-pointer text-center"
            >
              Book Showroom Visit
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-6 pt-12 border-t border-walnut/10">
            <div>
              <p className="font-serif text-3xl font-bold text-walnut leading-none">100%</p>
              <p className="font-sans text-[10px] text-charcoal/50 uppercase tracking-widest mt-1">Solid Hardwood</p>
            </div>
            <div className="w-px h-8 bg-walnut/10" />
            <div>
              <p className="font-serif text-3xl font-bold text-walnut leading-none">500+</p>
              <p className="font-sans text-[10px] text-charcoal/50 uppercase tracking-widest mt-1">Happy Spaces</p>
            </div>
          </div>
        </div>

        {/* Right Imagery Grid */}
        <div className="flex-1 w-full h-[350px] sm:h-[450px] lg:h-[calc(100vh-140px)] relative bg-walnut/5">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=90"
            alt="Polished luxury modern living room set"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-cream/20 via-transparent to-transparent pointer-events-none" />
          
          {/* Subtle floating overlay detail */}
          <div className="absolute bottom-8 right-8 bg-white p-6 shadow-2xl max-w-xs border-l-4 border-gold text-left rounded-none z-10">
            <p className="font-serif text-lg italic text-[#3B1F0E]">"The quality is unmatched in Nairobi. Our living room feels completely transformed."</p>
            <p className="font-sans text-xs mt-3 uppercase tracking-widest font-bold text-gold-dark">— Sarah W., Kilimani</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — TRUST BAR */}
      <section className="bg-cream border-b border-walnut/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
              <div className="p-3 bg-walnut/5 text-walnut rounded-full">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-walnut">Free Setup & Delivery</h4>
                <p className="font-sans text-xs text-charcoal/60 mt-0.5">For orders above KSh 30k</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
              <div className="p-3 bg-walnut/5 text-walnut rounded-full">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-walnut">2-Year Construction Warranty</h4>
                <p className="font-sans text-xs text-charcoal/60 mt-0.5">Structural timbers, hand-guaranteed</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
              <div className="p-3 bg-walnut/5 text-walnut rounded-full">
                <BadgeInfo className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-walnut">100% Solid Wood</h4>
                <p className="font-sans text-xs text-charcoal/60 mt-0.5">Sustainable Mahogany, Oak, Teak</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
              <div className="p-3 bg-walnut/5 text-walnut rounded-full">
                <MessageSquareText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-walnut">Nairobi Studio Support</h4>
                <p className="font-sans text-xs text-charcoal/60 mt-0.5">Direct chat with design carpenters</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FEATURED CATEGORIES ("Shop by Room") */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="font-sans text-xs uppercase text-gold-dark font-bold tracking-[0.25em]">Our Signature Range</span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-walnut mt-2 mb-3">Shop by Room</h2>
        <p className="font-sans text-sm text-charcoal/60 max-w-lg mx-auto mb-12">
          Every space demands specialized core ergonomics. Align your lifestyle with tailor-molded comfort arrays.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.code}
              onClick={() => handleCategoryClick(cat.code)}
              className="group aspect-4/5 relative overflow-hidden rounded-none border border-walnut/15 cursor-pointer shadow-xs hover:shadow-2xl transition-all duration-500 bg-[#E8E1D9]"
            >
              <img
                src={cat.img}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/5 transition-opacity" />
              
              <div className="absolute inset-x-0 bottom-6 px-6 text-left flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-gold transition-colors">
                    {cat.name.split(' ')[0]} <span className="font-normal block text-xs font-sans tracking-wide text-cream/70 mt-0.5">{cat.count}</span>
                  </h3>
                </div>
                <span className="font-sans text-[11px] font-semibold text-gold tracking-wider uppercase group-hover:translate-x-1.5 transition-transform">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — BESTSELLERS */}
      <section className="bg-white/50 border-y border-walnut/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-sans text-xs uppercase text-gold-dark font-bold tracking-[0.25em]">Highly Coveted</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-walnut mt-2 mb-3">Nairobi Bestsellers</h2>
          <p className="font-sans text-sm text-charcoal/60 max-w-lg mx-auto mb-12">
            Beloved and refined. Readily upholstered to match standard high-contrast interior schemes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onNavigateToDetail={onSelectProduct}
                isWishlisted={wishlist.some(p => p.id === product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="mt-12 bg-walnut hover:bg-gold text-cream hover:text-walnut font-sans font-bold py-3.5 px-10 rounded-none transition-all uppercase text-xs tracking-widest cursor-pointer focus:outline-hidden inline-block border border-walnut hover:border-gold"
          >
            View All Handcrafted Products
          </button>
        </div>
      </section>

      {/* SECTION 5 — BRAND STORY STRIP */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Photos split */}
          <div className="relative aspect-video lg:aspect-square bg-walnut/5 rounded-none overflow-hidden border border-walnut/15 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1000&q=80"
              alt="Artisan wood carving and sanding workshop"
              className="w-full h-full object-cover"
            />
            {/* Overlay background for warm style matching */}
            <div className="absolute inset-0 bg-walnut/5 block pointer-events-none" />
          </div>

          {/* Copy structure */}
          <div className="space-y-6 text-left">
            <span className="font-sans text-xs uppercase text-gold-dark font-bold tracking-[0.25em] block">
              Honest Sustainable Carpenters
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-walnut leading-none">
              Built by Hand. <br />
              Designed for Life.
            </h2>
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed font-light">
              At A & O Furnitures, our carpentry heritage dates back to Owen and Amara’s grandfather's workshop in Mombasa. Today, we carry ahead that absolute commitment to patience, texture, and structural honesty directly out of our local Nairobi state-of-the-art facility.
            </p>
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed font-light">
              We never utilize fragile particle boards or mass-manufactured veneer pastes. Each piece is modeled from robust solid Oak, cured East-African Mahogany, and weatherproofing finished Teak, completely guaranteed to handle any active household density gracefully.
            </p>
            
            <button
              onClick={() => onNavigate('about')}
              className="border-b-2 border-gold hover:border-walnut text-walnut hover:text-gold-dark font-sans text-xs tracking-wider uppercase font-bold py-1.5 cursor-pointer focus:outline-hidden transition-colors"
            >
              Read Amara & Owen's Heritage Story
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      <section className="bg-cream border-t border-walnut/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-sans text-xs uppercase text-gold-dark font-bold tracking-[0.25em]">What Our Customers Say</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-walnut mt-2 mb-12">Praise From Active Homes</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((col, index) => (
              <div 
                key={index}
                className="bg-white border border-walnut/15 p-6 sm:p-8 rounded-none shadow-xs flex flex-col justify-between text-left relative"
              >
                <div>
                  {/* Rating stars */}
                  <div className="flex text-gold space-x-1 mb-4">
                    {Array.from({ length: col.rating }).map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>

                  <p className="font-sans text-sm text-charcoal/80 leading-relaxed font-light italic mb-6">
                    "{col.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={col.avatar}
                    alt={col.name}
                    className="w-10 h-10 rounded-full object-cover border border-gold/20"
                  />
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-walnut">{col.name}</h4>
                    <p className="font-sans text-[10px] text-charcoal/40 uppercase tracking-wider">{col.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — INSTAGRAM / GALLERY STRIP */}
      <section className="py-20 border-t border-walnut/10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="font-sans text-xs uppercase text-gold-dark font-bold tracking-[0.25em]">Share Your Spaces</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-walnut mt-2 mb-3">Tag Us @AOFurnitures</h2>
        <p className="font-sans text-sm text-charcoal/60 mb-10 max-w-md mx-auto">
          We adore witnessing how our handcrafted pieces blend with your cozy, custom interior setups.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_PHOTOS.map((url, i) => (
            <div 
              key={i}
              className="group aspect-square relative overflow-hidden rounded-none cursor-pointer border border-walnut/15 grayscale hover:grayscale-0 transition-all duration-500"
            >
              <img
                src={url}
                alt={`Instagram Living Layout ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-walnut/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-cream">
                <Instagram className="w-6 h-6 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8 — CTA BANNER */}
      <section className="bg-walnut text-cream py-16 px-4 md:py-20 border-t border-gold/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Ready to Transform Your Space?
          </h2>
          <p className="font-sans text-sm sm:text-base text-cream/70 max-w-xl mx-auto leading-relaxed font-light">
            Consult our expert team for custom wood finishes, layouts, or to book a personal tour around our premium showroom in Westlands, Nairobi.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-gold hover:bg-gold-dark text-walnut hover:text-white font-sans font-bold py-3.5 px-10 rounded-none transition-all text-xs tracking-widest uppercase cursor-pointer focus:outline-hidden w-full sm:w-auto border border-gold"
            >
              Shop Collection
            </button>
            <button
              onClick={openWhatsApp}
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-cream font-sans font-bold py-3.5 px-10 rounded-none transition-all text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer focus:outline-hidden w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>WhatsApp Inquiries</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
