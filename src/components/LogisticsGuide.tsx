import React from 'react';
import { 
  Smartphone, 
  Bike, 
  Store, 
  Users, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';

interface LogisticsGuideProps {
  onExploreMenu: () => void;
  onBookParty: () => void;
  onWhatsAppClick: (source: string) => void;
}

export const LogisticsGuide: React.FC<LogisticsGuideProps> = ({
  onExploreMenu,
  onBookParty,
  onWhatsAppClick
}) => {
  return (
    <section id="how-to-order" className="scroll-mt-24 pt-6 pb-10 sm:pt-8 sm:pb-16 bg-slate-900/40 border-y border-slate-800/80 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-700/50">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Frictionless Ordering Experience</span>
          </div>

          <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How To Get Your <span className="text-rose-500">Vibe Check</span> Fix
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Choose the ordering channel that fits your vibe today — from rapid doorstep delivery to direct kitchen pickups and event catering.
          </p>
        </div>

        {/* 3 Logistic Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Delivery Platforms */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-rose-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-rose-950/20">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-900 to-rose-950 border border-rose-700/50 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Bike className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-rose-400">
                  Doorstep Food Delivery
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Swiggy & Zomato
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Craving late-night smash burgers at your couch? Order directly through our verified storefronts on Swiggy and Zomato apps with real-time GPS tracking.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-time delivery rider tracking</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Contactless home delivery in Malakpet & Old City</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center gap-3">
              <span className="flex-1 text-center py-2.5 px-3 rounded-xl bg-[#FC8019]/20 text-[#FC8019] border border-[#FC8019]/40 font-bold text-xs">
                Swiggy
              </span>
              <span className="flex-1 text-center py-2.5 px-3 rounded-xl bg-[#E23744]/20 text-[#E23744] border border-[#E23744]/40 font-bold text-xs">
                Zomato
              </span>
            </div>
          </div>

          {/* Card 2: Self-Pickup / Rapido Delivery (Hero Card) */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative shadow-2xl shadow-emerald-950/30 group">
            
            {/* Recommended Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-extrabold text-[11px] uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
              Fastest & Freshest 🔥
            </div>

            <div className="space-y-4 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Store className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-400">
                  WhatsApp Direct Kitchen
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Self-Pickup / Pickup Service
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Place your order directly via our interactive WhatsApp catalog. The kitchen prepares your smash order fresh in 10 minutes. Pick up yourself at Malakpet or book any pickup service for instant pickup using your name as a reference!
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Ready in 8-12 minutes hot from the grill</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Lower Ground, Jamuna Towers, Malakpet</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>No 30% platform markup — Direct Best Pricing</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-6 border-t border-slate-800 space-y-4">
              <button
                id="logistics-order-now-btn"
                onClick={onExploreMenu}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-lg transition-all duration-150"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Build Order & Send to WhatsApp</span>
              </button>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-white p-2 rounded-xl shrink-0">
                  <img 
                    src="/whatsapp_qr.png" 
                    alt="WhatsApp QR Code to scan and open our menu catalog for ordering"
                    className="w-24 h-24 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjMiIHk9IjMiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgcng9IjIiIHJ5PSIyIi8+PHBhdGggZD0iTTggMTBoLjAxIi8+PHBhdGggZD0iTTE2IDEwaC4wMSIvPjxwYXRoIGQ9Ik04IDE0aC4wMSIvPjxwYXRoIGQ9Ik0xNiAxNGguMDEiLz48L3N2Zz4=';
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-400 mb-1">Order Instantly via WhatsApp</h4>
                  <p className="text-xs text-slate-400 leading-tight">
                    Scan this code with your phone camera to view our full catalog and place your order directly in WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Party & Bulk Catering */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-amber-950/20">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-900 to-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Users className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-amber-400">
                  Bulk & Corporate Events
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Party & Bulk Catering
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Hosting a birthday, clinic party, corporate lunch, or late-night gaming bash? Get customized bulk burger boxes, slider platters, and beverage stations at exclusive volume rates.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Customizable spice levels & Halal certifications</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Direct phone line with sales rep Mohammed Mukarram</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <button
                id="logistics-catering-btn"
                onClick={onBookParty}
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-amber-500/30 font-bold text-sm py-3 px-4 rounded-xl transition-all duration-150"
              >
                <span>Inquire Catering Packages</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
