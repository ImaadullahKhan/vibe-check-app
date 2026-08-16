import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Check, 
  ShoppingBag, 
  ArrowUpDown, 
  Utensils, 
  Leaf, 
  Wrench,
  HelpCircle,
  UploadCloud
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

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Veg only toggle
      if (vegOnly && !item.isVeg) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
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

  return (
    <section id="menu-catalog" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
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
          <div className="relative min-w-[240px]">
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

          {/* Veg-Only Toggle */}
          <button
            id="veg-only-toggle-btn"
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border ${
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
          <div className="relative">
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

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`filter-tab-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id as CategoryId)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                isSelected
                  ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-950/60 scale-[1.02]'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold ${
                isSelected ? 'bg-rose-800 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {cat.count}
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

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
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
              View Box →
            </span>
          </button>
        </div>
      )}

    </section>
  );
};
