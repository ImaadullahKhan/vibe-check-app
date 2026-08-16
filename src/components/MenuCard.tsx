import React, { useState, useEffect, useRef } from 'react';
import { MenuItem } from '../types';
import { getItemImageCandidates } from '../utils/menuImageMapper';
import { subscribeToImageStore, saveImageFile } from '../utils/imageStore';
import { Flame, Plus, Minus, Info, UtensilsCrossed, Camera, CheckCircle2, AlertCircle } from 'lucide-react';

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
  const { expectedPath, candidateUrls, config } = getItemImageCandidates(item);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState<number>(0);
  const [imageError, setImageError] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Subscribe to image store updates so all cards refresh immediately on upload
  useEffect(() => {
    return subscribeToImageStore(() => {
      setStoreVersion((v) => v + 1);
      setCurrentCandidateIndex(0);
      setImageError(false);
      setImageLoaded(false);
    });
  }, []);

  // Reset when item changes
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
      // Failed all candidates
      setImageError(true);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleQuickUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Save for this item's expected filename, ID, and item name
      if (config?.expectedFilename) {
        await saveImageFile(file, config.expectedFilename);
      }
      await saveImageFile(file, item.id);
      await saveImageFile(file, item.name);
    }
  };

  return (
    <div
      id={`menu-item-card-${item.id}`}
      className="bg-slate-900/80 border border-slate-800/90 hover:border-rose-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-rose-950/20 group relative"
    >
      <div>
        {/* Image Container */}
        <div
          className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center"
          onClick={() => onSelectItem(item)}
        >
          {/* Render image if available and loaded */}
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

          {/* Clean styled card placeholder if image is not loaded */}
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

          {/* Hidden quick file uploader input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleQuickUpload}
          />

          {/* Quick upload photo button on hover */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            title="Upload photo for this item"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/90 hover:bg-rose-600 hover:text-white border border-slate-800 p-1.5 rounded-lg text-slate-400 shadow z-20 flex items-center gap-1 text-[10px] font-bold"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Set Photo</span>
          </button>

          {/* Veg / Non-Veg Indicator */}
          <div className="absolute top-3 left-3 bg-slate-950/90 border border-slate-800 p-1 rounded shadow z-10">
            <div
              className={`w-3.5 h-3.5 border ${
                item.isVeg ? 'border-emerald-500' : 'border-rose-600'
              } flex items-center justify-center`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  item.isVeg ? 'bg-emerald-500' : 'bg-rose-600'
                }`}
              />
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
                {item.spicyLevel === 3
                  ? 'Fiery 🔥'
                  : item.spicyLevel === 2
                  ? 'Medium 🌶️'
                  : 'Mild'}
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
      <div className="p-4 pt-0">
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
              {inCartCount} in Bag
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
  );
};
