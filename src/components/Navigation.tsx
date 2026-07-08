/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  onOpenConsultation: () => void;
  onContactClick: () => void;
  currentView: "home" | "faq";
  onViewChange: (view: "home" | "faq") => void;
  onNavClick: (href: string) => void;
}

export default function Navigation({
  onOpenConsultation,
  onContactClick,
  currentView,
  onViewChange,
  onNavClick,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#path" },
    { name: "TRADITION FAQ", href: "faq" },
    { name: "SERVICES", href: "#services" },
    { name: "SUBMIT A PETITION", href: "#altar" },
    { name: "CARD MESSAGE", href: "#interactive" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      {/* Floating Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-45 transition-all duration-500 py-5 px-6 md:px-12 ${
          scrolled
            ? "bg-deep-black/92 backdrop-blur-md border-b border-antique-gold/15 py-4 boxShadow-lg"
            : "bg-transparent border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo / Branding */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavClick("#home");
            }}
            className="text-lg md:text-xl font-serif font-bold tracking-[0.4em] text-parchment hover:text-antique-gold transition-colors duration-300"
          >
            ROOTS & ROSARIES
          </a>

          {/* Desktop Right Hand Nav */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-12">
            <div className="flex space-x-4 lg:space-x-8 text-[11px] uppercase tracking-[0.2em] lg:tracking-[0.25em] font-medium text-parchment/70">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href === "faq" ? undefined : item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(item.href);
                    if (item.href === "#contact") {
                      onContactClick();
                    }
                  }}
                  className={`hover:text-haint-blue transition-colors duration-300 whitespace-nowrap cursor-pointer ${
                    item.href === "faq" && currentView === "faq"
                      ? "text-antique-gold font-semibold"
                      : ""
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* CTA in Navbar */}
            <button
              onClick={() => {
                onNavClick("#contact");
                onOpenConsultation();
              }}
              className="px-4 lg:px-6 py-2 border border-antique-gold text-[9px] uppercase tracking-[0.3em] text-antique-gold hover:bg-antique-gold hover:text-deep-black transition-all duration-300 rounded-[2px] whitespace-nowrap cursor-pointer"
            >
              Inquire
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-haint-blue p-1 focus:outline-none hover:text-antique-gold transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-deep-black/98 z-50 flex flex-col justify-between p-12 md:hidden"
          >
            <div>
              {/* Header inside Menu */}
              <div className="flex justify-between items-center mb-16">
                <span className="text-sm font-serif font-bold tracking-[0.3em] text-parchment">
                  ROOTS & ROSARIES
                </span>
                <button
                  onClick={toggleMenu}
                  className="text-haint-blue p-1"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu Options */}
              <div className="flex flex-col space-y-5 text-2xl sm:text-3xl font-serif italic text-parchment/90 pl-3">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.name}
                    href={item.href === "faq" ? undefined : item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      onNavClick(item.href);
                      if (item.href === "#contact") {
                        onContactClick();
                      }
                    }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.08 }}
                    className={`hover:text-antique-gold hover:translate-x-2 transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                      item.href === "faq" && currentView === "faq"
                        ? "text-antique-gold font-semibold"
                        : ""
                    }`}
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-5 h-5 text-antique-gold opacity-50" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer inside mobile menu */}
            <div className="border-t border-white/10 pt-8 flex flex-col gap-6 pl-3">
              <span className="text-[10px] uppercase tracking-[0.15em] text-antique-gold">
                Madame Dee Della Rue • Spiritualist & practitioner
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavClick("#contact");
                  onOpenConsultation();
                }}
                className="w-full text-center bg-burgundy hover:bg-antique-gold hover:text-deep-black text-parchment py-4 border border-antique-gold text-[10px] uppercase tracking-[0.3em] transition-all duration-300 rounded-[2px]"
              >
                Request Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
