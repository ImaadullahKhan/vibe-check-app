import React from 'react';
import { Clock, MapPin, Sparkles, Flame } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Kitchen Operating Hours and Direct Ordering" id="announcement-bar" className="bg-gradient-to-r from-rose-950/90 via-slate-900 to-amber-950/90 border-b border-slate-800/80 text-xs py-2 px-3 sm:px-6 relative z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-300">
        
        {/* Left: Fresh Catchphrase & Malakpet Location */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs">
          <span className="flex items-center gap-1 text-rose-400 font-bold bg-rose-950/80 border border-rose-800/50 px-2 py-0.5 rounded-full">
            <Flame className="w-3 h-3 text-rose-500 fill-rose-500 shrink-0" />
            <span className="leading-none pt-[1px]">Malakpet, Hyderabad</span>
          </span>
          <span className="text-slate-300 hidden md:inline leading-none pt-[1px]">
            Authentic Crispy Caramelized Smash Burgers & Loaded Sides
          </span>
        </div>

        {/* Right: Kitchen Timing */}
        <div className="flex items-center justify-center text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 text-amber-300 font-bold bg-amber-950/40 border border-amber-900/50 px-2 py-0.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="leading-none pt-[1px]">Open Daily • 2:00 PM – 11:30 PM</span>
          </span>
        </div>

      </div>
    </aside>
  );
};
