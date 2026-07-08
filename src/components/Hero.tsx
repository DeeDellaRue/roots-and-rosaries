/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import ceremonialWaterImg from "../assets/images/ceremonial_water_photo_of_me.jpeg";

interface HeroProps {
  onInquire: () => void;
}

export default function Hero({ onInquire }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center px-6 pt-24 overflow-hidden"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 bg-deep-black">
        <img
          src={ceremonialWaterImg}
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-[0.28] select-none pointer-events-none filter brightness-[0.98] contrast-[1.12] saturate-[0.88]"
          referrerPolicy="no-referrer"
          alt="Subtle personal ceremonial water texture background"
        />
        {/* Soft, rich gradients to ground the visual depth, providing a dark overlay around 58% behind the text */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/58 to-deep-black pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-deep-black/40 via-transparent to-deep-black/40 pointer-events-none"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 w-full">
        {/* Subtitle Accent */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="flex flex-col items-center gap-1.5 mb-12 md:mb-16"
        >
          <span className="font-serif italic text-base sm:text-lg md:text-xl text-antique-gold font-light tracking-widest mb-1">
            The Spiritual House of Madame Della Rue
          </span>
          <div className="h-[1px] w-12 bg-haint-blue opacity-50 mb-1"></div>
          <h4 className="text-haint-blue uppercase tracking-[0.5em] text-[10px] md:text-[11px] font-bold">
            SPIRITUALIST • CONJURE WOMAN • SEER
          </h4>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7.5xl font-serif leading-[1.08] mb-10 text-parchment tracking-tight"
        >
          I am the Bridge because I was born from{" "}
          <span className="italic font-light text-antique-gold drop-shadow-[0_2px_8px_rgba(197,160,89,0.15)]">
            both shores
          </span>
          .
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="text-xs sm:text-sm md:text-lg font-light tracking-[0.08em] max-w-2xl mx-auto mb-14 text-parchment/90 leading-relaxed"
        >
          Madame Dee Della Rue offers grounded spiritual guidance at the crossroads
          of <span className="text-antique-gold font-medium">Black American Hoodoo</span> and{" "}
          <span className="text-antique-gold font-medium">Sicilian Folk Spirituality</span>.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          {/* Main Button with no text cropping */}
          <button
            onClick={onInquire}
            className="w-full sm:w-auto px-10 py-5 bg-burgundy border border-antique-gold font-semibold uppercase tracking-[0.3em] text-[10px] text-parchment hover:bg-antique-gold hover:text-deep-black transition-all duration-500 shadow-md backdrop-blur-xs rounded-[2px] cursor-pointer hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center"
          >
            Request a Service
          </button>

          <a
            href="#path"
            className="text-antique-gold hover:text-haint-blue uppercase text-[10px] tracking-[0.3em] transition-all duration-300 border-b border-antique-gold/20 hover:border-haint-blue pb-1.5"
          >
            Explore the lineage
          </a>
        </motion.div>
      </div>

      {/* Tiny slide indication icon */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/30 animate-bounce hidden md:block">
        <a href="#path" aria-label="Scroll down to the narrative path">
          <ChevronDown className="w-5 h-5 cursor-pointer hover:text-haint-blue transition-colors" />
        </a>
      </div>
    </section>
  );
}
