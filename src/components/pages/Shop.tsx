import { useState, useEffect } from 'react';
import { LayoutGrid, List, SlidersHorizontal, RotateCcw, Star, X } from 'lucide-react';
import { Product, Page } from '../../types';
import ProductCard from '../ProductCard';

interface ShopProps {
  products: Product[];
  onAddToCart: (product: Product, selectedColorIndex: number) => void;
  onSelectProduct: (productId: string) => void;
  currentPage: Page;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export default function Shop({
  products,
  onAddToCart,
  onSelectProduct,
  wishlist,
  onToggleWishlist,
  searchQuery = '',
  setSearchQuery
}: ShopProps) {
  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(250000);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Read hash category on mount or change
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['living-room', 'bedroom', 'dining-room', 'office', 'outdoor'].includes(hash)) {
      setSelectedCategory(hash);
      // Clean standard state
      window.location.hash = '';
    }
  }, [products]);

  // Available Filter Facets
  const materials = ['Oak', 'Teak', 'Mahogany', 'Velvet', 'Rattan', 'Travertine', 'Leather'];
  const colors = [
    { name: 'Forest Green', hex: '#1E3E2F' },
    { name: 'Tan Saddle', hex: '#A05A2C' },
    { name: 'Ivory Cream', hex: '#E6DFD5' },
    { name: 'Charcoal Grey', hex: '#4A4A4A' },
    { name: 'Brown Walnut', hex: '#3B1F0E' }
  ];

  // Handle Checkbox Toggles
  const toggleMaterial = (mat: string) => {
    setSelectedMaterials(prev =>
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const toggleColor = (colName: string) => {
    setSelectedColors(prev =>
      prev.includes(colName) ? prev.filter(c => c !== colName) : [...prev, colName]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setPriceRange(250000);
    setSelectedMaterials([]);
    setSelectedColors([]);
    setMinRating(0);
    setSortBy('featured');
    if (setSearchQuery) setSearchQuery('');
  };

  // Filter & Sort math
  const filteredProducts = products.filter(product => {
    // 1. Category check
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // 2. Search check
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      const matchMat = product.material.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchMat) return false;
    }

    // 3. Price limit
    if (product.price > priceRange) {
      return false;
    }

    // 4. Material check
    if (selectedMaterials.length > 0) {
      const matchMap = selectedMaterials.some(mat => 
        product.material.toLowerCase().includes(mat.toLowerCase())
      );
      if (!matchMap) return false;
    }

    // 5. Colors swatch check
    if (selectedColors.length > 0) {
      const matchSwatch = selectedColors.some(colName =>
        product.colors.some(c => c.name.toLowerCase().includes(colName.toLowerCase()))
      );
      if (!matchSwatch) return false;
    }

    // 6. Star rating limit
    if (product.rating < minRating) {
      return false;
    }

    return true;
  });

  // Sort math
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'newest':
        // Sort 'New' badges first, otherwise keep ID sequence
        const scoreA = a.badge === 'New' ? 2 : 1;
        const scoreB = b.badge === 'New' ? 2 : 1;
        return scoreB - scoreA;
      case 'rating':
        return b.rating - a.rating;
      case 'featured':
      default:
        // Featured prioritize 'Bestseller' and 'New'
        const badgeA = a.badge ? 10 : 0;
        const badgeB = b.badge ? 10 : 0;
        return badgeB - badgeA;
    }
  });

  // Local helper price formatter
  const formatPriceVal = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount).replace('KES', 'KSh');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Editorial Header */}
      <div className="border-b border-walnut/10 pb-6 mb-8 text-left">
        <nav className="font-sans text-xs text-charcoal/50 mb-2 flex items-center space-x-1.5 uppercase tracking-wider">
          <span className="hover:text-gold cursor-pointer">Homepage</span>
          <span>/</span>
          <span className="text-charcoal/80 font-medium">Catalog collection</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-walnut">Our Handcrafted Collection</h1>
            <p className="font-sans text-xs text-charcoal/50 mt-1 uppercase tracking-wider">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Hand-sanded solid designs sculpted for comfortable living'}
            </p>
          </div>
          <span className="font-sans text-xs bg-walnut/5 text-walnut px-3 py-1.5 rounded-none font-semibold border border-walnut/10 shrink-0">
            Showing {sortedProducts.length} of {products.length} Products
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* DESKTOP SIDEBAR FILTERS CONTROL */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-8 text-left">
          
          {/* Header Action Row */}
          <div className="flex items-center justify-between border-b border-walnut/10 pb-4">
            <h3 className="font-serif text-xl font-bold text-walnut flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gold-dark" />
              <span>Filters</span>
            </h3>
            <button
              onClick={handleClearFilters}
              className="text-xs text-gold-dark hover:text-walnut font-sans font-semibold flex items-center gap-1 cursor-pointer focus:outline-hidden"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>

          {/* Facet 1: Category Checkboxes */}
          <div className="space-y-3 pb-6 border-b border-walnut/10">
            <h4 className="font-sans text-xs uppercase font-bold tracking-wider text-walnut">Category Room</h4>
            <div className="space-y-2">
              {[
                { label: 'All Room Furniture', val: 'all' },
                { label: 'Living Room', val: 'living-room' },
                { label: 'Bedroom Cozy', val: 'bedroom' },
                { label: 'Dining Master', val: 'dining-room' },
                { label: 'Office Working', val: 'office' },
                { label: 'Outdoor Patio', val: 'outdoor' }
              ].map((opt) => (
                <label key={opt.val} className="flex items-center space-x-2.5 font-sans text-xs text-charcoal/80 cursor-pointer hover:text-walnut transition-colors">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === opt.val}
                    onChange={() => setSelectedCategory(opt.val)}
                    className="accent-walnut w-3.5 h-3.5"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Facet 2: Price Limit Slider */}
          <div className="space-y-3 pb-6 border-b border-walnut/10">
            <div className="flex justify-between items-baseline">
              <h4 className="font-sans text-xs uppercase font-bold tracking-wider text-walnut">Max Price Range</h4>
              <span className="font-sans text-xs font-semibold text-gold-dark">{formatPriceVal(priceRange)}</span>
            </div>
            <input
              type="range"
              min={15000}
              max={250000}
              step={5000}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-walnut cursor-ew-resize bg-walnut/10"
            />
            <div className="flex justify-between font-sans text-[10px] text-charcoal/40 font-medium">
              <span>KSh 15,000</span>
              <span>KSh 250,000</span>
            </div>
          </div>

          {/* Facet 3: Materials Checked */}
          <div className="space-y-3 pb-6 border-b border-walnut/10">
            <h4 className="font-sans text-xs uppercase font-bold tracking-wider text-walnut">Materials Used</h4>
            <div className="space-y-2">
              {materials.map((mat) => (
                <label key={mat} className="flex items-center space-x-2.5 font-sans text-xs text-charcoal/80 cursor-pointer hover:text-walnut">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(mat)}
                    onChange={() => toggleMaterial(mat)}
                    className="accent-walnut w-3.5 h-3.5 rounded-sm"
                  />
                  <span>{mat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Facet 4: Color Swatches */}
          <div className="space-y-3 pb-6 border-b border-walnut/10">
            <h4 className="font-sans text-xs uppercase font-bold tracking-wider text-walnut">Color Swatch</h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {colors.map((col) => {
                const isSelected = selectedColors.includes(col.name);
                return (
                  <button
                    key={col.name}
                    onClick={() => toggleColor(col.name)}
                    className={`w-6 h-6 rounded-full border-2 focus:outline-hidden cursor-pointer relative flex items-center justify-center transition-all ${
                      isSelected ? 'border-walnut scale-110 shadow-md' : 'border-transparent hover:border-walnut/40'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 bg-white rounded-full mix-blend-difference" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Facet 5: Minimum Ratings */}
          <div className="space-y-3 pb-6">
            <h4 className="font-sans text-xs uppercase font-bold tracking-wider text-walnut">Minimum Rating</h4>
            <div className="space-y-2">
              {[4.8, 4.7, 4.5, 0].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`flex items-center space-x-2 font-sans text-xs cursor-pointer focus:outline-hidden w-full text-left py-1 px-1.5 rounded-md transition-colors ${
                    minRating === rating ? 'bg-walnut/5 text-walnut font-bold' : 'text-charcoal/70 hover:bg-black/5'
                  }`}
                >
                  <span className="text-gold text-xs font-semibold">★</span>
                  <span>{rating === 0 ? 'All Star Levels' : `${rating} stars & up`}</span>
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* MAIN PRODUCT CATALOG CONTAINER VIEW */}
        <div className="flex-1 space-y-6">
          
          {/* SORT & VIEW MODE BAR CONTROL */}
          <div className="bg-white border border-walnut/10 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden w-full sm:w-auto bg-walnut/5 hover:bg-walnut/10 text-walnut font-sans text-xs font-bold py-2.5 px-4 rounded-md flex items-center justify-center gap-2 border border-walnut/10 cursor-pointer focus:outline-hidden"
            >
              <SlidersHorizontal className="w-4 h-4 text-gold-dark" />
              <span>Modify Filters</span>
            </button>

            {/* Sorting Options */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
              <span className="font-sans text-xs text-charcoal/50 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-cream border border-walnut/15 rounded-none text-xs font-sans font-medium text-walnut px-2.5 py-1.5 focus:outline-hidden focus:border-gold cursor-pointer"
              >
                <option value="featured">Nairobi Featured</option>
                <option value="price-low-high">Price Low-High</option>
                <option value="price-high-low">Price High-Low</option>
                <option value="newest">Recent Harvests</option>
                <option value="rating">Top Customer Ratings</option>
              </select>
            </div>

            {/* Layout Mode Toggles */}
            <div className="hidden sm:flex items-center space-x-2 border-l border-walnut/10 pl-4 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-none cursor-pointer transition-colors ${
                  viewMode === 'grid' ? 'bg-walnut text-cream' : 'text-walnut hover:bg-black/5'
                }`}
                title="Grid layout view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-none cursor-pointer transition-colors ${
                  viewMode === 'list' ? 'bg-walnut text-cream' : 'text-walnut hover:bg-black/5'
                }`}
                title="List layout view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* ACTIVE FILTER DISPLAYS (FOR CONVERSION ASSURANCE) */}
          {(selectedCategory !== 'all' || selectedMaterials.length > 0 || selectedColors.length > 0 || minRating > 0 || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 text-left">
              <span className="font-sans text-[10px] uppercase font-bold text-charcoal/40">Active selectors:</span>
              
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 font-sans text-xs bg-walnut/5 border border-walnut/10 text-walnut px-3 py-1 rounded-sm">
                  <span>Room: {selectedCategory.replace('-', ' ')}</span>
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-gold cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 font-sans text-xs bg-walnut/5 border border-walnut/10 text-walnut px-3 py-1 rounded-sm">
                  <span>Keyword: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery && setSearchQuery('')} className="hover:text-gold cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedMaterials.map(mat => (
                <span key={mat} className="inline-flex items-center gap-1.5 font-sans text-xs bg-walnut/5 border border-walnut/10 text-walnut px-3 py-1 rounded-sm">
                  <span>Timber: {mat}</span>
                  <button onClick={() => toggleMaterial(mat)} className="hover:text-gold cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              ))}

              {selectedColors.map(col => (
                <span key={col} className="inline-flex items-center gap-1.5 font-sans text-xs bg-walnut/5 border border-walnut/10 text-walnut px-3 py-1 rounded-sm">
                  <span>Color: {col}</span>
                  <button onClick={() => toggleColor(col)} className="hover:text-gold cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              ))}

              {minRating > 0 && (
                <span className="inline-flex items-center gap-1.5 font-sans text-xs bg-walnut/5 border border-walnut/10 text-walnut px-3 py-1 rounded-sm">
                  <span>{minRating}★ & Up</span>
                  <button onClick={() => setMinRating(0)} className="hover:text-gold cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              <button
                onClick={handleClearFilters}
                className="font-sans text-xs text-rose-600 hover:text-rose-700 font-bold underline cursor-pointer ml-auto"
              >
                Clear all tags
              </button>
            </div>
          )}

          {/* CATALOG MAIN ITEMS DISPLAY STAGE */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white border border-walnut/10 rounded-none p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-walnut/5 rounded-none flex items-center justify-center text-charcoal/40">
                <SlidersHorizontal className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-walnut">No furniture items matched</h3>
              <p className="font-sans text-xs text-charcoal/50 max-w-sm leading-relaxed">
                Try widening your timber options or clearing filters. You can also contact OWEN directly on live WhatsApp to specify raw lumber profiles!
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-walnut hover:bg-gold text-cream hover:text-walnut font-sans text-xs uppercase font-bold py-2.5 px-6 rounded-none tracking-wider transition-all border border-walnut hover:border-gold cursor-pointer"
              >
                Reset Catalogue Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            
            /* Grid View (Responsive layouts) */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
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
          ) : (
                     /* List View Structure (Wide screens) */
            <div className="space-y-4 text-left">
              {sortedProducts.map((product) => {
                const badge = product.stockCount <= 3 ? 'Only 3 left!' : product.badge;
                return (
                  <div 
                    key={product.id}
                    className="bg-cream border border-walnut/15 rounded-none overflow-hidden flex flex-col sm:flex-row gap-6 p-4 hover:shadow-xl hover:border-gold transition-all group cursor-pointer"
                    onClick={() => onSelectProduct(product.id)}
                  >
                    <div className="w-full sm:w-48 aspect-video sm:aspect-square overflow-hidden rounded-none bg-walnut/5 shrink-0 relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-105"
                      />
                      {badge && (
                        <span className="absolute top-2 left-2 bg-walnut text-cream text-[8px] font-bold py-0.5 px-1.5 uppercase rounded-none">
                          {badge}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <span className="font-sans text-[9px] uppercase tracking-wider text-gold-dark font-bold">
                          {product.category.replace('-', ' ')}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-walnut group-hover:text-gold transition-colors mt-0.5">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-1 mt-1 mb-2">
                          <span className="text-gold text-xs">★</span>
                          <span className="font-sans text-xs text-charcoal/60 font-semibold">{product.rating} ({product.reviewCount} customer reviews)</span>
                        </div>
                        <p className="font-sans text-xs text-charcoal/70 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 flex items-center justify-between border-t border-walnut/5 pt-3">
                        <div className="flex items-baseline space-x-2">
                          <span className="font-sans text-base font-bold text-walnut">
                            {formatPriceVal(product.price)}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="font-sans text-xs text-charcoal/40 line-through">
                              {formatPriceVal(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (product.inStock) onAddToCart(product, 0);
                          }}
                          disabled={!product.inStock}
                          className="bg-gold hover:bg-gold-dark disabled:bg-black/10 text-walnut font-sans text-xs font-semibold py-2 px-4 rounded-none border border-gold transition-colors cursor-pointer"
                        >
                          {product.inStock ? 'Add To Cart' : 'Sold Out'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* MOBILE FILTER SIDEBAR (Drawer-like Overlay) */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex" id="mobile-filter-drawer">
          <div onClick={() => setMobileFiltersOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
          <div className="relative w-full max-w-xs bg-cream h-full flex flex-col p-6 overflow-y-auto border-r border-walnut/15 z-10 animate-in slide-in-from-left duration-200 text-left">
            <div className="flex items-center justify-between border-b border-walnut/10 pb-4 mb-6">
              <h3 className="font-serif text-xl font-bold text-walnut">Modify Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1.5 hover:bg-black/5 rounded-full"><X className="w-5 h-5 text-walnut" /></button>
            </div>

            {/* Quick Actions */}
            <button
              onClick={() => {
                handleClearFilters();
                setMobileFiltersOpen(false);
              }}
              className="w-full border border-walnut/15 text-xs text-walnut font-sans py-2 rounded-none mb-6 flex items-center justify-center gap-1.5 hover:bg-walnut hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Selected Tags</span>
            </button>

            {/* Filter segments inside dynamic drawer */}
            <div className="space-y-6">
              {/* Rooms */}
              <div className="space-y-2">
                <h4 className="font-sans text-xs uppercase font-bold text-walnut">Room Category</h4>
                <div className="space-y-1.5 font-sans text-xs">
                  {['all', 'living-room', 'bedroom', 'dining-room', 'office', 'outdoor'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2.5">
                      <input
                        type="radio"
                        checked={selectedCategory === opt}
                        onChange={() => {
                          setSelectedCategory(opt);
                          setMobileFiltersOpen(false);
                        }}
                        className="accent-walnut"
                      />
                      <span>{opt === 'all' ? 'All Rooms' : opt.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price max limit */}
              <div className="space-y-2">
                <h4 className="font-sans text-xs uppercase font-bold text-walnut">Max Price Range</h4>
                <div className="text-sm font-bold text-gold-dark">{formatPriceVal(priceRange)}</div>
                <input
                  type="range"
                  min={15000}
                  max={250000}
                  step={5000}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-walnut cursor-ew-resize bg-walnut/10"
                />
              </div>

              {/* Materials */}
              <div className="space-y-2">
                <h4 className="font-sans text-xs uppercase font-bold text-walnut">Materials Used</h4>
                <div className="space-y-1.5 font-sans text-xs">
                  {materials.map(mat => (
                    <label key={mat} className="flex items-center space-x-2.5">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                        className="accent-walnut"
                      />
                      <span>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-2">
                <h4 className="font-sans text-xs uppercase font-bold text-walnut">Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map(col => {
                    const isSelected = selectedColors.includes(col.name);
                    return (
                      <button
                        key={col.name}
                        onClick={() => toggleColor(col.name)}
                        className={`w-6 h-6 rounded-full border-2 ${isSelected ? 'border-walnut' : 'border-transparent'}`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      />
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
