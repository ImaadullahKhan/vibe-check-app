import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  MapPin, 
  ChefHat,
  MessageCircle,
  Zap,
  CheckCircle2,
  UtensilsCrossed,
  Layers,
  UploadCloud,
  Coffee,
  Sparkle
} from 'lucide-react';
import { subscribeToImageStore } from '../utils/imageStore';
import { getItemImageCandidates } from '../utils/menuImageMapper';
import { MENU_ITEMS } from '../data/menuData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOpenWhatsApp?: () => void;
  onBookParty?: () => void;
  onWhatsAppClick?: (source: string) => void;
  onOpenMediaUpload?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onOpenWhatsApp,
  onBookParty,
  onWhatsAppClick,
  onOpenMediaUpload,
}) => {
  const [storeVersion, setStoreVersion] = useState(0);

  // Subscribe to image store updates
  useEffect(() => {
    return subscribeToImageStore(() => {
      setStoreVersion((v) => v + 1);
    });
  }, []);

  const handleWhatsAppAction = (source: string) => {
    if (onWhatsAppClick) {
      onWhatsAppClick(source);
    } else if (onOpenWhatsApp) {
      onOpenWhatsApp();
    }
  };

  // Grab representative items for the hero preview
  const mainBurgerItem = MENU_ITEMS.find((i) => i.id === 8) || MENU_ITEMS[7]; // Double Smash Lamb
  const loadedFriesItem = MENU_ITEMS.find((i) => i.id === 22) || MENU_ITEMS[21]; // Loaded Fries
  const wichItem = MENU_ITEMS.find((i) => i.id === 13) || MENU_ITEMS[12]; // Spicy Smoked Wich
  const shakeItem = MENU_ITEMS.find((i) => i.id === 32) || MENU_ITEMS[31]; // Biscoff Shake

  const mainBurgerCandidates = mainBurgerItem ? getItemImageCandidates(mainBurgerItem).candidateUrls : [];
  const friesCandidates = loadedFriesItem ? getItemImageCandidates(loadedFriesItem).candidateUrls : [];
  const wichCandidates = wichItem ? getItemImageCandidates(wichItem).candidateUrls : [];
  const shakeCandidates = shakeItem ? getItemImageCandidates(shakeItem).candidateUrls : [];

  const [mainImgError, setMainImgError] = useState(false);
  const [friesImgError, setFriesImgError] = useState(false);
  const [wichImgError, setWichImgError] = useState(false);
  const [shakeImgError, setShakeImgError] = useState(false);

  useEffect(() => {
    setMainImgError(false);
    setFriesImgError(false);
    setWichImgError(false);
    setShakeImgError(false);
  }, [storeVersion]);

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:py-16 lg:py-20 border-b border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-rose-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-950/80 text-rose-300 border border-rose-800/60 shadow-inner">
                <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                <span>Malakpet&apos;s #1 Artisanal Smash Joint</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-800/50">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Live WhatsApp Ordering Active</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-['Outfit',sans-serif] text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08]">
              Crispy Caramelized Lace. <br />
              <span className="bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                Hyderabad&apos;s Truest Smash.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Real American-style cast-iron smash burgers, pressed crunchy &apos;wiches, fiery tenders, and thick shakes. Handcrafted fresh to order by <strong className="text-white">Mohammed Mukarram Mohiuddin</strong> in Malakpet.
            </p>

            {/* Key Value Propositions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-xs text-slate-200 font-semibold">100% Halal Cuts</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-200 font-semibold">Zero Frozen Patties</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-200 font-semibold">10-Min Fast Pickup</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenu}
                className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-xl shadow-rose-950/60 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>EXPLORE MENU (34 ITEMS)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-whatsapp-order-btn"
                onClick={() => handleWhatsAppAction('hero_cta')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] border border-emerald-500/30"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>ORDER ON WHATSAPP</span>
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9 / 5.0</span>
                <span>(350+ Reviews)</span>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Near Old Super Bazaar, Malakpet</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Bento */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Visual Card */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/80 shadow-2xl p-3 sm:p-4 backdrop-blur-sm group">
              
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 flex items-center justify-center">
                
                {/* Live Image if Available */}
                {!mainImgError && mainBurgerCandidates.length > 0 ? (
                  <img
                    src={mainBurgerCandidates[0]}
                    alt="Vibe Check Artisanal Double Smash Lamb Burger with caramelized lace edges and melted cheddar"
                    onError={() => setMainImgError(true)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  /* Stylized Food Visual Card Fallback */
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-950/40 via-slate-900 to-amber-950/30 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-600/30 to-amber-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-xl mb-3 group-hover:scale-110 transition-transform">
                      <Flame className="w-8 h-8 text-rose-400 fill-rose-500/30 animate-pulse" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider mb-1.5 border border-rose-500/30">
                      Signature Smash
                    </div>
                    <h3 className="text-lg font-black text-white font-['Outfit',sans-serif]">
                      Lamb Smash OG & Double B**F
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-xs leading-relaxed">
                      Screaming hot cast-iron smash with crispy caramelized lace crust & melted cheese
                    </p>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none"></div>
                
                {/* Floating Tag */}
                <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-rose-500/40 px-3 py-1 rounded-full text-xs font-bold text-rose-400 flex items-center gap-1.5 shadow-lg z-10">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Smashed Fresh to Order</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between z-10">
                  <div>
                    <h4 className="text-sm font-bold text-white">Lamb Smash OG & Double B**F</h4>
                    <p className="text-[11px] text-amber-400 font-medium">Caramelized Lace Edges • From ₹200</p>
                  </div>
                  <button
                    onClick={onExploreMenu}
                    className="text-xs bg-rose-600 hover:bg-rose-500 text-white font-bold px-3.5 py-1.5 rounded-lg transition-colors shadow-md"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Mini Preview Bento Strip below image */}
              <div className="grid grid-cols-3 gap-2.5 mt-3">
                
                {/* 1. Loaded Fries */}
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 relative aspect-video group/sub flex items-center justify-center">
                  {!friesImgError && friesCandidates.length > 0 ? (
                    <img
                      src={friesCandidates[0]}
                      alt="B**F Loaded Crinkle Fries with molten cheese sauce and chili mince"
                      onError={() => setFriesImgError(true)}
                      className="w-full h-full object-cover group-hover/sub:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 to-slate-900 flex flex-col items-center justify-center p-2 text-center">
                      <UtensilsCrossed className="w-4 h-4 text-amber-400 mb-1" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-1.5 pointer-events-none">
                    <span className="text-[10px] font-bold text-white truncate">Loaded Fries</span>
                  </div>
                </div>

                {/* 2. Spicy Smoked Wich */}
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 relative aspect-video group/sub flex items-center justify-center">
                  {!wichImgError && wichCandidates.length > 0 ? (
                    <img
                      src={wichCandidates[0]}
                      alt="Spicy & Smoked Cheese Wich grilled sandwich with molten gourmet cheese blend"
                      onError={() => setWichImgError(true)}
                      className="w-full h-full object-cover group-hover/sub:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-950/30 to-slate-900 flex flex-col items-center justify-center p-2 text-center">
                      <Layers className="w-4 h-4 text-rose-400 mb-1" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-1.5 pointer-events-none">
                    <span className="text-[10px] font-bold text-white truncate">Spicy Smoked</span>
                  </div>
                </div>

                {/* 3. Biscoff Shake */}
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 relative aspect-video group/sub flex items-center justify-center">
                  {!shakeImgError && shakeCandidates.length > 0 ? (
                    <img
                      src={shakeCandidates[0]}
                      alt="Lotus Biscoff Thick Shake with speculoos swirl and biscuit crumble"
                      onError={() => setShakeImgError(true)}
                      className="w-full h-full object-cover group-hover/sub:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 to-slate-900 flex flex-col items-center justify-center p-2 text-center">
                      <Coffee className="w-4 h-4 text-amber-300 mb-1" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-1.5 pointer-events-none">
                    <span className="text-[10px] font-bold text-white truncate">Biscoff Shake</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

