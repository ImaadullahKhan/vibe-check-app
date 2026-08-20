import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Check, 
  ArrowUpDown, 
  ShoppingBag,
  Leaf,
  LayoutGrid,
  Hamburger,
  Sandwich,
  Popcorn,
  CupSoda,
  GlassWater,
  Utensils,
  Flame
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import { MenuItem, CategoryId } from '../types';
import { MenuCard } from './MenuCard';

interface MenuCatalogProps {
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem, quantity: number, notes?: string) => void;
  cartQuantities: Record<number, number>;
  onOpenCart: () => void;
  cartTotalCount: number;
}

const WrapIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M12 16L18 10a3 3 0 0 0-4-4L8 12" />
    <path d="M8 12c2 0 4 2 4 4" />
    <path d="M8 12c-4-1-6 4-2 6 2 1 4 0 6-2" />
    <path d="M6 14c1 1 2 0 3 1" />
    <path d="M5 16c2 1 4-1 6 0" />
    <path d="M13 8l2 2" />
    <path d="M11 10l2 2" />
    <path d="M9 12l2 2" />
    <path d="M7 6c0-1.5 1.5-1.5 1.5-3S7 1.5 7 1" />
    <path d="M11 6c0-1.5 1.5-1.5 1.5-3S11 1.5 11 1" />
  </svg>
);

const getCategoryIcon = (id: string, className = "w-6 h-6") => {
  switch (id) {
    case 'all': return <LayoutGrid className={className} />;
    case 'burgers': return <Hamburger className={className} />;
    case 'wiches': return <Sandwich className={className} />;
    case 'sides': return <Popcorn className={className} />;
    case 'wraps': return <WrapIcon className={className} />;
    case 'shakes': return <CupSoda className={className} />;
    case 'coolers': return <GlassWater className={className} />;
    default: return <Utensils className={className} />;
  }
};

export const MenuCatalog: React.FC<MenuCatalogProps> = ({
  onSelectItem,
  onAddToCart,
  cartQuantities,
  onOpenCart,
  cartTotalCount,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Veg Filter
      if (vegOnly && !item.isVeg) return false;

      // Category Filter (Handled dynamically in grouping now, but we still apply it to filteredItems)
      // Actually, if 'all', we want all items. If not, filter by category.
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Search Text Filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        const matchesTags = item.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      
      // Default: bestsellers first, then id
      if (a.isBestseller && !b.isBestseller) return -1;
      if (!a.isBestseller && b.isBestseller) return 1;
      return a.id - b.id;
    });
  }, [selectedCategory, searchQuery, vegOnly, sortBy]);

  const handleUpdateQuantity = (id: number, delta: number) => {
    const current = cartQuantities[id] || 0;
    const next = Math.max(0, current + delta);
    const item = MENU_ITEMS.find(i => i.id === id);
    if (item) {
      onAddToCart(item, next);
    }
  };

  // Group items by category for rendering
  const activeCategories = CATEGORIES.filter(cat => cat.id !== 'all' && (selectedCategory === 'all' || selectedCategory === cat.id));

  return (
    <section id="menu-catalog" className="scroll-mt-24 pt-6 pb-10 sm:pt-8 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-950/80 text-rose-300 border border-rose-700/50">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>Artisanal 34-Item Master Catalog</span>
          </div>
          <h2 className="font-['Outfit',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-tight">
            Explore The <span className="text-rose-500">Menu</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            From crispy smash burgers and loaded pressed &apos;wiches to fiery tenders, falafels, Biscoff shakes, and sparkling coolers.
          </p>
        </div>

        {/* Search Bar & Fast Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 sm:min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="menu-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 34 items (e.g. Lamb, Biscoff...)"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center w-full sm:w-auto">
            {/* Veg-Only Toggle */}
            <button
              id="veg-only-toggle-btn"
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border w-full sm:w-auto ${
                vegOnly 
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-950/40' 
                  : 'bg-slate-900 text-slate-300 border-slate-700/80 hover:border-slate-600'
              }`}
            >
              <Leaf className={`w-3.5 h-3.5 ${vegOnly ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>Veg Only</span>
              {vegOnly && <Check className="w-3 h-3 text-emerald-400" />}
            </button>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select
                id="menu-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700/80 text-xs font-semibold text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-rose-500 appearance-none pr-8 cursor-pointer"
              >
                <option value="featured">Featured & Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Icon Filters */}
      <div className="flex flex-nowrap items-start justify-between w-full mb-8">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`filter-tab-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id as CategoryId)}
              className="flex-1 flex flex-col items-center gap-1.5 group"
            >
              <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-200 border ${
                isSelected 
                  ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-950/60 scale-105' 
                  : 'bg-slate-900/90 text-slate-400 border-slate-800 group-hover:border-slate-600 group-hover:text-slate-300'
              }`}>
                {getCategoryIcon(cat.id, 'w-4 h-4 sm:w-6 sm:h-6')}
              </div>
              <span className={`text-[9px] sm:text-[11px] text-center font-bold leading-tight ${
                isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
              }`}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
          <Utensils className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-lg font-bold text-white">No items found</p>
          <p className="text-sm text-slate-400 mt-1">Try resetting the veg filter or searching for another term.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setVegOnly(false);
              setSelectedCategory('all');
            }}
            className="mt-4 text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-800/60 px-4 py-2 rounded-xl"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Grouped Menu Items Grid */}
      <div className="space-y-8">
        {activeCategories.map(cat => {
          const categoryItems = filteredItems.filter(item => item.category === cat.id);
          if (categoryItems.length === 0) return null;
          
          return (
            <div key={cat.id} className="pt-2">
              {/* Category Line Bracket Header */}
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-white whitespace-nowrap">{cat.label}</h3>
                <div className="h-px bg-slate-800 flex-1"></div>
              </div>
              
              <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {categoryItems.map((item) => {
                  const inCartCount = cartQuantities[item.id] || 0;
                  return (
                    <MenuCard
                      key={item.id}
                      item={item}
                      inCartCount={inCartCount}
                      onAddToCart={(item) => onAddToCart(item, 1)}
                      onUpdateQuantity={handleUpdateQuantity}
                      onSelectItem={onSelectItem}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Floating Cart Bar on Mobile/Desktop when items exist */}
      {cartTotalCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-md animate-in slide-in-from-bottom duration-200">
          <button
            onClick={onOpenCart}
            className="w-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 text-white font-bold py-3.5 px-5 rounded-2xl shadow-2xl shadow-rose-950/80 flex items-center justify-between border border-rose-400/40 hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-950/40 flex items-center justify-center text-amber-300">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-rose-100">{cartTotalCount} item(s) selected</p>
                <p className="text-sm font-extrabold text-white">Review & Order on WhatsApp</p>
              </div>
            </div>
            <span className="bg-slate-950 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl border border-white/20">
              View Cart →
            </span>
          </button>
        </div>
      )}
    </section>
  );
};
