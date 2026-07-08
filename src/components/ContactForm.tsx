/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Send, Instagram, Facebook, AlertCircle, HelpCircle, Eye, Sparkles, MessageSquare, Check, ExternalLink } from "lucide-react";

const Tiktok = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

import { motion, AnimatePresence } from "motion/react";
import lanternImg from "../assets/images/lantern-crossroads-madame-della-rue.jpg";

interface ContactFormProps {
  selectedFormType: "guidance" | "reading" | "consultation" | "contact" | "live_consultation";
  selectedReadingPackage: string;
  initialConsultationNature?: string;
  onFormTypeChange: (type: "guidance" | "reading" | "consultation" | "contact" | "live_consultation") => void;
  onReadingPackageChange: (pkgId: string) => void;
  onSubmitSuccess: (data: { name: string; service: string }) => void;
}

const readingPackages = [
  {
    id: "quick",
    name: "Quick Clarity Reading",
    price: "$33",
    questions: "1 question",
    format: "Audio response or written message",
    deliveryTime: "3–5 business days",
    followUp: "Not included",
    description: "A focused reading for one clearly written question or one central situation.",
    formats: ["Audio Message", "Written Message"]
  },
  {
    id: "detailed",
    name: "Detailed Spiritual Insight Reading",
    price: "$66",
    questions: "Up to 3 related questions or 1 complex situation",
    format: "Audio response, written response, or prerecorded video",
    deliveryTime: "5–7 business days",
    followUp: "1 brief clarification included",
    description: "A more in-depth reading for a layered situation, recurring pattern, crossroads, or several closely related concerns.",
    formats: ["Audio Response", "Written Response", "Prerecorded Video"]
  },
  {
    id: "ancestral",
    name: "Ancestral Guidance Reading",
    price: "$77",
    questions: "1 central ancestral inquiry",
    format: "Audio or written response",
    deliveryTime: "5–7 business days",
    followUp: "1 brief clarification included",
    description: "A focused reading centered on ancestral patterns, guidance, support, inherited themes, and spiritual connection.",
    formats: ["Audio Response", "Written Response"]
  },
  {
    id: "live",
    name: "Live Spiritual Consultation",
    price: "$99",
    questions: "Up to 3 primary questions or areas of focus",
    format: "Google Meet",
    deliveryTime: "45 minutes",
    followUp: "One reschedule allowed with at least 24 hours’ notice",
    description: "A private 45-minute live session for real-time spiritual guidance, divination, questions, and discussion.",
    formats: ["Google Meet Live Session"]
  }
];

export default function ContactForm({
  selectedFormType,
  selectedReadingPackage,
  initialConsultationNature,
  onFormTypeChange,
  onReadingPackageChange,
  onSubmitSuccess
}: ContactFormProps) {
  // Common states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Tab 1: Service Guidance States ("Not Sure Where to Begin?")
  const [guidanceConcern, setGuidanceConcern] = useState("");
  const [guidanceContact, setGuidanceContact] = useState("Email");
  const [guidanceDesc, setGuidanceDesc] = useState("");

  // Tab 2: Reading Request States
  const [readingQuestion, setReadingQuestion] = useState("");
  const [readingFormat, setReadingFormat] = useState("");
  const [readingConsent, setReadingConsent] = useState(false);

  // Tab 3: Consultation States
  const [consultationNature, setConsultationNature] = useState("");
  const [consultationSupport, setConsultationSupport] = useState("");
  const [consultationUrgent, setConsultationUrgent] = useState("No");
  const [consultationContact, setConsultationContact] = useState("Email");
  const [consultationDesc, setConsultationDesc] = useState("");
  const [consultationConsent, setConsultationConsent] = useState(false);

  // Tab 4: General Contact States
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Tab 5: Live Spiritual Consultation States
  const [liveTimeZone, setLiveTimeZone] = useState("");
  const [liveTopic, setLiveTopic] = useState("");
  const [liveQuestions, setLiveQuestions] = useState("");
  const [liveDays, setLiveDays] = useState<string[]>([]);
  const [liveTimes, setLiveTimes] = useState<string[]>([]);
  const [liveAlternative, setLiveAlternative] = useState("");
  const [liveAck, setLiveAck] = useState(false);
  const [liveDisclaimer, setLiveDisclaimer] = useState(false);

  // Toggle preferred days
  const toggleLiveDay = (day: string) => {
    setLiveDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  // Toggle preferred times
  const toggleLiveTime = (time: string) => {
    setLiveTimes(prev => 
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  // Sync initial consultation nature
  useEffect(() => {
    if (initialConsultationNature) {
      setConsultationNature(initialConsultationNature);
    }
  }, [initialConsultationNature]);

  const activePkg = readingPackages.find(p => p.id === selectedReadingPackage) || readingPackages[0];

  // Set default format when package changes
  useEffect(() => {
    if (activePkg) {
      setReadingFormat(activePkg.formats[0]);
    }
  }, [selectedReadingPackage]);

  const handleFormSubmit = async (
    e: React.FormEvent,
    type: "guidance" | "reading" | "consultation" | "contact" | "live_consultation"
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    let endpoint = "";
    let payload: Record<string, any> = { name, email };

    if (type === "guidance") {
      endpoint = "https://formspree.io/f/meebrvyr";
      payload = {
        ...payload,
        subject: "New General Contact Message — Service Guidance",
        message: `Concern: ${guidanceConcern}\nPreferred Contact Method: ${guidanceContact}\nDescription: ${guidanceDesc}`,
        broad_area_of_concern: guidanceConcern,
        preferred_contact_method: guidanceContact,
        situation_description: guidanceDesc
      };
    } else if (type === "reading") {
      if (!readingConsent) {
        setIsSubmitting(false);
        return;
      }
      endpoint = "https://formspree.io/f/mlgypzen";
      payload = {
        ...payload,
        _subject: `New Reading Request — ${activePkg.name}`,
        reading_package: activePkg.name,
        delivery_format: readingFormat,
        question_or_focus: readingQuestion,
        acknowledgment: readingConsent ? "Yes" : "No",
        disclaimer: readingConsent ? "Yes" : "No"
      };
    } else if (type === "consultation") {
      if (!consultationConsent) {
        setIsSubmitting(false);
        return;
      }
      endpoint = "https://formspree.io/f/xojokrqp";
      payload = {
        ...payload,
        _subject: "New Ritual & Rootwork Consultation Request",
        support_type: consultationSupport,
        situation_description: consultationDesc,
        urgency: consultationUrgent,
        preferred_contact_method: consultationContact,
        acknowledgment: consultationConsent ? "Yes" : "No",
        disclaimer: consultationConsent ? "Yes" : "No"
      };
    } else if (type === "contact") {
      endpoint = "https://formspree.io/f/meebrvyr";
      payload = {
        ...payload,
        subject: contactSubject,
        message: contactMessage,
        _subject: "New General Contact Message"
      };
    } else if (type === "live_consultation") {
      if (!liveAck || !liveDisclaimer) {
        setIsSubmitting(false);
        return;
      }
      endpoint = "https://formspree.io/f/mykqnoyp";
      payload = {
        ...payload,
        _subject: "New Live Spiritual Consultation Request",
        timezone: liveTimeZone,
        topic: liveTopic,
        questions_or_focus: liveQuestions,
        preferred_days: liveDays.join(", "),
        preferred_time_windows: liveTimes.join(", "),
        alternative_availability: liveAlternative,
        acknowledgment: liveAck ? "Yes" : "No",
        disclaimer: liveDisclaimer ? "Yes" : "No"
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        if (type === "guidance") {
          onSubmitSuccess({
            name,
            service: `Service Guidance: ${guidanceConcern || "Unsure"}`
          });
          setGuidanceConcern("");
          setGuidanceDesc("");
        } else if (type === "reading") {
          onSubmitSuccess({
            name,
            service: `Reading Request: ${activePkg.name}`
          });
          setReadingQuestion("");
          setReadingConsent(false);
        } else if (type === "consultation") {
          onSubmitSuccess({
            name,
            service: `Ritual Consultation: ${consultationNature || "Ritual & Rootwork"}`
          });
          setConsultationSupport("");
          setConsultationDesc("");
          setConsultationContact("Email");
          setConsultationConsent(false);
        } else if (type === "contact") {
          onSubmitSuccess({
            name,
            service: `General Inquiry: ${contactSubject || "Message"}`
          });
          setContactSubject("");
          setContactMessage("");
        } else if (type === "live_consultation") {
          onSubmitSuccess({
            name,
            service: `Live Spiritual Consultation: ${liveTopic || "Live Session"}`
          });
          setLiveTimeZone("");
          setLiveTopic("");
          setLiveQuestions("");
          setLiveDays([]);
          setLiveTimes([]);
          setLiveAlternative("");
          setLiveAck(false);
          setLiveDisclaimer(false);
        }

        // Reset general fields
        setName("");
        setEmail("");
      } else {
        throw new Error("Formspree response was not OK");
      }
    } catch (err) {
      setError("Your request could not be sent. Please try again or email Madame Della Rue directly at QueenDellaRue@iCloud.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-black relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Crossroads Supporting Visual */}
        <div className="mb-16 border border-antique-gold/20 p-6 md:p-8 bg-charcoal/25 rounded-[2px] flex flex-col md:flex-row items-center gap-8 shadow-xl">
          <div className="w-full md:w-1/3 aspect-[3/4] border border-antique-gold/30 p-2 bg-black/40 shadow-lg shrink-0">
            <img
              src={lanternImg}
              className="w-full h-full object-cover contrast-105 brightness-95"
              referrerPolicy="no-referrer"
              alt="Lantern at the crossroads representing spiritual guidance, clarity, and pathfinding"
            />
          </div>
          <div className="space-y-4 text-center md:text-left flex-1">
            <h3 className="text-2xl md:text-3xl font-serif text-antique-gold italic leading-tight">
              Guidance at the Crossroads
            </h3>
            <p className="text-sm text-parchment/80 leading-relaxed font-light italic">
              “For those seeking clarity, protection, ancestral insight, or spiritual direction, Roots & Rosaries offers grounded spiritual guidance held with prayer, discernment, and care.”
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION SELECTOR */}
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-antique-gold text-center mb-6 font-semibold">
            Choose Your Threshold
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-3xl mx-auto p-1.5 bg-charcoal/40 border border-white/5 rounded-[3px]">
            <button
              onClick={() => onFormTypeChange("guidance")}
              className={`py-3 px-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 rounded-[2px] ${
                selectedFormType === "guidance"
                  ? "bg-burgundy text-parchment border border-antique-gold"
                  : "text-parchment/50 hover:text-parchment hover:bg-white/[0.02]"
              }`}
            >
              Guidance
            </button>
            <button
              onClick={() => {
                onFormTypeChange("reading");
                onReadingPackageChange("quick");
              }}
              className={`py-3 px-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 rounded-[2px] ${
                selectedFormType === "reading" || selectedFormType === "live_consultation"
                  ? "bg-burgundy text-parchment border border-antique-gold"
                  : "text-parchment/50 hover:text-parchment hover:bg-white/[0.02]"
              }`}
            >
              Reading Form
            </button>
            <button
              onClick={() => onFormTypeChange("consultation")}
              className={`py-3 px-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 rounded-[2px] ${
                selectedFormType === "consultation"
                  ? "bg-burgundy text-parchment border border-antique-gold"
                  : "text-parchment/50 hover:text-parchment hover:bg-white/[0.02]"
              }`}
            >
              Consultation
            </button>
            <button
              onClick={() => onFormTypeChange("contact")}
              className={`py-3 px-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 rounded-[2px] ${
                selectedFormType === "contact"
                  ? "bg-burgundy text-parchment border border-antique-gold"
                  : "text-parchment/50 hover:text-parchment hover:bg-white/[0.02]"
              }`}
            >
              General Contact
            </button>
          </div>
        </div>

        {/* ACTIVE FORM CONTAINER */}
        <AnimatePresence mode="wait">
          
          {/* FORM 1: NOT SURE WHERE TO BEGIN? (SERVICE GUIDANCE) */}
          {selectedFormType === "guidance" && (
            <motion.div
              key="guidance-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-serif text-parchment italic">
                  Not Sure Where to Begin?
                </h3>
                <p className="text-xs md:text-sm text-antique-gold font-light leading-relaxed">
                  “If you feel called to seek support but are unsure which service best fits your situation, share a brief description below. Madame Della Rue will review your request and recommend the most appropriate next step when possible.”
                </p>
              </div>

              <form onSubmit={(e) => handleFormSubmit(e, "guidance")} method="POST" className="space-y-12 bg-deep-black/30 border border-white/5 p-8 md:p-12 rounded-[2px]">
                {/* Basic Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Danielle Carter"
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                    />
                  </div>

                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="danielle@email.com"
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Guidance fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Broad Area of Concern</label>
                    <select
                      required
                      name="broad_area_of_concern"
                      value={guidanceConcern}
                      onChange={(e) => setGuidanceConcern(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-charcoal text-parchment/40">Select Concern</option>
                      <option value="I need clarity or spiritual insight" className="bg-charcoal text-parchment">I need clarity or spiritual insight</option>
                      <option value="I need guidance with my spiritual path" className="bg-charcoal text-parchment">I need guidance with my spiritual path</option>
                      <option value="I am seeking ancestral guidance" className="bg-charcoal text-parchment">I am seeking ancestral guidance</option>
                      <option value="I need cleansing, protection, or road opening" className="bg-charcoal text-parchment">I need cleansing, protection, or road opening</option>
                      <option value="I may need personalized ritual or rootwork" className="bg-charcoal text-parchment">I may need personalized ritual or rootwork</option>
                      <option value="I am not sure where my situation fits" className="bg-charcoal text-parchment">I am not sure where my situation fits</option>
                    </select>
                  </div>

                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Preferred Contact Method</label>
                    <select
                      name="preferred_contact_method"
                      value={guidanceContact}
                      onChange={(e) => setGuidanceContact(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300 appearance-none cursor-pointer"
                    >
                      <option value="Email" className="bg-charcoal text-parchment">Email</option>
                      <option value="Text Message" className="bg-charcoal text-parchment">Text Message</option>
                      <option value="Instagram DM" className="bg-charcoal text-parchment">Instagram DM</option>
                    </select>
                  </div>
                </div>

                {/* Description Textarea */}
                <div className="relative group">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase">Briefly describe your situation</label>
                    <span className="text-[9px] text-parchment/40 font-mono">{guidanceDesc.length}/750 chars</span>
                  </div>
                  <textarea
                    required
                    name="situation_description"
                    maxLength={750}
                    rows={4}
                    value={guidanceDesc}
                    onChange={(e) => setGuidanceDesc(e.target.value)}
                    placeholder="Provide a general context of what is prompting you to reach out..."
                    className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider leading-relaxed outline-none transition-colors duration-300"
                  />
                </div>

                {/* Non-Disruptive Note Banner */}
                <div className="bg-charcoal/20 p-6 border border-white/5 text-[11px] text-parchment/65 leading-relaxed font-light space-y-1 rounded-[2px]">
                  <p className="font-bold text-antique-gold uppercase tracking-wider text-[9px]">Please Note</p>
                  <p>“This form is for service guidance only. It is not a reading, consultation, booking confirmation, or emergency service.”</p>
                </div>

                {/* Error message */}
                {error && selectedFormType === "guidance" && (
                  <div className="bg-[#1c1212]/50 border border-burgundy/30 p-4 rounded-[2px] flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                    <p className="text-[11px] text-parchment/80 leading-relaxed font-light">
                      Your request could not be sent. Please try again or email Madame Della Rue directly at{" "}
                      <a href="mailto:QueenDellaRue@iCloud.com" className="text-antique-gold hover:text-haint-blue underline transition-colors duration-300">
                        QueenDellaRue@iCloud.com
                      </a>.
                    </p>
                  </div>
                )}

                {/* Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 flex items-center justify-center bg-burgundy hover:bg-antique-gold text-parchment hover:text-deep-black border border-antique-gold text-[10px] tracking-[0.4em] font-bold uppercase transition-all duration-500 rounded-[2px] disabled:opacity-50"
                >
                  {isSubmitting ? "Sending Guidance Request..." : "Help Me Choose a Service"}
                </button>
              </form>
            </motion.div>
          )}

          {/* FORM 2: READING REQUEST FORM */}
          {selectedFormType === "reading" && (
            <motion.div
              key="reading-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-serif text-parchment italic">
                  Divination Request Form
                </h3>
                <p className="text-xs md:text-sm text-antique-gold font-light leading-relaxed">
                  Submit your request for a personalized, focused spiritual reading. Madame Della Rue will review your questions to ensure compatibility and spiritual alignment before finalized booking.
                </p>
              </div>

              <form onSubmit={(e) => handleFormSubmit(e, "reading")} method="POST" className="space-y-12 bg-deep-black/30 border border-white/5 p-8 md:p-12 rounded-[2px]">
                <input type="hidden" name="_subject" value={`New Reading Request — ${activePkg.name}`} />
                <input type="hidden" name="reading_package" value={activePkg.name} />
                <input type="hidden" name="disclaimer" value={readingConsent ? "Yes" : "No"} />

                {/* Package select display */}
                <div className="bg-charcoal/30 border border-antique-gold/25 p-6 rounded-[2px] grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase">Selected Reading Package</label>
                    <select
                      name="reading_package_select"
                      value={selectedReadingPackage}
                      onChange={(e) => {
                        const val = e.target.value;
                        onReadingPackageChange(val);
                        if (val === "live") {
                          onFormTypeChange("live_consultation");
                        }
                      }}
                      className="bg-transparent border-b border-white/10 font-serif text-xl text-parchment py-1 outline-none cursor-pointer focus:border-haint-blue max-w-full"
                    >
                      {readingPackages.map(p => (
                        <option key={p.id} value={p.id} className="bg-charcoal text-parchment font-sans text-sm">{p.name}</option>
                      ))}
                    </select>
                    <p className="text-[11px] text-parchment/60 italic font-light pt-1.5">"{activePkg.description}"</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 space-y-1.5 text-[11px] font-light text-parchment/75">
                    <div className="flex justify-between">
                      <span>Service Fee:</span>
                      <span className="font-bold text-antique-gold">{activePkg.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Question limit:</span>
                      <span className="font-semibold text-parchment">{activePkg.questions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Turnaround:</span>
                      <span className="font-semibold text-parchment">{activePkg.deliveryTime}</span>
                    </div>
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Danielle Carter"
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                    />
                  </div>

                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="danielle@email.com"
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Question & Format selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group md:col-span-1">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Preferred Delivery Format</label>
                    <select
                      name="delivery_format"
                      value={readingFormat}
                      onChange={(e) => setReadingFormat(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300 appearance-none cursor-pointer"
                    >
                      {activePkg.formats.map((f, i) => (
                        <option key={i} value={f} className="bg-charcoal text-parchment">{f}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Client's Question */}
                <div className="relative group">
                  <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">
                    Your Question or Area of Focus ({activePkg.questions} question limit applies)
                  </label>
                  <textarea
                    required
                    name="question_or_focus"
                    rows={4}
                    value={readingQuestion}
                    onChange={(e) => setReadingQuestion(e.target.value)}
                    placeholder="Please formulate your question(s) with clear focus, detailing the specific areas you wish Spirit to unpack..."
                    className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider leading-relaxed outline-none transition-colors duration-300"
                  />
                </div>

                {/* Placeholders for payment or booking links */}
                <div className="bg-[#121c24]/40 border border-haint-blue/15 p-6 rounded-[2px] flex items-start gap-4">
                  <div className="p-1.5 bg-haint-blue/10 border border-haint-blue/25 text-haint-blue rounded-full mt-0.5">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] text-parchment/65 leading-relaxed font-light space-y-1">
                    <p className="font-semibold text-parchment uppercase tracking-wider text-[9px]">Booking & Payment Setup</p>
                    <p>Once Madame Della Rue reviews your submission to confirm compatibility, a secure, hosted payment invoice (via Stripe) or real-time scheduler link will be delivered directly to your email address to lock in your slot.</p>
                  </div>
                </div>

                {/* Required Consent Checklist */}
                <div className="bg-charcoal/30 p-6 border border-burgundy/25 flex items-start gap-4 rounded-[2px]">
                  <div className="flex items-center h-5 mt-1">
                    <input
                      id="reading-consent-check"
                      type="checkbox"
                      required
                      name="acknowledgment"
                      checked={readingConsent}
                      onChange={(e) => setReadingConsent(e.target.checked)}
                      style={{ accentColor: "var(--color-antique-gold)" }}
                      className="w-4 h-4 cursor-pointer bg-black/40 border border-antique-gold/40 rounded focus:ring-0"
                    />
                  </div>
                  <label htmlFor="reading-consent-check" className="text-[11px] text-parchment/75 leading-relaxed font-light cursor-pointer select-none">
                    I understand that readings provide spiritual insight and guidance but do not guarantee outcomes or replace professional medical, legal, financial, or mental-health care. I understand that Madame Della Rue may decline requests that fall outside the scope of her practice.
                  </label>
                </div>

                {/* Error message */}
                {error && selectedFormType === "reading" && (
                  <div className="bg-[#1c1212]/50 border border-burgundy/30 p-4 rounded-[2px] flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                    <p className="text-[11px] text-parchment/80 leading-relaxed font-light">
                      Your request could not be sent. Please try again or email Madame Della Rue directly at{" "}
                      <a href="mailto:QueenDellaRue@iCloud.com" className="text-antique-gold hover:text-haint-blue underline transition-colors duration-300">
                        QueenDellaRue@iCloud.com
                      </a>.
                    </p>
                  </div>
                )}

                {/* Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 flex items-center justify-center bg-burgundy hover:bg-antique-gold text-parchment hover:text-deep-black border border-antique-gold text-[10px] tracking-[0.4em] font-bold uppercase transition-all duration-500 rounded-[2px] disabled:opacity-50"
                >
                  {isSubmitting ? "Sending Request..." : "Submit Reading Request"}
                </button>
              </form>
            </motion.div>
          )}

          {/* FORM 5: LIVE SPIRITUAL CONSULTATION REQUEST FORM */}
          {selectedFormType === "live_consultation" && (
            <motion.div
              key="live-consultation-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-serif text-parchment italic">
                  Live Spiritual Consultation Request Form
                </h3>
                <p className="text-xs md:text-sm text-antique-gold font-light leading-relaxed">
                  Submit your request for a private 45-minute live session via Google Meet. Madame Della Rue will review your request and contact you with available appointment options.
                </p>
              </div>

              <form onSubmit={(e) => handleFormSubmit(e, "live_consultation")} method="POST" className="space-y-12 bg-deep-black/30 border border-white/5 p-8 md:p-12 rounded-[2px]">
                <input type="hidden" name="_subject" value="New Live Spiritual Consultation Request" />
                <input type="hidden" name="preferred_days" value={liveDays.join(", ")} />
                <input type="hidden" name="preferred_time_windows" value={liveTimes.join(", ")} />
                <input type="hidden" name="acknowledgment" value={liveAck ? "Yes" : "No"} />
                <input type="hidden" name="disclaimer" value={liveDisclaimer ? "Yes" : "No"} />

                {/* Package select display */}
                <div className="bg-charcoal/30 border border-antique-gold/25 p-6 rounded-[2px] grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase">Selected Reading Package</label>
                    <select
                      name="package_selection"
                      value="live"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val !== "live") {
                          onReadingPackageChange(val);
                          onFormTypeChange("reading");
                        }
                      }}
                      className="bg-transparent border-b border-white/10 font-serif text-xl text-parchment py-1 outline-none cursor-pointer focus:border-haint-blue max-w-full"
                    >
                      {readingPackages.map(p => (
                        <option key={p.id} value={p.id} className="bg-charcoal text-parchment font-sans text-sm">{p.name}</option>
                      ))}
                    </select>
                    <p className="text-[11px] text-parchment/60 italic font-light pt-1.5">"A private 45-minute live session for real-time spiritual guidance, divination, questions, and discussion."</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 space-y-1.5 text-[11px] font-light text-parchment/75">
                    <div className="flex justify-between">
                      <span>Session Fee:</span>
                      <span className="font-bold text-antique-gold">$99</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Session Length:</span>
                      <span className="font-semibold text-parchment">45 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform:</span>
                      <span className="font-semibold text-parchment">Google Meet</span>
                    </div>
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Danielle Carter"
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                    />
                  </div>

                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="danielle@email.com"
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Time Zone */}
                <div className="relative group">
                  <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Your Time Zone</label>
                  <input
                    type="text"
                    required
                    name="timezone"
                    value={liveTimeZone}
                    onChange={(e) => setLiveTimeZone(e.target.value)}
                    placeholder="e.g. Eastern Time (EST / EDT) or GMT-5"
                    className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                  />
                </div>

                {/* General Topic */}
                <div className="relative group">
                  <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">General Topic or Area of Concern</label>
                  <input
                    type="text"
                    required
                    name="topic"
                    value={liveTopic}
                    onChange={(e) => setLiveTopic(e.target.value)}
                    placeholder="e.g. Ancestral healing, spiritual crossroads, career direction..."
                    className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                  />
                </div>

                {/* Questions or Areas of Focus */}
                <div className="relative group">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase">
                      Up to Three Primary Questions or Areas of Focus
                    </label>
                    <span className="text-[10px] text-parchment/40 font-mono">
                      {liveQuestions.length}/1000
                    </span>
                  </div>
                  <textarea
                    required
                    name="questions_or_focus"
                    rows={4}
                    maxLength={1000}
                    value={liveQuestions}
                    onChange={(e) => setLiveQuestions(e.target.value)}
                    placeholder="Please formulate up to three primary questions or specify your central areas of focus in detail..."
                    className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider leading-relaxed outline-none transition-colors duration-300"
                  />
                </div>

                {/* Preferred Days */}
                <div className="space-y-3">
                  <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase">
                    Preferred Days of the Week
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => {
                      const isSelected = liveDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleLiveDay(day)}
                          className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border rounded-[2px] transition-all duration-300 ${
                            isSelected
                              ? "bg-burgundy text-parchment border-antique-gold shadow-[0_0_10px_rgba(197,160,89,0.25)]"
                              : "border-white/10 text-parchment/60 hover:border-white/30 hover:text-parchment"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Time Windows */}
                <div className="space-y-3">
                  <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase">
                    Preferred Time Windows
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {["Morning (9 AM - 12 PM)", "Afternoon (12 PM - 4 PM)", "Evening (4 PM - 8 PM)"].map(time => {
                      const isSelected = liveTimes.includes(time);
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => toggleLiveTime(time)}
                          className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border rounded-[2px] transition-all duration-300 ${
                            isSelected
                              ? "bg-burgundy text-parchment border-antique-gold shadow-[0_0_10px_rgba(197,160,89,0.25)]"
                              : "border-white/10 text-parchment/60 hover:border-white/30 hover:text-parchment"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Alternative Availability */}
                <div className="relative group">
                  <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">
                    Alternative Availability (Optional)
                  </label>
                  <input
                    type="text"
                    name="alternative_availability"
                    value={liveAlternative}
                    onChange={(e) => setLiveAlternative(e.target.value)}
                    placeholder="e.g. Can do anytime after 5 PM if needed, or open on specific dates..."
                    className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                  />
                </div>

                {/* Required Acknowledgment Checkbox */}
                <div className="bg-charcoal/30 p-6 border border-antique-gold/25 flex items-start gap-4 rounded-[2px]">
                  <div className="flex items-center h-5 mt-1">
                    <input
                      id="live-ack-check"
                      type="checkbox"
                      required
                      name="live_acknowledgment"
                      checked={liveAck}
                      onChange={(e) => setLiveAck(e.target.checked)}
                      style={{ accentColor: "var(--color-antique-gold)" }}
                      className="w-4 h-4 cursor-pointer bg-black/40 border border-antique-gold/40 rounded focus:ring-0"
                    />
                  </div>
                  <label htmlFor="live-ack-check" className="text-[11px] text-parchment/75 leading-relaxed font-light cursor-pointer select-none">
                    I understand that this form is a request for a live consultation and does not confirm an appointment. Madame Della Rue will review my request and contact me with available appointment options.
                  </label>
                </div>

                {/* Required Disclaimer Checkbox */}
                <div className="bg-charcoal/30 p-6 border border-burgundy/25 flex items-start gap-4 rounded-[2px]">
                  <div className="flex items-center h-5 mt-1">
                    <input
                      id="live-disclaimer-check"
                      type="checkbox"
                      required
                      name="live_disclaimer"
                      checked={liveDisclaimer}
                      onChange={(e) => setLiveDisclaimer(e.target.checked)}
                      style={{ accentColor: "var(--color-antique-gold)" }}
                      className="w-4 h-4 cursor-pointer bg-black/40 border border-antique-gold/40 rounded focus:ring-0"
                    />
                  </div>
                  <label htmlFor="live-disclaimer-check" className="text-[11px] text-parchment/75 leading-relaxed font-light cursor-pointer select-none">
                    I understand that spiritual readings provide guidance and insight but do not replace medical, legal, financial, or mental-health care and do not guarantee a specific result.
                  </label>
                </div>

                {/* Error message */}
                {error && selectedFormType === "live_consultation" && (
                  <div className="bg-[#1c1212]/50 border border-burgundy/30 p-4 rounded-[2px] flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                    <p className="text-[11px] text-parchment/80 leading-relaxed font-light">
                      Your request could not be sent. Please try again or email Madame Della Rue directly at{" "}
                      <a href="mailto:QueenDellaRue@iCloud.com" className="text-antique-gold hover:text-haint-blue underline transition-colors duration-300">
                        QueenDellaRue@iCloud.com
                      </a>.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 flex items-center justify-center bg-burgundy hover:bg-antique-gold text-parchment hover:text-deep-black border border-antique-gold text-[10px] tracking-[0.4em] font-bold uppercase transition-all duration-500 rounded-[2px] disabled:opacity-50"
                >
                  {isSubmitting ? "Sending Request..." : "Submit Consultation Request"}
                </button>
              </form>
            </motion.div>
          )}

          {/* FORM 3: CUSTOM RITUAL & ROOTWORK CONSULTATION FORM */}
          {selectedFormType === "consultation" && (
            <motion.div
              key="consultation-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-serif text-parchment italic">
                  Ritual & Rootwork Consultation Form
                </h3>
                <p className="text-xs md:text-sm text-antique-gold font-light leading-relaxed">
                  Request custom, personalized ritual, road opening, or candle work. Every rootwork request undergoes extensive discernment before acceptance.
                </p>
              </div>

              <form onSubmit={(e) => handleFormSubmit(e, "consultation")} method="POST" className="space-y-12 bg-deep-black/30 border border-white/5 p-8 md:p-12 rounded-[2px]">
                <input type="hidden" name="_subject" value="New Ritual & Rootwork Consultation Request" />
                <input type="hidden" name="disclaimer" value={consultationConsent ? "Yes" : "No"} />

                {/* Basic Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Danielle Carter"
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                    />
                  </div>

                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="danielle@email.com"
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Nature, Urgent & Contact Method */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">General Nature of Request</label>
                    <select
                      required
                      name="nature_of_request"
                      value={consultationNature}
                      onChange={(e) => setConsultationNature(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-charcoal text-parchment/40">Select Nature</option>
                      <option value="Custom Ritual & Rootwork" className="bg-charcoal text-parchment">Custom Ritual & Rootwork</option>
                      <option value="Custom Candle Work" className="bg-charcoal text-parchment">Custom Candle Work</option>
                      <option value="Spiritual Cleansing" className="bg-charcoal text-parchment">Spiritual Cleansing</option>
                      <option value="Protection Work" className="bg-charcoal text-parchment">Protection Work</option>
                      <option value="Road Opening / Obstacle Removal" className="bg-charcoal text-parchment">Road Opening / Obstacle Removal</option>
                    </select>
                  </div>

                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Is the Situation Time-Sensitive?</label>
                    <select
                      name="urgency"
                      value={consultationUrgent}
                      onChange={(e) => setConsultationUrgent(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300 appearance-none cursor-pointer"
                    >
                      <option value="No" className="bg-charcoal text-parchment">No, standard scheduling is fine</option>
                      <option value="Yes" className="bg-charcoal text-parchment">Yes, urgent attention needed</option>
                    </select>
                  </div>

                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Preferred Contact Method</label>
                    <select
                      name="preferred_contact_method"
                      value={consultationContact}
                      onChange={(e) => setConsultationContact(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300 appearance-none cursor-pointer"
                    >
                      <option value="Email" className="bg-charcoal text-parchment">Email</option>
                      <option value="Text Message" className="bg-charcoal text-parchment">Text Message</option>
                      <option value="Instagram DM" className="bg-charcoal text-parchment">Instagram DM</option>
                    </select>
                  </div>
                </div>

                {/* Belief & Custom fields */}
                <div className="relative group">
                  <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">What type of support do you believe you need?</label>
                  <input
                    type="text"
                    required
                    name="support_type"
                    value={consultationSupport}
                    onChange={(e) => setConsultationSupport(e.target.value)}
                    placeholder="e.g. Uncrossing, spiritual floor wash guidance, unblocking, petition work..."
                    className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                  />
                </div>

                {/* Situation Description */}
                <div className="relative group">
                  <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Brief description of the situation</label>
                  <textarea
                    required
                    name="situation_description"
                    rows={4}
                    value={consultationDesc}
                    onChange={(e) => setConsultationDesc(e.target.value)}
                    placeholder="Describe the situation with honesty and vulnerability. Include dates or timelines when applicable..."
                    className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider leading-relaxed outline-none transition-colors duration-300"
                  />
                </div>

                {/* Warning note */}
                <div className="bg-[#1c1212]/40 border border-burgundy/15 p-6 rounded-[2px] flex items-start gap-4">
                  <div className="p-1.5 bg-burgundy/15 border border-burgundy/30 text-antique-gold rounded-full mt-0.5">
                    <AlertCircle className="w-4 h-4 text-burgundy" />
                  </div>
                  <div className="text-[11px] text-parchment/65 leading-relaxed font-light">
                    <p className="font-semibold text-parchment uppercase tracking-wider text-[9px] mb-0.5">Acceptance Disclaimer</p>
                    <p>“Submitting this form does not confirm that the work will be accepted.” Because ritual and rootwork services vary in complexity, materials, preparation, and duration, a consultation and diagnostic reading are required before pricing is provided and work is accepted.</p>
                  </div>
                </div>

                {/* Required Consent Checklist */}
                <div className="bg-charcoal/30 p-6 border border-burgundy/25 flex items-start gap-4 rounded-[2px]">
                  <div className="flex items-center h-5 mt-1">
                    <input
                      id="consultation-consent-check"
                      type="checkbox"
                      required
                      name="acknowledgment"
                      checked={consultationConsent}
                      onChange={(e) => setConsultationConsent(e.target.checked)}
                      style={{ accentColor: "var(--color-antique-gold)" }}
                      className="w-4 h-4 cursor-pointer bg-black/40 border border-antique-gold/40 rounded focus:ring-0"
                    />
                  </div>
                  <label htmlFor="consultation-consent-check" className="text-[11px] text-parchment/75 leading-relaxed font-light cursor-pointer select-none">
                    I understand that custom ritual services require diagnostic review. Payment or ritual preparations begin only after Madame Della Rue reviews my request and accepts the case. All instructions must be followed exactly.
                  </label>
                </div>

                {/* Error message */}
                {error && selectedFormType === "consultation" && (
                  <div className="bg-[#1c1212]/50 border border-burgundy/30 p-4 rounded-[2px] flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                    <p className="text-[11px] text-parchment/80 leading-relaxed font-light">
                      Your request could not be sent. Please try again or email Madame Della Rue directly at{" "}
                      <a href="mailto:QueenDellaRue@iCloud.com" className="text-antique-gold hover:text-haint-blue underline transition-colors duration-300">
                        QueenDellaRue@iCloud.com
                      </a>.
                    </p>
                  </div>
                )}

                {/* Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 flex items-center justify-center bg-burgundy hover:bg-antique-gold text-parchment hover:text-deep-black border border-antique-gold text-[10px] tracking-[0.4em] font-bold uppercase transition-all duration-500 rounded-[2px] disabled:opacity-50"
                >
                  {isSubmitting ? "Sending Request..." : "Request a Consultation"}
                </button>
              </form>
            </motion.div>
          )}

          {/* FORM 4: GENERAL CONTACT FORM */}
          {selectedFormType === "contact" && (
            <motion.div
              key="contact-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-serif text-parchment italic">
                  General Contact & Inquiries
                </h3>
                <div className="text-xs md:text-sm text-antique-gold font-light leading-relaxed space-y-4">
                  <p>For collaborations, business questions, booking support, or website assistance, send a message below.</p>
                  <p>Please use the service-request forms for readings, rootwork, or petition services.</p>
                  <p>Madame Della Rue will respond as soon as possible.</p>
                  <div className="pt-2 flex flex-col items-center gap-4">
                    <a
                      href="mailto:QueenDellaRue@iCloud.com"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-burgundy/20 border border-antique-gold/30 hover:border-antique-gold text-antique-gold hover:text-parchment transition-all duration-300 rounded-[2px]"
                      aria-label="Email Madame Della Rue"
                    >
                      Email Madame Della Rue
                    </a>

                    <div className="flex justify-center items-center gap-6 mt-2">
                      <a
                        href="https://www.instagram.com/madamdellarue?igsh=MTVqd2plaDk0aWw4cg%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-haint-blue transition-all duration-350"
                        aria-label="Follow Madame Della Rue on Instagram"
                        title="Follow Madame Della Rue on Instagram"
                      >
                        <Instagram className="w-5 h-5 hover:scale-105 transition-transform text-parchment hover:text-antique-gold" />
                      </a>
                      <a
                        href="https://www.tiktok.com/@madamdellarue?_r=1&_t=ZP-97gKFcN7aYR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-haint-blue transition-all duration-350"
                        aria-label="Follow Madame Della Rue on TikTok"
                        title="Follow Madame Della Rue on TikTok"
                      >
                        <Tiktok className="w-5 h-5 hover:scale-105 transition-transform text-parchment hover:text-antique-gold" />
                      </a>
                      <a
                        href="https://www.facebook.com/share/1JybC4je7m/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-haint-blue transition-all duration-350"
                        aria-label="Follow Madame Della Rue on Facebook"
                        title="Follow Madame Della Rue on Facebook"
                      >
                        <Facebook className="w-5 h-5 hover:scale-105 transition-transform text-parchment hover:text-antique-gold" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={(e) => handleFormSubmit(e, "contact")} method="POST" className="space-y-12 bg-deep-black/30 border border-white/5 p-8 md:p-12 rounded-[2px]">
                <input type="hidden" name="_subject" value="New General Contact Message" />

                {/* Basic Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Danielle Carter"
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                    />
                  </div>

                  <div className="relative group">
                    <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="danielle@email.com"
                      className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="relative group">
                  <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    name="subject"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="e.g. Collaboration inquiry, booking support, or website question"
                    className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider outline-none transition-colors duration-300"
                  />
                </div>

                {/* Message */}
                <div className="relative group">
                  <label className="block text-[8px] tracking-[0.25em] text-antique-gold uppercase mb-2">Message</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Write your message here."
                    className="w-full bg-transparent border-b border-white/10 focus:border-haint-blue py-2 text-parchment text-sm tracking-wider leading-relaxed outline-none transition-colors duration-300"
                  />
                </div>

                {/* Error message */}
                {error && selectedFormType === "contact" && (
                  <div className="bg-[#1c1212]/50 border border-burgundy/30 p-4 rounded-[2px] flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                    <p className="text-[11px] text-parchment/80 leading-relaxed font-light">
                      Your request could not be sent. Please try again or email Madame Della Rue directly at{" "}
                      <a href="mailto:QueenDellaRue@iCloud.com" className="text-antique-gold hover:text-haint-blue underline transition-colors duration-300">
                        QueenDellaRue@iCloud.com
                      </a>.
                    </p>
                  </div>
                )}

                {/* Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 flex items-center justify-center bg-burgundy hover:bg-antique-gold text-parchment hover:text-deep-black border border-antique-gold text-[10px] tracking-[0.4em] font-bold uppercase transition-all duration-500 rounded-[2px] disabled:opacity-50"
                >
                  {isSubmitting ? "Sending Message..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}
