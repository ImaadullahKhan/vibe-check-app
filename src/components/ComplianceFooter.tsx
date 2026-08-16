import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Instagram, 
  Flame, 
  FileText, 
  Award, 
  Lock, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { VibeCheckLogo } from './VibeCheckLogo';

interface ComplianceFooterProps {
  onOpenAdmin: () => void;
  onWhatsAppClick: (source: string) => void;
}

export const ComplianceFooter: React.FC<ComplianceFooterProps> = ({
  onOpenAdmin,
  onWhatsAppClick
}) => {
  return (
    <footer id="compliance-footer" className="bg-slate-950 border-t border-slate-800/90 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info & Address */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 sm:w-16 sm:h-16 aspect-square rounded-full bg-slate-950 border-2 border-slate-700/80 shadow-xl flex items-center justify-center p-2 ring-2 ring-rose-500/25 shrink-0 overflow-hidden">
                <VibeCheckLogo variant="full" className="w-full h-full aspect-square" subtextColor="white" />
              </div>
              <div>
                <span className="font-['Outfit',sans-serif] font-black text-lg text-white tracking-tight block">
                  VIBE CHECK
                </span>
                <p className="text-[11px] text-slate-400">Malakpet, Hyderabad</p>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md">
              Hyderabad&apos;s premier artisanal smash burger destination in Malakpet. Serving gourmet smashed lamb & beef, fiery Nashville hot chicken, pressed brioche &apos;wiches, signature fries, thick milkshakes, and sparkling fruit coolers.
            </p>

            <div className="space-y-2 pt-1 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Registered Address:</strong><br />
                  Lower Ground, Jamuna Towers, Shop No. 1, 2 & 3, 16-2-669, Judges Colony, Malakpet, Hyderabad, Telangana - 500008
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 pl-6">
                <span>Premises: Shop 17/B, Nallagonda X Road, Malakpet, Hyderabad</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Proprietor / FBO: <strong className="text-white">Mohammed Mukarram Mohiuddin</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href="https://wa.me/919505021177" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => onWhatsAppClick('footer_phone')}
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  Direct WhatsApp: +91 9505021177
                </a>
              </div>
            </div>
          </div>

          {/* Statutory & Food Safety Compliance Box */}
          <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-white">Statutory & Govt. Compliances</span>
            </div>

            <div className="space-y-3 text-xs">
              
              {/* FSSAI */}
              <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-900/50 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white">FSSAI Food Safety Registration</span>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-1.5 py-0.5 rounded">Active</span>
                  </div>
                  <p className="font-mono text-emerald-300 text-xs mt-0.5">23626034002366</p>
                  <p className="text-[10px] text-slate-400">Validity: Valid through 29-06-2027</p>
                </div>
              </div>

              {/* GHMC Trade License */}
              <div className="p-2.5 rounded-xl bg-slate-950 border border-amber-900/50 flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white">GHMC Trade License</span>
                    <span className="text-[10px] text-amber-400 font-semibold bg-amber-950 px-1.5 py-0.5 rounded">Circle 27</span>
                  </div>
                  <p className="font-mono text-amber-300 text-xs mt-0.5">TR-0135-051-0026</p>
                  <p className="text-[10px] text-slate-400">Jurisdiction: Circle 27 - Malakpet, Hyderabad</p>
                </div>
              </div>

              {/* Telangana Labour */}
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                <Award className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200">Telangana Labour Dept. Reg</span>
                  <p className="font-mono text-slate-300 text-xs mt-0.5">SEA/HYD/ALO/05/1361971/2026</p>
                  <p className="text-[10px] text-slate-400">Nature of Business: Burgers Shop</p>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Navigation & Social */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Quick Links & Admin
            </h4>

            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu-catalog" className="text-slate-400 hover:text-rose-400 transition-colors">
                  Full 34-Item Menu Catalog
                </a>
              </li>
              <li>
                <a href="#how-to-order" className="text-slate-400 hover:text-rose-400 transition-colors">
                  Delivery & Rapido Pickup Guide
                </a>
              </li>
              <li>
                <a href="#party-orders" className="text-slate-400 hover:text-rose-400 transition-colors">
                  Party Platters & Bulk Catering
                </a>
              </li>
              <li>
                <a href="#brand-story" className="text-slate-400 hover:text-rose-400 transition-colors">
                  Caramelized Smash Story
                </a>
              </li>
              <li>
                <a href="#instagram-reels" className="text-slate-400 hover:text-rose-400 transition-colors">
                  Customer Instagram Reels
                </a>
              </li>
            </ul>

            <div className="pt-2 space-y-2">
              <a
                href="https://www.instagram.com/vibecheck.cafe/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-rose-300 hover:text-rose-200 bg-rose-950/60 border border-rose-800/60 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors"
              >
                <Instagram className="w-4 h-4 text-rose-400" />
                <span>@vibecheck.cafe</span>
              </a>

              <div>
                <button
                  id="footer-admin-btn"
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-400 text-xs py-1.5 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Analytics Portal (PIN: vibe2026)</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} VIBE CHECK. All Rights Reserved. Artisanal Smash Burgers & Loaded Treats in Malakpet, Hyderabad.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Kitchen: 12:00 PM – 2:00 AM Daily</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
