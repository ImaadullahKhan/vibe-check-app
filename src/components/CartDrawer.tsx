import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  ArrowRight, 
  Sparkles,
  Zap,
  Bike,
  Store,
  Clock,
  ShieldCheck,
  Percent,
  UtensilsCrossed
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { getItemImageCandidates } from '../utils/menuImageMapper';

const CartItemRowImage: React.FC<{ item: CartItem['item'] }> = ({ item }) => {
  const { candidateUrls } = getItemImageCandidates(item);
  const [index, setIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const src = candidateUrls[index];

  if (hasError || !src) {
    return (
      <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shrink-0">
        <UtensilsCrossed className="w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 shrink-0 overflow-hidden relative flex items-center justify-center">
      <img
        src={src}
        alt={item.name}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (index < candidateUrls.length - 1) {
            setIndex(index + 1);
          } else {
            setHasError(true);
          }
        }}
        className={`w-full h-full object-cover ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-slate-600">
          <UtensilsCrossed className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onClearCart: () => void;
  onProceedToWhatsApp: (orderData: {
    customerName: string;
    orderType: 'pickup' | 'rapido' | 'dinein';
    orderNotes: string;
    couponApplied: string | null;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onProceedToWhatsApp
}) => {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'pickup' | 'rapido' | 'dinein'>('pickup');
  const [orderNotes, setOrderNotes] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [nameError, setNameError] = useState(false);

  if (!isOpen) return null;

  // Pricing calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  
  // Coupon logic (VIBECHECK10 for 10% off above ₹400, MUKARRAM50 for ₹50 off)
  let discount = 0;
  if (appliedCoupon === 'VIBE10' && subtotal >= 350) {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'SMASH50' && subtotal >= 500) {
    discount = 50;
  }

  const packagingFee = subtotal > 0 ? 15 : 0;
  const finalTotal = Math.max(0, subtotal - discount + packagingFee);
  const totalItemCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    if (clean === 'VIBE10') {
      if (subtotal < 350) {
        setCouponError('Add items worth ₹350+ to apply VIBE10');
      } else {
        setAppliedCoupon('VIBE10');
        setCouponError(null);
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      }
    } else if (clean === 'SMASH50') {
      if (subtotal < 500) {
        setCouponError('Add items worth ₹500+ to apply SMASH50');
      } else {
        setAppliedCoupon('SMASH50');
        setCouponError(null);
        confetti({ particleCount: 35, spread: 70, origin: { y: 0.7 } });
      }
    } else {
      setCouponError('Invalid promo code. Try VIBE10 or SMASH50');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError(null);
  };

  const handleCheckout = () => {
    if (customerName.trim() === '') {
      setNameError(true);
      // Optional: you could scroll to the name input here if the page is long, 
      // but the drawer is small enough that the user will see the error.
      return;
    }

    const formattedItems = cartItems.map(ci => 
      `${ci.quantity}x ${ci.item.name} (₹${ci.item.price * ci.quantity})` + 
      (ci.customization ? `\n   ↳ "${ci.customization}"` : '')
    ).join('\n');

    onProceedToWhatsApp({
      customerName,
      orderType,
      orderNotes,
      couponApplied: appliedCoupon,
      items: formattedItems,
      totalAmount: finalTotal
    });
  };

  return (
    <div 
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end transition-opacity"
      onClick={onClose}
    >
      <div 
        id="cart-drawer-panel"
        className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-white">Your Cart</h3>
              <p className="text-xs text-slate-400">{totalItemCount} delicious item(s) selected</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                title="Clear Cart"
                className="text-slate-400 hover:text-rose-400 text-xs flex items-center gap-1 p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              id="close-cart-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Your Cart is Empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mb-6">
                Add juicy smash burgers, crispy &apos;wiches, loaded fries, and thick shakes to assemble your feast.
              </p>
              <button
                onClick={onClose}
                className="text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-rose-950/40"
              >
                Explore The Menu
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider px-1">
                  <span>Selected Dishes</span>
                  <span>Qty & Price</span>
                </div>

                {cartItems.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <CartItemRowImage item={cartItem.item} />
                      <div>
                        <h4 className="text-sm font-bold text-white line-clamp-1">
                          {cartItem.item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-rose-400">
                            ₹{cartItem.item.price * cartItem.quantity}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            (₹{cartItem.item.price} each)
                          </span>
                        </div>
                        {cartItem.customization && (
                          <p className="text-[11px] text-amber-400/90 italic line-clamp-1 mt-0.5">
                            &quot;{cartItem.customization}&quot;
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-xl p-0.5 shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                        className="w-7 h-7 rounded-lg hover:bg-rose-950/80 text-rose-300 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-extrabold text-white px-2">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                        className="w-7 h-7 rounded-lg hover:bg-slate-800 text-white flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Mode Radio Tabs */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  Select Order / Fulfillment Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      orderType === 'pickup'
                        ? 'bg-rose-950/80 border-rose-500 text-white shadow-md shadow-rose-950/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Store className={`w-4 h-4 mx-auto mb-1 ${orderType === 'pickup' ? 'text-rose-400' : 'text-slate-500'}`} />
                    <span className="block text-[11px] font-bold">Self Pickup</span>
                    <span className="block text-[9px] text-slate-500">10-15 mins</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('rapido')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      orderType === 'rapido'
                        ? 'bg-rose-950/80 border-rose-500 text-white shadow-md shadow-rose-950/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Bike className={`w-4 h-4 mx-auto mb-1 ${orderType === 'rapido' ? 'text-rose-400' : 'text-slate-500'}`} />
                    <span className="block text-[11px] font-bold">Pickup Service</span>
                    <span className="block text-[9px] text-slate-500">Customer Book</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('dinein')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      orderType === 'dinein'
                        ? 'bg-rose-950/80 border-rose-500 text-white shadow-md shadow-rose-950/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Clock className={`w-4 h-4 mx-auto mb-1 ${orderType === 'dinein' ? 'text-rose-400' : 'text-slate-500'}`} />
                    <span className="block text-[11px] font-bold">Dine In</span>
                    <span className="block text-[9px] text-slate-500">Malakpet</span>
                  </button>

                </div>
              </div>

              {/* Customer Name & Notes */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-0.5 flex justify-between items-center">
                    <span>Your Name <span className="text-rose-400">*</span></span>
                  </label>
                  <p className="text-[10px] text-slate-400 mb-1.5 leading-tight">
                    Required to associate and fulfill your order upon arrival.
                  </p>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (nameError) setNameError(false);
                    }}
                    placeholder="e.g. Zaid / Ananya"
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      nameError ? 'border-rose-500' : 'border-slate-800 focus:border-rose-500'
                    }`}
                  />
                  {nameError && (
                    <p className="text-[10px] text-rose-400 font-medium mt-1 px-1">
                      Please enter your name to proceed.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Cooking & Packaging Notes
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Extra napkins, less spicy Nashville, pack tight"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-3.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between text-xs bg-emerald-950/50 border border-emerald-700/50 rounded-xl p-2.5">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>{appliedCoupon} Applied! (-₹{discount})</span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs text-rose-400 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Percent className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          setCouponError(null);
                        }}
                        placeholder="Promo Code (Try VIBE10)"
                        className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 uppercase focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-400 font-medium mt-1.5 px-1">{couponError}</p>
                )}
              </div>

              {/* Bill Breakdown */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Items Total ({totalItemCount} items)</span>
                  <span>₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount Coupon ({appliedCoupon})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Eco-Packaging & Box Handling</span>
                  <span>₹{packagingFee}</span>
                </div>

                <div className="border-t border-slate-800/90 pt-2.5 mt-2 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Grand Total</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-rose-400">₹{finalTotal}</span>
                    <p className="text-[10px] text-slate-500 font-normal">Pay directly via UPI upon confirmation</p>
                  </div>
                </div>
              </div>

            </>
          )}

        </div>

        {/* Footer with WhatsApp CTA */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-3">
            
            <button
              id="proceed-to-whatsapp-btn"
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Send Order to WhatsApp • ₹{finalTotal}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 text-center">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> Instant Chef Response
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Direct UPI / QR Pay
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
