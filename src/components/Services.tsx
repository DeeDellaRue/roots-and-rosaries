/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { Eye, Flame, Compass, Sparkles, Calendar, Users, HelpCircle, ArrowDown } from "lucide-react";
import { motion } from "motion/react";

interface ServicesProps {
  onSelectReadingPackage: (pkgId: string) => void;
  onSelectConsultation: (initialNature?: string) => void;
}

export default function Services({ onSelectReadingPackage, onSelectConsultation }: ServicesProps) {
  const readingPackagesRef = useRef<HTMLDivElement>(null);

  const scrollToReadingPackages = (e: React.MouseEvent) => {
    e.preventDefault();
    readingPackagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToAltar = (e: React.MouseEvent) => {
    e.preventDefault();
    const altarSection = document.getElementById("altar");
    if (altarSection) {
      altarSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-charcoal/50 border-y border-white/5 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6 text-parchment">
              Sacred Services
            </h2>
            {/* Visual separator rule */}
            <div className="h-[1px] w-20 bg-antique-gold mx-auto mb-6"></div>
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.45em] text-antique-gold/70 font-semibold">
              Discernment • Devotion • Direction
            </p>
          </motion.div>
        </div>

        {/* 3 Overview Columns (Hybrid Model) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 mb-28">
          
          {/* Column 1: Divination & Spiritual Guidance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative flex flex-col justify-between border border-white/5 bg-deep-black/45 p-10 md:p-12 hover:border-antique-gold/25 transition-all duration-700 hover:shadow-[0_15px_40px_rgba(10,10,10,0.8)]"
          >
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-antique-gold/0 group-hover:border-antique-gold/30 transition-all duration-500"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-antique-gold/0 group-hover:border-antique-gold/30 transition-all duration-500"></div>

            <div>
              <div className="inline-flex items-center justify-center p-4 bg-charcoal border border-white/5 group-hover:border-haint-blue/40 duration-500 rounded-[2px] mb-8 transition-transform group-hover:scale-105">
                <Eye className="w-6 h-6 text-haint-blue" />
              </div>

              <span className="block text-[8px] tracking-[0.3em] uppercase text-antique-gold font-bold mb-3">
                CROSSROADS • DIRECTION • INTUITION
              </span>

              <h3 className="font-serif text-2xl mb-5 text-parchment group-hover:text-antique-gold transition-colors duration-400">
                Divination & Spiritual Guidance
              </h3>

              <p className="text-xs text-parchment/70 leading-relaxed mb-8 font-light">
                Choose the reading format and level of depth that best fits your needs. Methods may include cartomancy, intuitive sight, rosary divination, charm casting, tea-leaf reading, dowsing, ancestral guidance, or other specialized methods selected as guided.
              </p>

              <ul className="text-[11px] space-y-3 mb-10 text-parchment/50 border-t border-white/5 pt-6">
                <li className="flex items-start gap-2">
                  <span className="text-antique-gold mt-1">•</span>
                  <span>Quick Clarity Reading</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-antique-gold mt-1">•</span>
                  <span>Detailed Spiritual Insight Reading</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-antique-gold mt-1">•</span>
                  <span>Live Spiritual Consultation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-antique-gold mt-1">•</span>
                  <span>Ancestral Guidance Reading</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
              <div className="flex justify-end items-center px-1">
                <span className="text-xs uppercase tracking-widest text-haint-blue font-bold">From $33</span>
              </div>

              <a
                href="#reading-packages"
                onClick={scrollToReadingPackages}
                className="w-full flex items-center justify-center gap-2 text-center bg-burgundy hover:bg-antique-gold hover:text-deep-black text-parchment text-[11px] font-bold uppercase tracking-[0.25em] h-14 border border-antique-gold transition-all duration-500 hover:shadow-[0_4px_15px_rgba(114,202,226,0.15)] rounded-[2px]"
              >
                View Reading Packages <ArrowDown className="w-3 h-3 animate-bounce" />
              </a>
            </div>
          </motion.div>

          {/* Column 2: Ritual & Rootwork */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="group relative flex flex-col justify-between border border-white/5 bg-deep-black/45 p-10 md:p-12 hover:border-antique-gold/25 transition-all duration-700 hover:shadow-[0_15px_40px_rgba(10,10,10,0.8)]"
          >
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-antique-gold/0 group-hover:border-antique-gold/30 transition-all duration-500"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-antique-gold/0 group-hover:border-antique-gold/30 transition-all duration-500"></div>

            <div>
              <div className="inline-flex items-center justify-center p-4 bg-charcoal border border-white/5 group-hover:border-haint-blue/40 duration-500 rounded-[2px] mb-8 transition-transform group-hover:scale-105">
                <Sparkles className="w-6 h-6 text-haint-blue" />
              </div>

              <span className="block text-[8px] tracking-[0.3em] uppercase text-antique-gold font-bold mb-3">
                CLEANSING • PROTECTION • ROAD OPENING
              </span>

              <h3 className="font-serif text-2xl mb-5 text-parchment group-hover:text-antique-gold transition-colors duration-400">
                Ritual & Rootwork
              </h3>

              <p className="text-xs text-parchment/70 leading-relaxed mb-8 font-light">
                Because ritual and rootwork services vary in complexity, materials, preparation, and duration, a consultation is required before pricing is provided.
              </p>

              <ul className="text-[11px] space-y-3 mb-10 text-parchment/50 border-t border-white/5 pt-6">
                <li className="flex items-start gap-2">
                  <span className="text-antique-gold mt-1">•</span>
                  <span>Spiritual cleansing baths, washes, and floor washes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-antique-gold mt-1">•</span>
                  <span>Protection work for the person, home, or spiritual space</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-antique-gold mt-1">•</span>
                  <span>Road-opening and obstacle-removal work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-antique-gold mt-1">•</span>
                  <span>Personalized rootwork selected for your specific intentions</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
              <div className="flex justify-end items-center px-1">
                <span className="text-xs uppercase tracking-widest text-haint-blue font-bold">Custom pricing after consultation</span>
              </div>

              <p className="text-[10px] text-parchment/40 italic leading-relaxed text-center px-1">
                “Custom pricing after consultation.”
              </p>

              <button
                onClick={() => onSelectConsultation("Custom Ritual & Rootwork")}
                className="w-full flex items-center justify-center text-center bg-burgundy hover:bg-antique-gold hover:text-deep-black text-parchment text-[11px] font-bold uppercase tracking-[0.25em] h-14 border border-antique-gold transition-all duration-500 hover:shadow-[0_4px_15px_rgba(114,202,226,0.15)] rounded-[2px]"
              >
                Request a Consultation
              </button>
            </div>
          </motion.div>

          {/* Column 3: Candle & Petition Work */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group relative flex flex-col justify-between border border-white/5 bg-deep-black/45 p-10 md:p-12 hover:border-antique-gold/25 transition-all duration-700 hover:shadow-[0_15px_40px_rgba(10,10,10,0.8)]"
          >
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-antique-gold/0 group-hover:border-antique-gold/30 transition-all duration-500"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-antique-gold/0 group-hover:border-antique-gold/30 transition-all duration-500"></div>

            <div>
              <div className="inline-flex items-center justify-center p-4 bg-charcoal border border-white/5 group-hover:border-haint-blue/40 duration-500 rounded-[2px] mb-8 transition-transform group-hover:scale-105">
                <Flame className="w-6 h-6 text-haint-blue" />
              </div>

              <span className="block text-[8px] tracking-[0.3em] uppercase text-antique-gold font-bold mb-3">
                ALTAR LIGHTS • DEVOTION • FOCUS
              </span>

              <h3 className="font-serif text-2xl mb-5 text-parchment group-hover:text-antique-gold transition-colors duration-400">
                Candle & Petition Work
              </h3>

              <div className="space-y-4 text-xs font-light text-parchment/70 leading-relaxed mb-6">
                <div>
                  <h4 className="font-semibold text-antique-gold uppercase tracking-wider text-[10px] mb-1">Community Altar Light — $7</h4>
                  <p>Submit a prayer or petition to be included in an upcoming community altar-lighting service.</p>
                </div>
                
                <div className="border-t border-white/5 pt-4">
                  <h4 className="font-semibold text-antique-gold uppercase tracking-wider text-[10px] mb-1">Custom Candle Work</h4>
                  <p>“Individual candle services prepared for a specific intention, petition, or spiritual need.”</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
              <div className="flex justify-end items-center px-1">
                <span className="text-xs uppercase tracking-widest text-haint-blue font-bold">$7 / Custom pricing after consultation</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="#altar"
                  onClick={handleScrollToAltar}
                  className="flex items-center justify-center text-center bg-burgundy hover:bg-antique-gold hover:text-deep-black text-parchment text-[9px] font-bold uppercase tracking-wider h-11 border border-antique-gold transition-all duration-500 rounded-[2px]"
                >
                  Submit a Petition
                </a>
                <button
                  onClick={() => onSelectConsultation("Custom Candle Work")}
                  className="flex items-center justify-center text-center bg-charcoal hover:bg-antique-gold hover:text-deep-black text-parchment text-[9px] font-bold uppercase tracking-wider h-11 border border-white/10 hover:border-antique-gold transition-all duration-500 rounded-[2px]"
                >
                  Request Custom Candle Work
                </button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ----------------- SUBSECTION: DIVINATION & SPIRITUAL GUIDANCE PACKAGES ----------------- */}
        <div ref={readingPackagesRef} id="reading-packages" className="pt-16 border-t border-white/5 scroll-mt-24">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h3 className="text-3xl font-serif italic text-antique-gold mb-4">
              Divination & Spiritual Guidance Packages
            </h3>
            <p className="text-xs text-parchment/70 leading-relaxed font-light">
              Choose the reading format and level of depth that best fits your needs. Methods may include cartomancy, intuitive sight, rosary divination, charm casting, tea-leaf reading, dowsing, ancestral guidance, or other specialized methods selected as guided.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            {/* Package 1 */}
            <div className="bg-deep-black/60 border border-white/5 hover:border-antique-gold/30 p-6 rounded-[2px] flex flex-col justify-between transition-all duration-500 relative group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] uppercase tracking-wider text-haint-blue font-bold">Package 1</span>
                  <span className="text-lg font-serif text-antique-gold font-bold">$33</span>
                </div>
                
                <div>
                  <h4 className="font-serif text-lg text-parchment group-hover:text-antique-gold transition-colors duration-300">
                    Quick Clarity Reading
                  </h4>
                  <p className="text-[11px] text-parchment/65 leading-relaxed mt-2 font-light">
                    “A focused reading for one clearly written question or one central situation.”
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-2 text-[10px] text-parchment/50 font-light">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-semibold text-parchment">1 question</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-semibold text-parchment text-right">Audio response or written message</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Time:</span>
                    <span className="font-semibold text-parchment">3–5 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Follow-ups:</span>
                    <span className="font-semibold text-parchment">Not included</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-2">
                {/* 
                  Future Secure Payment / Checkout URL Integration:
                  To add direct payment/checkout (e.g. Stripe checkout, PayPal, Square), 
                  wrap or replace this button with the secure payment gateway link, 
                  or redirect the user after form submission.
                */}
                <button
                  onClick={() => onSelectReadingPackage("quick")}
                  className="w-full h-11 flex items-center justify-center text-center bg-burgundy hover:bg-antique-gold hover:text-deep-black text-parchment text-[10px] font-bold uppercase tracking-wider border border-antique-gold transition-all duration-300 rounded-[2px]"
                >
                  Choose Quick Clarity
                </button>
              </div>
            </div>

            {/* Package 2 */}
            <div className="bg-deep-black/60 border border-white/5 hover:border-antique-gold/30 p-6 rounded-[2px] flex flex-col justify-between transition-all duration-500 relative group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] uppercase tracking-wider text-haint-blue font-bold">Package 2</span>
                  <span className="text-lg font-serif text-antique-gold font-bold">$66</span>
                </div>
                
                <div>
                  <h4 className="font-serif text-lg text-parchment group-hover:text-antique-gold transition-colors duration-300">
                    Detailed Spiritual Insight Reading
                  </h4>
                  <p className="text-[11px] text-parchment/65 leading-relaxed mt-2 font-light">
                    “A more in-depth reading for a layered situation, recurring pattern, crossroads, or several closely related concerns.”
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-2 text-[10px] text-parchment/50 font-light">
                  <div className="flex justify-between">
                    <span>Questions/Areas:</span>
                    <span className="font-semibold text-parchment text-right">Up to 3 related questions or 1 complex situation</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-semibold text-parchment text-right">Audio response, written response, or prerecorded video</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Time:</span>
                    <span className="font-semibold text-parchment">5–7 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Follow-ups:</span>
                    <span className="font-semibold text-parchment">1 brief clarification included</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-2">
                {/* 
                  Future Secure Payment / Checkout URL Integration:
                  To add direct payment/checkout (e.g. Stripe checkout, PayPal, Square), 
                  wrap or replace this button with the secure payment gateway link, 
                  or redirect the user after form submission.
                */}
                <button
                  onClick={() => onSelectReadingPackage("detailed")}
                  className="w-full h-11 flex items-center justify-center text-center bg-burgundy hover:bg-antique-gold hover:text-deep-black text-parchment text-[10px] font-bold uppercase tracking-wider border border-antique-gold transition-all duration-300 rounded-[2px]"
                >
                  Choose Detailed Insight
                </button>
              </div>
            </div>

            {/* Package 3 */}
            <div className="bg-deep-black/60 border border-white/5 hover:border-antique-gold/30 p-6 rounded-[2px] flex flex-col justify-between transition-all duration-500 relative group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] uppercase tracking-wider text-haint-blue font-bold">Package 3</span>
                  <span className="text-lg font-serif text-antique-gold font-bold">$77</span>
                </div>
                
                <div>
                  <h4 className="font-serif text-lg text-parchment group-hover:text-antique-gold transition-colors duration-300">
                    Ancestral Guidance Reading
                  </h4>
                  <p className="text-[11px] text-parchment/65 leading-relaxed mt-2 font-light">
                    “A focused reading centered on ancestral patterns, guidance, support, inherited themes, and spiritual connection.”
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-2 text-[10px] text-parchment/50 font-light">
                  <div className="flex justify-between">
                    <span>Intention:</span>
                    <span className="font-semibold text-parchment text-right">1 central ancestral inquiry</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-semibold text-parchment text-right">Audio or written response</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Time:</span>
                    <span className="font-semibold text-parchment">5–7 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Follow-ups:</span>
                    <span className="font-semibold text-parchment">1 brief clarification included</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-2">
                {/* 
                  Future Secure Payment / Checkout URL Integration:
                  To add direct payment/checkout (e.g. Stripe checkout, PayPal, Square), 
                  wrap or replace this button with the secure payment gateway link, 
                  or redirect the user after form submission.
                */}
                <button
                  onClick={() => onSelectReadingPackage("ancestral")}
                  className="w-full h-11 flex items-center justify-center text-center bg-burgundy hover:bg-antique-gold hover:text-deep-black text-parchment text-[10px] font-bold uppercase tracking-wider border border-antique-gold transition-all duration-300 rounded-[2px]"
                >
                  Choose Ancestral Guidance
                </button>
                <p className="text-[10px] text-parchment/40 italic font-light leading-normal mt-4 pt-4 border-t border-white/5">
                  “This service explores ancestral guidance and patterns through divination and intuitive spiritual practice. It does not guarantee direct communication with a specific deceased loved one.”
                </p>
              </div>
            </div>

            {/* Package 4 */}
            <div className="bg-deep-black/60 border border-white/5 hover:border-antique-gold/30 p-6 rounded-[2px] flex flex-col justify-between transition-all duration-500 relative group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] uppercase tracking-wider text-haint-blue font-bold">Package 4</span>
                  <span className="text-lg font-serif text-antique-gold font-bold">$99</span>
                </div>
                
                <div>
                  <h4 className="font-serif text-lg text-parchment group-hover:text-antique-gold transition-colors duration-300">
                    Live Spiritual Consultation
                  </h4>
                  <p className="text-[11px] text-parchment/65 leading-relaxed mt-2 font-light">
                    “A private 45-minute live session for real-time spiritual guidance, divination, questions, and discussion.”
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-2 text-[10px] text-parchment/50 font-light">
                  <div className="flex justify-between">
                    <span>Session Length:</span>
                    <span className="font-semibold text-parchment">45 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform:</span>
                    <span className="font-semibold text-parchment">Google Meet</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Topics/Questions:</span>
                    <span className="font-semibold text-parchment text-right">Up to 3 primary questions or areas of focus</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rescheduling:</span>
                    <span className="font-semibold text-parchment text-right">One reschedule allowed with at least 24 hours’ notice</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Follow-up:</span>
                    <span className="font-semibold text-parchment text-right">No written report included</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-2">
                {/* 
                  Future Secure Payment / Checkout URL Integration:
                  To add direct payment/checkout (e.g. Stripe checkout, PayPal, Square), 
                  wrap or replace this button with the secure payment gateway link, 
                  or redirect the user after form submission.
                */}
                <button
                  onClick={() => onSelectReadingPackage("live")}
                  className="w-full h-11 flex items-center justify-center text-center bg-burgundy hover:bg-antique-gold hover:text-deep-black text-parchment text-[10px] font-bold uppercase tracking-wider border border-antique-gold transition-all duration-300 rounded-[2px]"
                >
                  Request a Live Consultation
                </button>
              </div>
            </div>

          </div>

          {/* Policy, Boundaries and Expectations Notes */}
          <div className="max-w-4xl mx-auto mt-16 bg-black/40 border border-white/5 p-8 md:p-10 rounded-[2px] space-y-6 text-left shadow-2xl">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-antique-gold text-center mb-4 border-b border-white/5 pb-4">
              Boundaries & Expectations
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-[11px] text-parchment/75 leading-relaxed font-light">
              <div className="space-y-4">
                <div className="flex items-start gap-2.5">
                  <span className="text-antique-gold mt-1 shrink-0">•</span>
                  <span>Delivery times begin after payment and receipt of a complete question.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-antique-gold mt-1 shrink-0">•</span>
                  <span>Business days do not include weekends or holidays.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-antique-gold mt-1 shrink-0">•</span>
                  <span>Additional questions require an additional service.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-antique-gold mt-1 shrink-0">•</span>
                  <span>Readings are nonrefundable once preparation or delivery has begun.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-antique-gold mt-1 shrink-0">•</span>
                  <span>Missed live appointments are not refundable.</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-2.5">
                  <span className="text-antique-gold mt-1 shrink-0">•</span>
                  <span>One live-session reschedule is allowed with at least 24 hours’ notice.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-antique-gold mt-1 shrink-0">•</span>
                  <span>Madame Della Rue may decline requests involving medical diagnosis, legal outcomes, gambling, pregnancy, death predictions, coercion, harm, or guaranteed results.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-antique-gold mt-1 shrink-0">•</span>
                  <span>Readings provide spiritual insight and guidance but do not replace medical, legal, financial, or mental-health care.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-antique-gold mt-1 shrink-0">•</span>
                  <span>The divination method used is selected according to the nature of the request and the spiritual guidance received.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
