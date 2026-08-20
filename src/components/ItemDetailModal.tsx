import React, { useState, useEffect } from 'react';
import { 
  X, 
  Flame, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Sparkles, 
  AlertCircle,
  UtensilsCrossed
} from 'lucide-react';
import { MenuItem } from '../types';
import { getItemImageCandidates } from '../utils/menuImageMapper';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, notes: string) => void;
  onDirectWhatsApp: (item: MenuItem, quantity: number, notes: string) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
  onDirectWhatsApp
}) => {
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [hasImageError, setHasImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setCandidateIndex(0);
    setHasImageError(false);
    setImageLoaded(false);
    setQuantity(1);
    setCustomNote('');
  }, [item?.id]);

  if (!item) return null;

  const { candidateUrls } = getItemImageCandidates(item);
  const currentSrc = candidateUrls[candidateIndex];

  const handleImageError = () => {
    if (candidateIndex < candidateUrls.length - 1) {
      setCandidateIndex(candidateIndex + 1);
    } else {
      setHasImageError(true);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setHasImageError(false);
  };

  const handleAdd = () => {
    onAddToCart(item, quantity, customNote);
    onClose();
  };

  const handleWhatsApp = () => {
    onDirectWhatsApp(item, quantity, customNote);
  };

  return (
    <div 
      id="item-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-2 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-item-modal-btn"
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-28 sm:h-48 md:aspect-[16/9] w-full bg-slate-950 overflow-hidden rounded-t-2xl sm:rounded-t-3xl flex items-center justify-center">
          {!hasImageError && currentSrc ? (
            <img
              src={currentSrc}
              alt={item.name}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : null}

          {/* Clean blank card placeholder */}
          {(!imageLoaded || hasImageError) && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-2">
                <UtensilsCrossed className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-slate-300 font-['Outfit',sans-serif]">{item.name}</p>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">
                {item.categoryLabel}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent pointer-events-none"></div>

          {/* Top Badges */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2 z-10">
            {/* Veg / Non-Veg Indicator */}
            <div className={`flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold bg-slate-950/90 border ${
              item.isVeg ? 'border-emerald-500 text-emerald-400' : 'border-rose-500 text-rose-400'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              <span>{item.isVeg ? '100% VEG' : 'HALAL NON-VEG'}</span>
            </div>

            {item.isBestseller && (
              <div className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold bg-amber-500 text-slate-950">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>POPULAR</span>
              </div>
            )}
          </div>

          <div className="absolute bottom-2 left-3 right-3 sm:bottom-3 sm:left-4 sm:right-4 z-10">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-rose-400 font-bold drop-shadow-md">
              {item.categoryLabel}
            </span>
            <h3 className="font-['Outfit',sans-serif] text-xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-5">
          {/* Price and Spice */}
          <div className="flex items-center justify-between pb-2 sm:pb-4 border-b border-slate-800">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl font-black text-rose-400">₹{item.price}</span>
              <span className="text-[10px] sm:text-xs text-slate-400">Net price (Taxes incl.)</span>
            </div>

            {item.spicyLevel && item.spicyLevel > 0 ? (
              <div className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-rose-950/60 border border-rose-800/60 text-[10px] sm:text-xs font-bold text-rose-300">
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-rose-500 text-rose-500" />
                <span>
                  {item.spicyLevel === 3 ? 'Fiery 🔥' : item.spicyLevel === 2 ? 'Medium 🌶️' : 'Mild'}
                </span>
              </div>
            ) : (
              <div className="text-[10px] sm:text-xs text-slate-400 font-medium">Non-spicy</div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold mb-1 sm:mb-1.5">Description</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">{item.description}</p>
          </div>

          {/* Metadata Grid (Prep Time, Calories, Hygiene) */}
          <div className="grid grid-cols-3 gap-2 py-2 px-3 sm:py-3 sm:px-4 bg-slate-950/60 rounded-xl sm:rounded-2xl border border-slate-800/80">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] sm:text-xs mb-0.5">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                <span>Prep</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-white">{item.preparationTime || '8-10 mins'}</span>
            </div>

            <div className="text-center border-x border-slate-800">
              <div className="text-slate-400 text-[10px] sm:text-xs mb-0.5">Energy</div>
              <span className="text-[10px] sm:text-xs font-bold text-white">{item.calories || '520 kcal'}</span>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] sm:text-xs mb-0.5">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                <span>Std.</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-400">100% Fresh</span>
            </div>
          </div>

          {/* Allergens Alert */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400 bg-slate-800/40 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-700/40">
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span>Contains: <strong className="text-slate-300">{item.allergens.join(', ')}</strong></span>
            </div>
          )}

          {/* Special Instructions Input */}
          <div>
            <label htmlFor="custom-instruction" className="block text-[10px] sm:text-xs font-bold text-slate-300 mb-1 sm:mb-1.5">
              Special Instructions (Optional)
            </label>
            <input
              id="custom-instruction"
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Extra spicy, less mayo"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg sm:rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            
            {/* Quantity Controller */}
            <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-1 sm:w-36 shrink-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Decrease Quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-extrabold text-white text-sm px-3">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Increase Quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2 w-full">
              {/* Add to Cart Button */}
              <button
                id="modal-add-to-cart-btn"
                onClick={handleAdd}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm py-2.5 sm:py-3.5 px-3 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Add • ₹{item.price * quantity}</span>
              </button>

              {/* Direct WhatsApp Quick Order */}
              <button
                id="modal-direct-whatsapp-btn"
                onClick={handleWhatsApp}
                title="Order this single item directly on WhatsApp"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors shadow-lg shadow-emerald-950/50"
              >
                <MessageCircle className="w-4 h-4 sm:w-4 sm:h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
