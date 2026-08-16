import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Award, 
  ShieldCheck, 
  MapPin, 
  Utensils, 
  Heart, 
  Sparkles,
  Layers,
  ChefHat
} from 'lucide-react';
import { subscribeToImageStore } from '../utils/imageStore';
import { getItemImageCandidates } from '../utils/menuImageMapper';
import { MENU_ITEMS } from '../data/menuData';
import { VibeCheckLogo } from './VibeCheckLogo';

export const BrandStorySection: React.FC = () => {
  const [storeVersion, setStoreVersion] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    return subscribeToImageStore(() => {
      setStoreVersion((v) => v + 1);
      setImageError(false);
    });
  }, []);

  const storyItem = MENU_ITEMS.find((i) => i.id === 7) || MENU_ITEMS[6]; // B**F Smash OG Single
  const storyCandidates = storyItem ? getItemImageCandidates(storyItem).candidateUrls : [];

  return (
    <section id="brand-story" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left: Visual Collage */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl p-3">
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden relative bg-gradient-to-br from-rose-950/40 via-slate-900 to-amber-950/30 flex items-center justify-center border border-slate-800/80">
              {!imageError && storyCandidates.length > 0 ? (
                <img
                  src={storyCandidates[0]}
                  alt="Vibe Check Signature Artisanal Double Smash B**F Burger on screaming cast-iron flat top"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 shadow-xl">
                    <Flame className="w-10 h-10 text-rose-500 animate-pulse" />
                  </div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                    Artisanal Cast Iron Searing
                  </span>
                  <h3 className="text-xl font-black text-white font-['Outfit',sans-serif]">
                    Crispy Maillard Lace Crust
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 max-w-xs leading-relaxed">
                    Custom seasoned halal cuts smashed paper-thin on screaming hot flat-tops
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
              
              {/* Circular Logo Brand Seal */}
              <div className="absolute top-4 right-4 z-10">
                <VibeCheckLogo variant="circle" className="w-14 h-14" subtextColor="white" />
              </div>
            </div>

            {/* Bottom floating badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>The Searing Science</span>
              </div>
              <p className="text-white text-xs font-semibold mt-1">
                Heavy cast-iron press + screaming hot flat top = Maillard lace crust.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Story Typography */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-700/50">
            <ChefHat className="w-3.5 h-3.5 text-amber-400" />
            <span>Our Craft & Heritage</span>
          </div>

          <h2 className="font-['Outfit',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-tight">
            Crafting Hyderabad&apos;s Truest <span className="text-rose-500">Smash Burger</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Founded by <strong className="text-white">Mohammed Mukarram Mohiuddin</strong> in Malakpet, <strong className="text-rose-400">VIBE CHECK</strong> was born out of pure passion for authentic street-style smash technique. No frozen patties or synthetic fillings — only fresh, custom-ground cuts smashed wafer-thin onto screaming hot grills to unlock maximum caramelization and crispy lace edges.
          </p>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            From our signature pressed &apos;wiches loaded with melted cheese blends, to hot Nashville spiced fillets and Lotus Biscoff thick shakes, every recipe is dialed in for crunch, juiciness, and craveability.
          </p>

          {/* Pillars Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3">
            
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-400 mb-2.5">
                <Flame className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Wafer-Thin Smash</h3>
              <p className="text-xs text-slate-400">Cast-iron smashed for maximum Maillard reaction and crisp lace edges.</p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400 mb-2.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">100% Halal & Fresh</h3>
              <p className="text-xs text-slate-400">Strict hygiene protocols under FSSAI license #23626034002366.</p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-2.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Direct & Transparent</h3>
              <p className="text-xs text-slate-400">Direct order dispatch without inflated platform markups.</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
