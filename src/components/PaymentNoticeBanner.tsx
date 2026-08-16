import React from 'react';
import { 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';

export const PaymentNoticeBanner: React.FC = () => {
  return (
    <section id="payment-notice-section" className="py-12 bg-slate-900/50 border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Notice Text */}
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-700/50">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Seamless Checkout & Transparent Pricing</span>
              </div>

              <h3 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-extrabold text-white">
                Upcoming 1-Click WhatsApp Storefront & Payment Notice
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Direct in-app Payment Gateway (Razorpay / Instant Card / NetBanking) is coming soon in Q3 2026. Currently accepting <strong className="text-emerald-400">UPI on Delivery (GPay / PhonePe / Paytm)</strong> and <strong className="text-emerald-400">Direct WhatsApp Pay</strong> for all Malakpet kitchen orders.
              </p>
            </div>

            {/* Payment Mode Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
              
              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 shadow-sm">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>UPI Scan & Pay</span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 shadow-sm">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Pay</span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400">
                <CreditCard className="w-4 h-4 text-slate-500" />
                <span>Cards / NetBanking (Coming Soon)</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
