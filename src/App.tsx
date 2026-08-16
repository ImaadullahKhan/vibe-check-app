import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  ShoppingBag, 
  ArrowUp,
  Flame,
  PhoneCall
} from 'lucide-react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LogisticsGuide } from './components/LogisticsGuide';
import { MenuCatalog } from './components/MenuCatalog';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { PartyOrdersSection } from './components/PartyOrdersSection';
import { BrandStorySection } from './components/BrandStorySection';
import { InstagramReelsSection } from './components/InstagramReelsSection';
import { PaymentNoticeBanner } from './components/PaymentNoticeBanner';
import { ComplianceFooter } from './components/ComplianceFooter';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { ImageUploadModal } from './components/ImageUploadModal';
import { recordVisit, recordWhatsAppClick } from './utils/analytics';
import { initImageStore } from './utils/imageStore';
import { MenuItem, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState<MenuItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMediaUploadOpen, setIsMediaUploadOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize image store and record visitor session count
  useEffect(() => {
    initImageStore();
    recordVisit();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart quantity map for quick badge lookup
  const cartQuantities = React.useMemo(() => {
    const map: Record<number, number> = {};
    cartItems.forEach((ci) => {
      map[ci.item.id] = ci.quantity;
    });
    return map;
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Cart operations
  const handleAddToCart = (item: MenuItem, quantity: number, customization?: string) => {
    if (quantity <= 0) {
      handleRemoveItem(item.id);
      return;
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.item.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity,
          customization: customization !== undefined ? customization : updated[existingIndex].customization
        };
        return updated;
      } else {
        return [...prev, { item, quantity, customization }];
      }
    });
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleWhatsAppAction = (source: string, customDetails?: any) => {
    recordWhatsAppClick({
      type: customDetails?.type || 'direct_chat',
      items: customDetails?.items || `Action from ${source}`,
      totalAmount: customDetails?.totalAmount || 0,
      orderMode: customDetails?.orderMode || 'pickup',
      customerName: customDetails?.customerName || 'Customer Lead'
    });
  };

  const handleDirectItemWhatsApp = (item: MenuItem, quantity: number, notes: string) => {
    const message = `🍔 *ITEM INQUIRY: VIBE CHECK*
━━━━━━━━━━━━━━━━━━━
Item: ${quantity}x ${item.name} (₹${item.price * quantity})
${notes ? `Note: ${notes}\n` : ''}
📍 Location: Jamuna Towers, Malakpet, Hyderabad
Please confirm availability and prep time!`;

    recordWhatsAppClick({
      type: 'item_modal',
      items: `${quantity}x ${item.name}`,
      totalAmount: item.price * quantity,
      orderMode: 'pickup'
    });

    window.open(`https://wa.me/919505021177?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToParty = () => {
    const el = document.getElementById('party-orders');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-rose-500 selection:text-white">
      
      {/* 1. Top Announcement & Compliance Bar */}
      <AnnouncementBar />

      {/* 2. Header & Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenMediaUpload={() => setIsMediaUploadOpen(true)}
        onWhatsAppClick={(src) => handleWhatsAppAction(src)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 3. Hero Section */}
        <HeroSection
          onExploreMenu={scrollToMenu}
          onBookParty={scrollToParty}
          onWhatsAppClick={(src) => handleWhatsAppAction(src)}
        />

        {/* 4. Multi-Channel Ordering & Logistics Guide */}
        <LogisticsGuide
          onExploreMenu={scrollToMenu}
          onBookParty={scrollToParty}
          onWhatsAppClick={(src) => handleWhatsAppAction(src)}
        />

        {/* 5. Interactive 34-Item Menu Catalog */}
        <MenuCatalog
          onSelectItem={(item) => setSelectedModalItem(item)}
          onAddToCart={handleAddToCart}
          cartQuantities={cartQuantities}
          onOpenCart={() => setIsCartOpen(true)}
          cartTotalCount={totalCartCount}
          onOpenMediaUpload={() => setIsMediaUploadOpen(true)}
        />

        {/* 6. Dedicated Party Orders & Catering Section */}
        <PartyOrdersSection
          onWhatsAppClick={(src) => handleWhatsAppAction(src)}
        />

        {/* Brand Story & Sizzle Craft */}
        <BrandStorySection />

        {/* 7. Instagram Social Proof & Customer Reels */}
        <InstagramReelsSection />

        {/* 8. WhatsApp 1-Click Ordering Preview & Payment Gateway Notice */}
        <PaymentNoticeBanner />

      </main>

      {/* 9. Business & Statutory Compliance Footer */}
      <ComplianceFooter
        onOpenAdmin={() => setIsAdminOpen(true)}
        onWhatsAppClick={(src) => handleWhatsAppAction(src)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="pointer-events-auto w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Quick Floating WhatsApp Chat Button */}
        <a
          id="floating-whatsapp-btn"
          href="https://wa.me/919505021177?text=Hi%20Vibe%20Check%20Smash%20Burgers%21%20I%20have%20a%20query%20about%20the%20menu."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleWhatsAppAction('floating_whatsapp')}
          aria-label="Chat on WhatsApp"
          className="pointer-events-auto flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-4 py-3 rounded-full shadow-2xl shadow-emerald-950/80 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-emerald-400/40"
        >
          <MessageCircle className="w-5 h-5 fill-white shrink-0" />
          <span className="hidden sm:inline">WhatsApp Order (+91 9505021177)</span>
        </a>

      </div>

      {/* Item Detail & Customization Modal */}
      <ItemDetailModal
        item={selectedModalItem}
        onClose={() => setSelectedModalItem(null)}
        onAddToCart={handleAddToCart}
        onDirectWhatsApp={handleDirectItemWhatsApp}
      />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSubmitted={(orderData) => {
          handleWhatsAppAction('cart_checkout', orderData);
          handleClearCart();
          setIsCartOpen(false);
        }}
      />

      {/* 10. Admin Analytics Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* 11. Instant Menu Photos Uploader Modal */}
      <ImageUploadModal
        isOpen={isMediaUploadOpen}
        onClose={() => setIsMediaUploadOpen(false)}
      />

    </div>
  );
}
