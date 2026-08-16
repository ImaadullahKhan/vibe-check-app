import React, { useState } from 'react';
import { 
  Instagram, 
  Play, 
  Heart, 
  Eye, 
  ExternalLink,
  Flame,
  User
} from 'lucide-react';
import { INSTAGRAM_REELS } from '../data/reviewsData';
import { InstagramReel } from '../types';

export const InstagramReelsSection: React.FC = () => {
  const [activeReel, setActiveReel] = useState<InstagramReel | null>(null);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedReels(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="instagram-reels" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-rose-950 to-purple-950 text-rose-300 border border-rose-700/50">
            <Instagram className="w-3.5 h-3.5 text-rose-400" />
            <span>Social Proof & Food Influencer Buzz</span>
          </div>

          <h2 className="font-['Outfit',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-tight">
            Customer Reactions on <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-400 to-amber-400">Instagram</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Watch real sizzle shots, viral cheese pulls, and genuine reviews from Hyderabad&apos;s food community visiting our Malakpet kitchen.
          </p>
        </div>

        {/* Direct Link to IG */}
        <a
          id="instagram-profile-btn"
          href="https://www.instagram.com/vibecheck.cafe/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg shadow-rose-950/60 hover:scale-[1.02] transition-all"
        >
          <Instagram className="w-4 h-4" />
          <span>Follow @vibecheck.cafe</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 4-Grid Reel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {INSTAGRAM_REELS.map((reel) => {
          const isLiked = likedReels[reel.id];

          return (
            <div
              key={reel.id}
              id={`instagram-reel-card-${reel.id}`}
              onClick={() => setActiveReel(reel)}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden cursor-pointer group hover:border-rose-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-950/30 flex flex-col justify-between relative"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[9/16] w-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden flex items-center justify-center">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Rich Food Reel Graphic Fallback if image not yet loaded */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-950/40 via-purple-950/20 to-slate-950 flex flex-col items-center justify-center p-6 text-center pointer-events-none -z-0">
                  <div className="w-14 h-14 rounded-2xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-2 shadow-lg group-hover:scale-110 transition-transform">
                    <Flame className="w-7 h-7 text-rose-500" />
                  </div>
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                    {reel.tag}
                  </span>
                  <p className="text-xs font-bold text-white mt-1 line-clamp-2 px-2">
                    {reel.title}
                  </p>
                </div>
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950 pointer-events-none"></div>

                {/* Top Author Tag */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-slate-700/60">
                    <div className="w-5 h-5 rounded-full bg-rose-950 border border-rose-500/60 flex items-center justify-center text-[9px] font-bold text-rose-300">
                      {reel.avatar}
                    </div>
                    <span className="text-[11px] font-bold text-slate-200 truncate max-w-[100px]">
                      {reel.handle}
                    </span>
                  </div>

                  <span className="text-[10px] font-extrabold bg-rose-600 text-white px-2 py-0.5 rounded-full shadow">
                    {reel.tag}
                  </span>
                </div>

                {/* Center Play Button Simulator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-125 transition-transform duration-300 border-2 border-white/40">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-3 left-3 right-3 space-y-2 z-10">
                  <p className="text-xs font-bold text-white leading-snug line-clamp-2">
                    &ldquo;{reel.quote}&rdquo;
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-slate-800/80">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>{reel.views} views</span>
                    </div>

                    <button
                      onClick={(e) => toggleLike(reel.id, e)}
                      className={`flex items-center gap-1 font-bold ${
                        isLiked ? 'text-rose-500' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{isLiked ? 'Liked' : reel.likes}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Reel Playback Modal Simulation */}
      {activeReel && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setActiveReel(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[9/16] w-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center">
              <img
                src={activeReel.thumbnail}
                alt={activeReel.title}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                className="w-full h-full object-cover"
              />
              {/* Fallback graphic */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-950/40 via-purple-950/30 to-slate-950 flex flex-col items-center justify-center p-6 text-center -z-0">
                <div className="w-16 h-16 rounded-2xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-2">
                  <Flame className="w-8 h-8 text-rose-500" />
                </div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{activeReel.tag}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80 pointer-events-none"></div>

              {/* Top Header */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-950 border border-rose-500 flex items-center justify-center text-xs font-bold text-rose-300">
                    {activeReel.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{activeReel.author}</p>
                    <p className="text-[10px] text-slate-400">{activeReel.handle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveReel(null)}
                  className="w-8 h-8 rounded-full bg-slate-950/80 text-white flex items-center justify-center border border-slate-700"
                >
                  ✕
                </button>
              </div>

              {/* Sound & Sizzle Simulation Animation */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-2 z-10">
                <div className="w-16 h-16 rounded-full bg-rose-600/80 border-2 border-white/80 flex items-center justify-center text-white mx-auto animate-pulse shadow-xl">
                  <Flame className="w-8 h-8 fill-amber-300 text-amber-300" />
                </div>
                <span className="text-[11px] font-extrabold bg-slate-950/90 text-amber-300 px-3 py-1 rounded-full border border-amber-500/40">
                  🔥 Sizzling Hot on Reel
                </span>
              </div>

              {/* Bottom Caption & Link */}
              <div className="absolute bottom-4 left-4 right-4 space-y-3 z-10">
                <p className="text-xs text-white leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  {activeReel.quote}
                </p>

                <a
                  href="https://www.instagram.com/vibecheck.cafe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-rose-600 text-white text-xs font-bold py-2.5 rounded-xl shadow-md"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Watch Original Reel on Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
