/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Flame, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Petition } from "../types";
import smokeBowlImg from "../assets/images/smoke-bowl-feeding-the-roots.jpeg";

// STRIPE CHECKOUT INTEGRATION: Replace this placeholder link with your actual Stripe Payment Link or checkout session URL here
const STRIPE_PAYMENT_LINK = "https://checkout.stripe.com/pay/placeholder_roots_and_rosaries_altar_light";

const CANDLE_COLORS_CONFIG: Record<string, { hex: string; bgClass: string; shadowColor: string }> = {
  "White": { hex: "#f5f5f0", bgClass: "bg-white", shadowColor: "rgba(245, 245, 240, 0.6)" },
  "Blue": { hex: "#5299cc", bgClass: "bg-sky-400", shadowColor: "rgba(82, 153, 204, 0.6)" },
  "Red": { hex: "#b91c1c", bgClass: "bg-red-700", shadowColor: "rgba(185, 28, 28, 0.6)" },
  "Yellow": { hex: "#eab308", bgClass: "bg-yellow-500", shadowColor: "rgba(234, 179, 8, 0.6)" },
  "Green": { hex: "#166534", bgClass: "bg-emerald-700", shadowColor: "rgba(22, 101, 52, 0.6)" },
  "Purple": { hex: "#6b21a8", bgClass: "bg-purple-800", shadowColor: "rgba(107, 33, 168, 0.6)" },
  "Allow Madame Della Rue to choose": { hex: "#c5a059", bgClass: "bg-amber-600", shadowColor: "rgba(197, 160, 89, 0.6)" }
};

interface VirtualAltarProps {
  onSubmitSuccess?: (data: { name: string; service: string }) => void;
}

export default function VirtualAltar({ onSubmitSuccess }: VirtualAltarProps) {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [altarName, setAltarName] = useState("");
  const [intentionCategory, setIntentionCategory] = useState("Protection and Peace");
  const [petitionText, setPetitionText] = useState("");
  const [preferredColor, setPreferredColor] = useState("White");
  const [consent, setConsent] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [latestPetition, setLatestPetition] = useState<Petition | null>(null);

  // Load only the user's actual submitted petitions from this session/device, filtering out any test or placeholder data
  useEffect(() => {
    const saved = localStorage.getItem("roots_user_altar_petitions");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter((pet: any) => {
            const nameLower = (pet.userName || "").toLowerCase();
            const textLower = (pet.intention || "").toLowerCase();
            const serviceLower = (pet.serviceType || "").toLowerCase();
            const isTest = 
              nameLower.includes("test") || 
              textLower.includes("test") || 
              nameLower.includes("dwayne") || 
              nameLower.includes("crenshaw") || 
              nameLower.includes("john doe") || 
              nameLower.includes("jane doe") || 
              nameLower.includes("marie laveau") || 
              nameLower.includes("lorem ipsum") || 
              nameLower.includes("placeholder") || 
              textLower.includes("dwayne") || 
              textLower.includes("crenshaw") || 
              textLower.includes("john doe") || 
              textLower.includes("jane doe") || 
              textLower.includes("marie laveau") || 
              textLower.includes("lorem ipsum") || 
              textLower.includes("placeholder") || 
              textLower.includes("guide me with your wisdom") ||
              serviceLower.includes("test");
            return !isTest;
          });
          setPetitions(cleaned);
          localStorage.setItem("roots_user_altar_petitions", JSON.stringify(cleaned));
        } else {
          setPetitions([]);
        }
      } catch (e) {
        setPetitions([]);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !petitionText || !consent) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://formspree.io/f/mvzjwlol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: "New Community Altar Light Petition",
          name,
          email,
          altar_name: altarName,
          intention_category: intentionCategory,
          petition: petitionText,
          candle_color: preferredColor,
          acknowledgment: consent ? "Yes" : "No",
          disclaimer: consent ? "Yes" : "No"
        })
      });

      if (response.ok) {
        if (onSubmitSuccess) {
          onSubmitSuccess({
            name,
            service: `Community Altar Light Petition: ${intentionCategory}`
          });
        }

        const selectedColorHex = CANDLE_COLORS_CONFIG[preferredColor]?.hex || "#f5f5f0";
        
        const newPetition: Petition = {
          id: `user-pet-${Date.now()}`,
          userName: altarName ? `${name} (For: ${altarName})` : name,
          email: email,
          serviceType: intentionCategory,
          intention: petitionText,
          createdAt: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
          }),
          status: "active",
          candleColor: selectedColorHex,
          candlesCount: 1
        };

        const updated = [newPetition, ...petitions];
        setPetitions(updated);
        localStorage.setItem("roots_user_altar_petitions", JSON.stringify(updated));
        setLatestPetition(newPetition);

        // Reset Form fields
        setName("");
        setEmail("");
        setAltarName("");
        setIntentionCategory("Protection and Peace");
        setPetitionText("");
        setPreferredColor("White");
        setConsent(false);
        
        setSuccess(true);
      } else {
        throw new Error("Formspree response not ok");
      }
    } catch (err) {
      setError("Your request could not be sent. Please try again or email Madame Della Rue directly at QueenDellaRue@iCloud.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeColorConfig = CANDLE_COLORS_CONFIG[preferredColor] || CANDLE_COLORS_CONFIG["White"];

  return (
    <section id="altar" className="py-24 md:py-32 bg-deep-black text-parchment px-6 md:px-12 border-b border-white/5 bg-lace">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif italic mb-4 text-parchment"
          >
            The Altar of Lights
          </motion.h2>
          <p className="text-xs uppercase tracking-[0.45em] text-antique-gold max-w-xl mx-auto leading-relaxed font-semibold">
            Set a Light. Send a Prayer.
          </p>
          <div className="h-[1px] w-24 bg-antique-gold/30 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Explanatory & Offer Details */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-6">
              <span className="inline-block bg-burgundy/40 border border-antique-gold/30 text-antique-gold text-[11px] font-bold tracking-[0.2em] px-4 py-1.5 uppercase rounded-[2px]">
                Community Altar Light — $7
              </span>
              
              <p className="text-sm text-parchment/80 leading-relaxed font-light">
                Submit your name, prayer, or petition to be included in an upcoming community altar-lighting service performed by Madame Della Rue. Choose the intention that best reflects your need, write your petition, and set a symbolic flame here on the virtual altar. Your digital candle represents a submitted intention. If accepted, physical altar work and prayer service will be prepared and lit during the next scheduled community service once payment is received.
              </p>
            </div>

            {/* What is Included Card */}
            <div className="bg-charcoal/30 border border-antique-gold/20 p-6 md:p-8 rounded-[2px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-antique-gold/[0.02] rounded-full blur-xl pointer-events-none" />
              <h4 className="font-serif text-sm tracking-wider text-antique-gold uppercase mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> What is included
              </h4>
              <ul className="space-y-3.5 text-xs text-parchment/70 font-light">
                <li className="flex items-start gap-3">
                  <span className="text-antique-gold mt-1">✦</span>
                  <span>Your name and petition placed on the client altar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-antique-gold mt-1">✦</span>
                  <span>Prayer over your stated intention</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-antique-gold mt-1">✦</span>
                  <span>Inclusion in the next scheduled community altar-lighting service</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-antique-gold mt-1">✦</span>
                  <span>Email confirmation after your petition has been received</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-antique-gold mt-1">✦</span>
                  <span>A general altar photograph when available</span>
                </li>
              </ul>
            </div>

            {/* Ritual Preparation Visual */}
            <div className="border border-antique-gold/20 p-2 bg-charcoal/40 rounded-[2px] shadow-lg">
              <img
                src={smokeBowlImg}
                className="w-full h-72 md:h-80 object-contain bg-black/60 contrast-105 brightness-95"
                referrerPolicy="no-referrer"
                alt="Ceremonial smoke bowl, hands of Madame Della Rue, and the ritual action representing feeding the roots"
              />
              <p className="text-[10px] uppercase tracking-widest text-antique-gold/70 text-center mt-2.5 font-light">
                Ritual Preparation & Feeding of the Roots
              </p>
            </div>

            {/* Sacred Policies & Disclaimers */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex gap-3">
                <AlertCircle className="w-4 h-4 text-antique-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="text-[10px] uppercase tracking-wider text-antique-gold font-bold">Scheduling & Urgency</h5>
                  <p className="text-[11px] text-parchment/65 leading-relaxed font-light">
                    “Petitions are gathered, reviewed, and prepared for scheduled community altar-lighting services after payment is received. This is not an immediate or emergency service.”
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <AlertCircle className="w-4 h-4 text-antique-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="text-[10px] uppercase tracking-wider text-antique-gold font-bold">Privacy Policy</h5>
                  <p className="text-[11px] text-parchment/65 leading-relaxed font-light">
                    “To protect the privacy of all petitioners, altar photographs will not display written petitions, full names, or identifying information.”
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <AlertCircle className="w-4 h-4 text-antique-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="text-[10px] uppercase tracking-wider text-antique-gold font-bold">Petition Content Policy</h5>
                  <p className="text-[11px] text-parchment/65 leading-relaxed font-light">
                    “Requests involving harm, coercion, domination, revenge, or interference with another person’s free will may be declined.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Form & Success / Visual Altar */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* The interactive card housing form or success state */}
            <div className="bg-charcoal/45 border border-antique-gold/25 p-8 md:p-10 shadow-2xl relative rounded-[2px]">
              <div className="absolute inset-2 border border-white/[0.02] pointer-events-none rounded-[2px]" />
              
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="relative z-10 text-center py-10 px-4 space-y-6"
                  >
                    <div className="mx-auto w-16 h-16 bg-burgundy/40 border border-antique-gold/50 flex items-center justify-center rounded-full text-antique-gold shadow-[0_0_15px_rgba(197,160,89,0.2)] animate-pulse">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif italic text-2xl text-antique-gold leading-tight">
                      Intention Submitted
                    </h3>
                    <p className="text-sm font-light tracking-wide text-parchment/90 leading-relaxed max-w-md mx-auto">
                      Your symbolic flame has been set on the virtual altar. This digital candle represents your submitted intention. Your request will be reviewed, and if accepted, you will receive payment instructions by email. Physical altar work and prayer service are confirmed only after payment is received.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSuccess(false)}
                      className="px-6 py-2.5 border border-antique-gold text-[9px] uppercase tracking-[0.3em] text-antique-gold hover:bg-antique-gold hover:text-deep-black transition-all duration-300 rounded-[2px] cursor-pointer"
                    >
                      Set Another Flame
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    method="POST"
                    className="relative z-10 space-y-6 text-left"
                  >
                  <input type="hidden" name="_subject" value="New Community Altar Light Petition" />
                  <input type="hidden" name="candle_color" value={preferredColor} />
                  <input type="hidden" name="disclaimer" value={consent ? "Yes" : "No"} />

                  <div className="flex items-center gap-3 mb-4">
                    <Flame className="w-5 h-5 text-antique-gold" />
                    <h3 className="font-serif text-xl text-parchment tracking-wide">Set My Virtual Light</h3>
                  </div>

                  {/* 1. Your Name */}
                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.18em] text-antique-gold font-bold mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Danielle Carter"
                      className="w-full bg-black/40 border border-white/10 focus:border-antique-gold text-xs p-3.5 text-parchment outline-none transition-colors rounded-[2px] tracking-wider focus:ring-0"
                    />
                  </div>

                  {/* 2. Email */}
                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.18em] text-antique-gold font-bold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      disabled={isSubmitting}
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="danielle@email.com"
                      className="w-full bg-black/40 border border-white/10 focus:border-antique-gold text-xs p-3.5 text-parchment outline-none transition-colors rounded-[2px] tracking-wider focus:ring-0"
                    />
                  </div>

                  {/* 3. Name to place on the altar, if different */}
                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.18em] text-antique-gold font-bold mb-2">
                      Name to place on the altar (if different)
                    </label>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      name="altar_name"
                      value={altarName}
                      onChange={(e) => setAltarName(e.target.value)}
                      placeholder="NAME TO INCLUDE ON ALTAR"
                      className="w-full bg-black/40 border border-white/10 focus:border-antique-gold text-xs p-3.5 text-parchment outline-none transition-colors rounded-[2px] tracking-wider focus:ring-0"
                    />
                  </div>

                  {/* 4. Intention Category */}
                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.18em] text-antique-gold font-bold mb-2">
                      Intention Category *
                    </label>
                    <select
                      disabled={isSubmitting}
                      required
                      name="intention_category"
                      value={intentionCategory}
                      onChange={(e) => setIntentionCategory(e.target.value)}
                      className="w-full bg-charcoal border border-white/10 focus:border-antique-gold text-xs p-3.5 text-parchment outline-none transition-colors rounded-[2px] tracking-wider appearance-none focus:ring-0"
                    >
                      <option value="Protection and Peace">Protection and Peace</option>
                      <option value="Road Opening and Opportunity">Road Opening and Opportunity</option>
                      <option value="Healing and Comfort">Healing and Comfort</option>
                      <option value="Clarity and Guidance">Clarity and Guidance</option>
                      <option value="Ancestral Remembrance">Ancestral Remembrance</option>
                      <option value="Love and Relationship Support">Love and Relationship Support</option>
                      <option value="Gratitude and Devotion">Gratitude and Devotion</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* 5. Petition or Prayer */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-[9px] uppercase tracking-[0.18em] text-antique-gold font-bold">
                        Petition or Prayer *
                      </label>
                      <span className="text-[9px] text-parchment/40 font-mono">
                        {500 - petitionText.length} characters left
                      </span>
                    </div>
                    <textarea
                      disabled={isSubmitting}
                      required
                      name="petition"
                      rows={4}
                      maxLength={500}
                      value={petitionText}
                      onChange={(e) => setPetitionText(e.target.value)}
                      placeholder="SPEAK FREELY OF WHAT IS IN YOUR HEART (UP TO 500 CHARACTERS)..."
                      className="w-full bg-black/40 border border-white/10 focus:border-antique-gold text-xs p-3.5 text-parchment outline-none transition-colors rounded-[2px] leading-relaxed tracking-wide resize-none focus:ring-0"
                    />
                  </div>

                  {/* 6. Preferred Candle Color */}
                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.18em] text-antique-gold font-bold mb-3">
                      Preferred Candle Color (Optional)
                    </label>
                    
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {Object.keys(CANDLE_COLORS_CONFIG).map((colorName) => {
                        const config = CANDLE_COLORS_CONFIG[colorName];
                        const isSelected = preferredColor === colorName;
                        return (
                           <button
                            key={colorName}
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => setPreferredColor(colorName)}
                            title={colorName}
                            className={`h-10 rounded-[2px] transition-all duration-300 relative border flex items-center justify-center cursor-pointer ${
                              isSelected
                                ? "border-antique-gold scale-105 shadow-[0_0_10px_rgba(197,160,89,0.35)]"
                                : "border-white/10 opacity-50 hover:opacity-80"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full ${config.bgClass} border border-white/10 flex items-center justify-center`}>
                              {colorName === "Allow Madame Della Rue to choose" && (
                                <span className="text-[8px] font-bold text-white">?</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-[10px] text-antique-gold italic font-medium">
                        Selected: {preferredColor}
                      </span>
                    </div>
                    
                    <p className="mt-3 text-[10px] text-parchment/40 italic leading-normal">
                      “Candle colors are symbolic preferences. Madame Della Rue may select a different color or preparation when spiritually appropriate.”
                    </p>
                  </div>

                  {/* 7. Required Consent Checkbox */}
                  <div className="bg-black/35 p-4 border border-burgundy/20 flex gap-3.5 items-start">
                    <div className="flex items-center h-5 mt-0.5">
                      <input
                        id="altar-consent"
                        type="checkbox"
                        disabled={isSubmitting}
                        required
                        name="acknowledgment"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="w-4.5 h-4.5 bg-black/40 border border-antique-gold/40 rounded focus:ring-0 cursor-pointer"
                      />
                    </div>
                    <label htmlFor="altar-consent" className="text-[10px] text-parchment/40 leading-relaxed cursor-pointer select-none">
                      “I understand that my request will be reviewed before acceptance. Spiritual services do not guarantee a specific result and do not replace medical, legal, financial, or mental-health care.” <span className="text-burgundy">*</span>
                    </label>
                  </div>

                  {/* Interactive notice */}
                  <div className="bg-[#1c1212]/50 border border-antique-gold/20 p-5 rounded-[2px] text-center">
                    <p className="text-[11px] text-parchment/80 leading-relaxed font-light">
                      Your petition will be received for review, and a virtual flame will instantly represent your submitted intention on our hearth. Physical altar work begins after acceptance and payment.
                    </p>
                  </div>

                  {/* Form submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 flex items-center justify-center text-center bg-burgundy hover:bg-antique-gold hover:text-deep-black text-parchment text-[11px] font-bold uppercase tracking-[0.25em] border border-antique-gold transition-all duration-400 rounded-[2px] cursor-pointer"
                  >
                    {isSubmitting ? "Setting Your Light..." : "Set My Light"}
                  </button>
                </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* The visual altar display shelf at the bottom */}
        <div className="mt-20 pt-16 border-t border-white/5 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h3 className="font-serif italic text-2xl text-parchment">Your Symbolic Flame</h3>
            <p className="text-xs text-parchment/50 font-light leading-relaxed">
              Upon submitting a petition, a virtual candle will illuminate here to represent your focus.
            </p>
          </div>

          <div className="bg-charcoal/35 border border-white/5 p-8 rounded-[2px] shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black pointer-events-none z-10" />
            
            {/* Wooden / Stone Altar shelf display */}
            <div className="text-center mb-8">
              <h4 className="font-serif italic text-lg text-parchment/80">"Ancestral Altar Hearth"</h4>
              <div className="h-[1px] w-28 bg-antique-gold/20 mx-auto mt-2"></div>
            </div>

            {/* Candles Alignment shelf */}
            <div className="flex flex-wrap items-end justify-center gap-12 pt-6 pb-4 min-h-[160px] relative">
              {petitions.length === 0 ? (
                <div className="text-center py-6 text-xs text-parchment/40 italic">
                  The altar is prepared and quiet. Submit your petition above to light your symbolic flame.
                </div>
              ) : (
                petitions.map((pet) => (
                  <motion.div
                    key={pet.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center relative group"
                  >
                    {/* Altar Flame particle glow */}
                    <div className="relative mb-2 flex justify-center w-8">
                      {/* Inner warm candle flame */}
                      <div
                        className="w-3.5 h-6 rounded-full bg-amber-400 absolute bottom-0 z-20 animate-flame transform origin-bottom hover:scale-130 transition-transform"
                        style={{
                          backgroundColor: pet.candleColor,
                          boxShadow: `0 -5px 15px ${pet.candleColor}, 0 0 25px ${pet.candleColor}`
                        }}
                      />
                      {/* Candle Wick */}
                      <div className="w-0.5 h-1.5 bg-black absolute bottom-0 z-10" />
                    </div>

                    {/* Wax Pillar */}
                    <div
                      className="w-6 h-16 rounded-t-[1px] relative"
                      style={{
                        background: `linear-gradient(to right, ${pet.candleColor}dd, ${pet.candleColor} , ${pet.candleColor}aa)`,
                        border: "1px solid rgba(255, 255, 255, 0.15)"
                      }}
                    >
                      {/* Wax drips details */}
                      <div
                        className="w-1 h-3 rounded-b-md absolute top-0 left-1"
                        style={{ backgroundColor: pet.candleColor }}
                      />
                      <div
                        className="w-1 h-4 rounded-b-md absolute top-0 right-1.5 opacity-80"
                        style={{ backgroundColor: pet.candleColor }}
                      />
                    </div>

                    {/* Tiny reflection shadow base */}
                    <div className="w-10 h-1 bg-black/40 rounded-full blur-xs mt-1" />

                    {/* Hover Card Detail popup on Altar */}
                    <div className="absolute bottom-[105%] bg-charcoal border border-antique-gold/45 text-parchment p-4 rounded-[2px] text-left opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 w-64 z-30 shadow-2xl">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-xs text-antique-gold truncate max-w-[140px]">
                          {pet.userName}
                        </span>
                        <span className="text-[8px] font-mono text-parchment/40 shrink-0">
                          {pet.createdAt}
                        </span>
                      </div>
                      <span className="block text-[8px] tracking-widest text-[#72cae2] font-semibold mb-2 uppercase">
                        {pet.serviceType}
                      </span>
                      <p className="text-[11px] text-parchment/80 leading-relaxed font-light italic break-words">
                        "{pet.intention}"
                      </p>
                    </div>

                    {/* Quick name badge beneath candle */}
                    <span className="text-[9px] text-parchment/50 font-medium tracking-wide mt-3 uppercase text-center block max-w-[85px] truncate">
                      {pet.userName.split(" ")[0]}
                    </span>
                  </motion.div>
                ))
              )}
            </div>

            {/* Hearth Stone base */}
            <div className="h-4 bg-zinc-900 border-t border-white/10 w-full relative z-10 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-antique-gold/15 to-transparent blur-md" />
            </div>
            
            {/* Consecrated Elements referencing the tactile moodboard */}
            <div className="mt-5 px-4 py-3.5 bg-black/45 border border-antique-gold/10 rounded-[2px] text-[10px] text-parchment/55 flex items-center justify-center gap-x-6 gap-y-2 flex-wrap font-sans text-center tracking-[0.12em] uppercase">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-antique-gold" /> Consecrated Roots</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-antique-gold" /> Heavy Brass Rosaries</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-antique-gold" /> Wax-Sealed Protection Jars</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-antique-gold" /> Dried Pomegranate & Bay</span>
            </div>
          </div>

          {/* Sample Intention Themes */}
          <div className="max-w-xl mx-auto bg-charcoal/20 border border-white/5 p-6 rounded-[2px] space-y-4">
            <span className="block text-[10px] uppercase tracking-[0.3em] text-antique-gold font-bold text-center">
              Sample Intention Themes
            </span>

            <div className="space-y-3">
              <div className="p-3.5 bg-black/30 border border-white/5 rounded-[2px]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-parchment text-xs">Household Protection and Peace</span>
                  <span className="text-[8px] text-antique-gold/50 font-mono">Example Focus</span>
                </div>
                <p className="italic text-parchment/60 leading-relaxed text-[11px]">
                  Setting a shield over a family home or workspace to cultivate security, block heavy influences, and invite a soft, peaceful atmosphere.
                </p>
              </div>

              <div className="p-3.5 bg-black/30 border border-white/5 rounded-[2px]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-parchment text-xs">Road Opening and New Opportunity</span>
                  <span className="text-[8px] text-antique-gold/50 font-mono">Example Focus</span>
                </div>
                <p className="italic text-parchment/60 leading-relaxed text-[11px]">
                  Paving the way for constructive career steps, fresh starts, or clarity when facing stalled situations and spiritual roadblocks.
                </p>
              </div>

              <div className="p-3.5 bg-black/30 border border-white/5 rounded-[2px]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-parchment text-xs">Ancestral Remembrance and Devotion</span>
                  <span className="text-[8px] text-antique-gold/50 font-mono">Example Focus</span>
                </div>
                <p className="italic text-parchment/60 leading-relaxed text-[11px]">
                  Lighting an offering lamp to honor ancestors, seeking guidance, alignment, and peaceful connections with those who paved the path.
                </p>
              </div>
            </div>

            <p className="text-[10px] text-parchment/40 italic text-center leading-normal pt-2 border-t border-white/5">
              Please note: These are illustrative intention themes to help you form your petition, not actual client submissions or private logs.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
