import React from 'react';
import { Clock, MapPin, Sparkles, MessageCircle, Flame } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Kitchen Operating Hours and Direct Ordering" id="announcement-bar" className="bg-gradient-to-r from-rose-950/90 via-slate-900 to-amber-950/90 border-b border-slate-800/80 text-xs py-2 px-3 sm:px-6 relative z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-300">
        
        {/* Left: Fresh Catchphrase & Malakpet Location */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs">
          <span className="flex items-center gap-1 text-rose-400 font-bold bg-rose-950/80 border border-rose-800/50 px-2 py-0.5 rounded-full">
            <Flame className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>Malakpet, Hyderabad</span>
          </span>
          <span className="text-slate-300 hidden md:inline">
            Authentic Crispy Caramelized Smash Burgers & Loaded Sides
          </span>
        </div>

        {/* Right: Kitchen Timing & Direct WhatsApp Ordering */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Open Daily • 12:00 PM – 2:00 AM</span>
          </div>

          <div className="w-1 h-1 rounded-full bg-slate-600 hidden sm:block"></div>

          <a 
            href="https://wa.me/919505021177?text=Hi%20Vibe%20Check%21%20I%20would%20like%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
            <span>Direct WhatsApp: +91 9505021177</span>
          </a>
        </div>

      </div>
    </aside>
  );
};
