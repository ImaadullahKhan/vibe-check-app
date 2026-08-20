import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { subscribeToImageStore } from '../utils/imageStore';
import { getItemImageCandidates } from '../utils/menuImageMapper';
import { Flame, Plus, Minus, Info, UtensilsCrossed } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  inCartCount: number;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onSelectItem: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  inCartCount,
  onAddToCart,
  onUpdateQuantity,
  onSelectItem,
}) => {
  const [storeVersion, setStoreVersion] = useState<number>(0);
  const { candidateUrls } = getItemImageCandidates(item);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState<number>(0);
  const [imageError, setImageError] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    return subscribeToImageStore(() => {
      setStoreVersion((v) => v + 1);
      setCurrentCandidateIndex(0);
      setImageError(false);
      setImageLoaded(false);
    });
  }, []);

  useEffect(() => {
    setCurrentCandidateIndex(0);
    setImageError(false);
    setImageLoaded(false);
  }, [item.id, storeVersion]);

  const currentSrc = candidateUrls[currentCandidateIndex];

  const handleImageError = () => {
    if (currentCandidateIndex < candidateUrls.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    } else {
      setImageError(true);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  return (
    <>
      {/* MOBILE LAYOUT (< sm) - Tiny Square Tile */}
      <div
        id={`menu-item-card-mobile-${item.id}`}
        onClick={() => onSelectItem(item)}
        className="sm:hidden flex flex-col items-center gap-1.5 cursor-pointer group"
      >
        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md relative">
          {!imageError && currentSrc ? (
            <img
              src={currentSrc}
              alt={item.name}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : null}

          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
              <UtensilsCrossed className="w-5 h-5 text-slate-700 mb-1" />
            </div>
          )}

          <div className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'} shadow-sm border border-slate-900`} />
        </div>
        
        <span className="text-[11px] text-center font-bold text-slate-300 leading-tight line-clamp-2 px-1 group-hover:text-rose-400 transition-colors">
          {item.name}
        </span>
      </div>

      {/* DESKTOP LAYOUT (>= sm) - Full Detailed Card */}
      <div
        id={`menu-item-card-desktop-${item.id}`}
        className="hidden sm:flex bg-slate-900/80 border border-slate-800/90 hover:border-rose-500/40 rounded-2xl overflow-hidden flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-rose-950/20 group relative"
      >
        <div>
          {/* Image Container */}
          <div
            className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center"
            onClick={() => onSelectItem(item)}
          >
            {!imageError && currentSrc ? (
              <img
                src={currentSrc}
                alt={item.name}
                loading="lazy"
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : null}
            {(!imageLoaded || imageError) && (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-500 mb-2 group-hover:text-rose-400 group-hover:border-rose-500/40 transition-colors">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-300 font-['Outfit',sans-serif]">{item.name}</p>
                <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                  {item.categoryLabel}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 pointer-events-none" />
            
            {/* Veg / Non-Veg Indicator */}
            <div className="absolute top-3 left-3 bg-slate-950/90 border border-slate-800 p-1 rounded shadow z-10">
              <div className={`w-3.5 h-3.5 border ${item.isVeg ? 'border-emerald-500' : 'border-rose-600'} flex items-center justify-center`}>
                <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-600'}`} />
              </div>
            </div>

            {/* Bestseller Badge */}
            {item.isBestseller && (
              <div className="absolute top-3 right-3 group-hover:opacity-0 transition-opacity bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow z-10">
                Bestseller
              </div>
            )}

            {/* Spicy meter */}
            {item.spicyLevel && item.spicyLevel > 0 ? (
              <div className="absolute bottom-2.5 left-3 flex items-center gap-0.5 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-rose-400 font-bold border border-rose-900/40 z-10">
                <Flame className="w-3 h-3 fill-rose-500 text-rose-500" />
                <span>
                  {item.spicyLevel === 3 ? 'Fiery 🔥' : item.spicyLevel === 2 ? 'Medium 🌶️' : 'Mild'}
                </span>
              </div>
            ) : null}

            {/* Info Quick View Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectItem(item);
              }}
              aria-label={`View details for ${item.name}`}
              className="absolute bottom-2.5 right-3 w-7 h-7 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-slate-300 flex items-center justify-center border border-slate-700 transition-colors z-10"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3
                onClick={() => onSelectItem(item)}
                className="text-base font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1 cursor-pointer"
              >
                {item.name}
              </h3>
              <span className="text-base font-black text-rose-400 shrink-0">
                ₹{item.price}
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
              {item.description}
            </p>
            {/* Quick item tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card Action Footer */}
        <div className="p-4 pt-0 mt-auto">
          {inCartCount === 0 ? (
            <button
              onClick={() => onAddToCart(item)}
              className="w-full bg-slate-800 hover:bg-rose-600 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200 border border-slate-700 hover:border-rose-500 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>ADD TO ORDER</span>
            </button>
          ) : (
            <div className="flex items-center justify-between bg-rose-950/60 border border-rose-600/60 rounded-xl p-1">
              <button
                onClick={() => onUpdateQuantity(item.id, -1)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-rose-900/60 text-rose-300 flex items-center justify-center transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-black text-white px-2">
                {inCartCount} in Cart
              </span>
              <button
                onClick={() => onUpdateQuantity(item.id, 1)}
                className="w-8 h-8 rounded-lg bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
