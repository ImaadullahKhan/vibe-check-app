import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Sparkles,
  PhoneCall,
  MessageCircle,
  Instagram,
  UploadCloud
} from 'lucide-react';
import { VibeCheckLogo } from './VibeCheckLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onWhatsAppClick: (source: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onWhatsAppClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu Catalog', href: '#menu-catalog' },
    { name: 'How to Order', href: '#how-to-order' },
    { name: 'Party Catering', href: '#party-orders' },
    { name: 'Brand Story', href: '#brand-story' },
    { name: 'Instagram Reels', href: '#instagram-reels' },
  ];

  return (
    <header 
      id="main-navbar" 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3' 
          : 'bg-slate-950/70 backdrop-blur-sm border-b border-slate-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#" 
          id="brand-logo-link"
          className="flex items-center gap-3.5 group focus:outline-none py-1"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 aspect-square rounded-full bg-slate-950 border-2 border-slate-700/80 shadow-2xl shadow-black/70 flex items-center justify-center p-2 group-hover:border-rose-500 group-hover:shadow-rose-950/60 group-hover:scale-105 transition-all duration-200 ring-2 ring-rose-500/25 overflow-hidden">
            <VibeCheckLogo variant="full" className="w-full h-full aspect-square flex items-center justify-center" subtextColor="white" />
          </div>
          <div className="hidden sm:block">
            <span className="font-['Outfit',sans-serif] font-black tracking-tight text-xl text-white block leading-none group-hover:text-rose-400 transition-colors">
              VIBE CHECK
            </span>
            <p className="text-xs tracking-wider text-slate-400 font-medium uppercase mt-1">
              Malakpet • Hyderabad
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-rose-400 transition-colors duration-150 relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-rose-500 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Cart Trigger */}
          <button
            id="navbar-cart-btn"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white px-3 sm:px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:border-slate-600"
            aria-label="View Order Cart"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline text-xs font-medium text-slate-300">View Cart</span>
            {cartCount > 0 && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-rose-600 to-rose-500 rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Direct WhatsApp CTA Button */}
          <a
            id="navbar-whatsapp-order-btn"
            href="https://wa.me/919505021177?text=Hi%20Vibe%20Check%20Smash%20Burgers%21%20I%20would%20like%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onWhatsAppClick('navbar_direct')}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-lg shadow-emerald-950/60 hover:shadow-emerald-900/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Order on WhatsApp</span>
          </a>

          {/* Mobile Hamburger Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-rose-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href="https://wa.me/919505021177?text=Hi%20Vibe%20Check%20Smash%20Burgers%21%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onWhatsAppClick('mobile_nav_whatsapp');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Order (+91 9505021177)</span>
            </a>

            <div className="flex items-center justify-between gap-2 pt-1">
              <a
                href="https://www.instagram.com/vibecheck.cafe/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 text-xs text-rose-300 bg-rose-950/40 py-2 rounded-lg border border-rose-900/50"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@vibecheck.cafe</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
