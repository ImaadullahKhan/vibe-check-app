import React, { useState } from 'react';
import { 
  Users, 
  PhoneCall, 
  MessageCircle, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  Gift,
  Clock,
  Send,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DateTimePicker } from './DateTimePicker';

interface PartyOrdersSectionProps {
  onWhatsAppClick: (source: string) => void;
}

export const PartyOrdersSection: React.FC<PartyOrdersSectionProps> = ({
  onWhatsAppClick
}) => {
  const [eventType, setEventType] = useState('Birthday Party');
  const [guestCount, setGuestCount] = useState('25-50 People');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [eventTime, setEventTime] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [fulfillmentMethod, setFulfillmentMethod] = useState('self-pickup');
  const [burgersCount, setBurgersCount] = useState(0);
  const [sugarRushCount, setSugarRushCount] = useState(0);
  const [sidesTendersCount, setSidesTendersCount] = useState(0);
  const [sandwichesCount, setSandwichesCount] = useState(0);
  const [spillsCoolersCount, setSpillsCoolersCount] = useState(0);
  const [notes, setNotes] = useState('');

  const handleCateringSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = eventDate 
      ? eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : 'Flexible';

    const orderDetails = `Event: ${eventType}, Guests: ${guestCount}
Date: ${formattedDate}, Time: ${eventTime || 'TBD'}
Items: ${burgersCount} Burgers, ${sugarRushCount} Sugar Rush, ${sidesTendersCount} Sides, ${sandwichesCount} Sandwiches, ${spillsCoolersCount} Coolers
Notes: ${notes || 'None'}`;

    const inquiryMessage = `Order type: Party Catering
Fulfillment method: ${fulfillmentMethod}
[Customer Name]: ${contactPerson.trim() || 'Valued Host'}
[Order Details]:
${orderDetails}`;

    const whatsappUrl = `https://wa.me/919505021177?text=${encodeURIComponent(inquiryMessage)}`;

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    onWhatsAppClick('party_catering_form');
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="party-orders" className="scroll-mt-24 py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800 relative overflow-hidden">
      
      {/* Glow */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950/80 text-rose-300 border border-rose-700/50">
            <Gift className="w-3.5 h-3.5 text-rose-400" />
            <span>Bulk Platters & Sliders Stations</span>
          </div>

          <h2 className="font-['Outfit',sans-serif] text-3xl sm:text-5xl font-black text-white tracking-tight">
            Host Your Next Event With <span className="text-rose-500">Vibe Check</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Custom bulk burger boxes, party platters, slider stations, and live beverage setups for birthdays, corporate lunches, and family gatherings across Hyderabad.
          </p>
        </div>

        {/* 2-Column Layout: Features & CTAs on Left, Interactive Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Catering Details & Quick Phone Contact */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5">
              <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Why Vibe Check Catering?</span>
              </h3>

              <div className="space-y-3.5 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white">Freshly Smashed on Schedule:</strong> We time our grilling so burgers arrive scorching hot with crispy edges intact.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white">Customized Veg & Non-Veg Ratios:</strong> Smashed Lamb, Nashville Hot Chicken, and Smoked Shroom options for diverse guest dietary needs.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white">Live Shake & Cooler Barrels:</strong> Thick Biscoff & Oreo shakes plus fizzy coolers sealed in spill-proof event containers.
                  </div>
                </div>
              </div>

              {/* Direct Call & Sales Officer Info */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <p className="text-xs text-slate-400 font-medium">
                  Direct Sales Representative & Proprietor:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  
                  {/* Call Direct */}
                  <a
                    id="catering-call-sales-btn"
                    href="tel:+919505021177"
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl border border-slate-700 transition-colors text-xs sm:text-sm"
                  >
                    <PhoneCall className="w-4 h-4 text-amber-400" />
                    <span>Call +91 9505021177</span>
                  </a>

                  {/* Direct WhatsApp Chat */}
                  <a
                    id="catering-whatsapp-sales-btn"
                    href="https://wa.me/919505021177?text=Hi%20Mohammed%20Mukarram%2C%20I%20want%20to%20discuss%20bulk%20party%20catering%20for%20an%20event."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onWhatsAppClick('catering_sales_desk')}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors text-xs sm:text-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp Desk</span>
                  </a>

                </div>
              </div>
            </div>

            {/* Statutory Compliance Badge */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <span className="font-semibold text-slate-200">FSSAI Certified Commercial Kitchen</span>
                <p className="text-[11px]">Strict temperature-controlled packaging & zero-contamination assurance.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Catering Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            <div className="mb-6">
              <h3 className="font-['Outfit',sans-serif] text-2xl font-bold text-white">
                Event Inquiry & Quote Builder
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill details below for an instant quote sent directly to our catering desk via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleCateringSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Event Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300" htmlFor="event-type-select">
                    Event Type
                  </label>
                  <select
                    id="event-type-select"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Corporate Lunch / Tech Team">Corporate Lunch / Tech Team</option>
                    <option value="Late Night Watch Party / Screening">Watch Party / Match Screening</option>
                    <option value="Family Gathering / Reunion">Family Gathering / Reunion</option>
                    <option value="College / Youth Fest">College / Youth Fest</option>
                    <option value="Other Event">Other Custom Event</option>
                  </select>
                </div>

                {/* Expected Guest Count */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300" htmlFor="guest-count-select">
                    Expected Guests
                  </label>
                  <select
                    id="guest-count-select"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="15-25 People (Mini Box)">15-25 Guests (Mini Box)</option>
                    <option value="25-50 People (Standard Feast)">25-50 Guests (Standard Feast)</option>
                    <option value="50-100 People (Mega Bash)">50-100 Guests (Mega Bash)</option>
                    <option value="100+ People (Custom Sliders Bar)">100+ Guests (Full Live Setup)</option>
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Contact Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300" htmlFor="catering-name-input">
                    Your Name / Organization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="catering-name-input"
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Mohammed Mukarram"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
                  />
                </div>

                {/* Fulfillment Method */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300" htmlFor="fulfillment-method-select">
                    Fulfillment Method
                  </label>
                  <select
                    id="fulfillment-method-select"
                    value={fulfillmentMethod}
                    onChange={(e) => setFulfillmentMethod(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="self-pickup">Self-pickup</option>
                    <option value="pickup service">Pickup service</option>
                    <option value="dine-in">Dine-in</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Contact Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300" htmlFor="catering-phone-input">
                    Contact Phone (WhatsApp) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="catering-phone-input"
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 95050 21177"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
                  />
                </div>

              </div>

              {/* Event Date & Time Custom Picker */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">
                  Target Date & Time
                </label>
                <DateTimePicker 
                  selectedDate={eventDate}
                  onDateSelect={setEventDate}
                  selectedTime={eventTime}
                  onTimeSelect={setEventTime}
                />
              </div>

              {/* Item Requirements */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-300">
                  Estimated Item Quantities
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Category Counters */}
                  {[
                    { label: 'Burgers', value: burgersCount, setter: setBurgersCount },
                    { label: 'Sugar Rush', value: sugarRushCount, setter: setSugarRushCount },
                    { label: 'Sides & Tenders', value: sidesTendersCount, setter: setSidesTendersCount },
                    { label: 'Sandwiches', value: sandwichesCount, setter: setSandwichesCount },
                    { label: 'Spills & Coolers', value: spillsCoolersCount, setter: setSpillsCoolersCount },
                  ].map((category, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2">
                      <span className="text-xs text-slate-300 font-semibold">{category.label}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => category.setter(Math.max(0, category.value - 1))}
                          className="w-6 h-6 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          -
                        </button>
                        <span className="text-xs text-white font-bold w-6 text-center">{category.value}</span>
                        <button
                          type="button"
                          onClick={() => category.setter(category.value + 1)}
                          className="w-6 h-6 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300" htmlFor="catering-notes-input">
                  Special Notes / Dietary Preferences
                </label>
                <textarea
                  id="catering-notes-input"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 10 Veg Smoked Shroom + 20 Lamb Smash, mild spice for kids..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-catering-inquiry-btn"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-xl shadow-rose-950/70 hover:scale-[1.01] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Catering Inquiry on WhatsApp</span>
                </button>
              </div>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
