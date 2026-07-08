/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Instagram, Facebook } from "lucide-react";

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

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ThePath from "./components/ThePath";
import Services from "./components/Services";
import VirtualAltar from "./components/VirtualAltar";
import CardDeck from "./components/CardDeck";
import ContactForm from "./components/ContactForm";
import FeedbackModal from "./components/FeedbackModal";
import TraditionsFAQ from "./components/TraditionsFAQ";
import footerLogoImg from "./assets/images/roots-rosaries-main-logo-transparent-web.png";

export default function App() {
  const [view, setView] = useState<"home" | "faq">("home");
  const [selectedFormType, setSelectedFormType] = useState<"guidance" | "reading" | "consultation" | "contact" | "live_consultation">("guidance");
  const [selectedReadingPackage, setSelectedReadingPackage] = useState<string>("quick");
  const [initialConsultationNature, setInitialConsultationNature] = useState<string>("");
  const [successModal, setSuccessModal] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedService, setSubmittedService] = useState("");

  const handleNavClick = (href: string) => {
    if (href === "faq") {
      setView("faq");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setView("home");
      setTimeout(() => {
        const targetId = href.startsWith("#") ? href.slice(1) : href;
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else if (href === "#home" || href === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
    }
  };

  const handleSelectReadingPackage = (pkgId: string) => {
    setView("home");
    setSelectedReadingPackage(pkgId);
    if (pkgId === "live") {
      setSelectedFormType("live_consultation");
    } else {
      setSelectedFormType("reading");
    }
    
    // Smoothly scroll down directly to the Contact / Request Form
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const handleSelectConsultation = (initialNature?: string) => {
    setView("home");
    if (initialNature) {
      setInitialConsultationNature(initialNature);
    }
    setSelectedFormType("consultation");
    
    // Smoothly scroll down directly to the Contact / Request Form
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const handleOpenConsultationDirect = () => {
    setView("home");
    setSelectedFormType("guidance");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const handleContactClickDirect = () => {
    setView("home");
    setSelectedFormType("contact");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const handleFormSuccess = (data: { name: string; service: string }) => {
    setSubmittedName(data.name);
    setSubmittedService(data.service);
    setSuccessModal(true);
  };

  return (
    <div className="bg-lace min-h-screen relative selection:bg-antique-gold/20 selection:text-antique-gold antialiased">
      {/* Dynamic old-world Smoke & Haze overlays */}
      <div className="haze-container">
        <div className="haze-layer-1" />
        <div className="haze-layer-2" />
        <div className="haze-layer-3" />
      </div>

      {/* Floating golden ember sparks drifting up the viewport (candlelit warmth) */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(10)].map((_, i) => {
          const left = 5 + (i * 9) + Math.random() * 5;
          const size = 1.5 + Math.random() * 2;
          const delay = i * 2.2;
          const duration = 15 + Math.random() * 12;
          return (
            <div
              key={i}
              className="amber-spark"
              style={{
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animation: `raiseSpark ${duration}s linear ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* Floating Header */}
      <Navigation
        onOpenConsultation={handleOpenConsultationDirect}
        onContactClick={handleContactClickDirect}
        currentView={view}
        onViewChange={setView}
        onNavClick={handleNavClick}
      />

      {view === "home" ? (
        <>
          {/* Hero / Landing Entry */}
          <motion.div
            id="home"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Hero onInquire={handleOpenConsultationDirect} />
          </motion.div>

          {/* Narrative Section - Madame Dee Della Rue's lineage and journey */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ThePath />
          </motion.div>

          {/* Traditions FAQ Preview Section on Homepage */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <section id="traditions-preview" className="py-20 px-6 md:px-12 border-t border-white/5 bg-charcoal/20 text-center">
              <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl font-serif text-antique-gold italic leading-tight">
                  Understanding the Traditions
                </h2>
                <p className="text-sm md:text-base font-light tracking-wide text-parchment/85 leading-[1.8] max-w-2xl mx-auto">
                  Hoodoo and Sicilian folk spirituality are both ancestral ways of prayer, protection, survival, devotion, and spiritual remembrance. Learn more about the traditions that shape the work of Roots & Rosaries.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => handleNavClick("faq")}
                    className="px-6 md:px-8 py-3.5 border border-antique-gold text-[10px] uppercase tracking-[0.25em] text-antique-gold bg-transparent hover:bg-antique-gold hover:text-deep-black transition-all duration-300 rounded-[2px] cursor-pointer inline-flex items-center gap-2"
                  >
                    Read the Tradition FAQ
                  </button>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Services Showcase - Cards are designed carefully with unclipped Flex buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Services
              onSelectReadingPackage={handleSelectReadingPackage}
              onSelectConsultation={handleSelectConsultation}
            />
          </motion.div>

          {/* Interactive virtual altar of lights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <VirtualAltar onSubmitSuccess={handleFormSuccess} />
          </motion.div>

          {/* "The Card That Finds You" Interactive card flip generator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <CardDeck />
          </motion.div>

          {/* Alignment Request Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ContactForm
              selectedFormType={selectedFormType}
              selectedReadingPackage={selectedReadingPackage}
              initialConsultationNature={initialConsultationNature}
              onFormTypeChange={setSelectedFormType}
              onReadingPackageChange={setSelectedReadingPackage}
              onSubmitSuccess={handleFormSuccess}
            />
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TraditionsFAQ onClose={() => handleNavClick("home")} />
        </motion.div>
      )}

      {/* Atmospheric Spiritual Footer */}
      <footer className="py-20 text-center border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 space-y-6 flex flex-col items-center">
          <img
            src={footerLogoImg}
            alt="Roots & Rosaries logo"
            className="w-[160px] sm:w-[200px] md:w-[250px] object-contain mb-4 select-none filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] opacity-85 hover:opacity-100 transition-opacity duration-500"
            referrerPolicy="no-referrer"
          />
          <p className="text-antique-gold text-[11px] uppercase tracking-[0.4em] mb-4">
            &copy; 2026 The Spiritual House of Madame Della Rue
          </p>
          <div className="py-2 flex flex-col items-center gap-4">
            <a
              href="mailto:QueenDellaRue@iCloud.com"
              className="text-[11px] text-antique-gold hover:text-parchment tracking-[0.2em] uppercase font-light border-b border-antique-gold/25 hover:border-antique-gold transition-all duration-300 pb-1"
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
          <p className="text-[10px] text-parchment/35 uppercase tracking-[0.3em] font-light leading-relaxed max-w-xl mx-auto italic">
            "Rooted in tradition. Guided by spirit. Held with care. Discernment is our threshold."
          </p>
        </div>
      </footer>

      {/* Custom alignment feedback dialog */}
      <FeedbackModal
        isOpen={successModal}
        name={submittedName}
        service={submittedService}
        onClose={() => setSuccessModal(false)}
      />
    </div>
  );
}
