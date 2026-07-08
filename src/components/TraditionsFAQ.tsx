/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowLeft } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface TraditionsFAQProps {
  onClose: () => void;
}

export default function TraditionsFAQ({ onClose }: TraditionsFAQProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What is Hoodoo?",
      answer: "Hoodoo is a Black American spiritual tradition birthed through the survival, resistance, faith, and spiritual intelligence of enslaved African ancestors and their descendants in America. It carries ancestral wisdom, biblical faith, prayer, herbal knowledge, rootwork, protection, cleansing, and practical spiritual action.\n\nBecause enslaved people were often forced to hide, adapt, or disguise their African spiritual practices under colonial Christianity and systems of oppression, Hoodoo became a way to preserve power, pray for protection, work with Spirit, and survive what was meant to break them.\n\nIn my practice, Hoodoo is not performance or aesthetic. It is medicine, memory, responsibility, and one of the ways our ancestors worked with Spirit, roots, prayer, and discernment."
    },
    {
      id: 2,
      question: "What is Sicilian folk spirituality?",
      answer: "Sicilian folk spirituality is a devotional and ancestral way of relating to the sacred through prayer, the Madonna, the Saints, candles, holy images, family traditions, protection practices, folk remedies, signs, dreams, and reverence for the dead.\n\nIt is often lived through the home, the altar, the kitchen, the family line, and the rituals passed quietly from one generation to another. Like Hoodoo, it carries the wisdom of ancestors who used what they had to pray, protect, heal, endure, and remain connected to Spirit."
    },
    {
      id: 3,
      question: "How are Hoodoo and Sicilian folk spirituality similar?",
      answer: "Both traditions honor the seen and unseen worlds. Both understand that prayer, protection, cleansing, candles, petitions, ancestors, holy figures, signs, dreams, and spiritual discernment can be part of everyday life.\n\nBoth are ancestral ways of survival, devotion, protection, memory, and practical spiritual action. They come from people who had to rely on faith, family, Spirit, and what was available to them in order to endure, protect their homes, and care for their communities."
    },
    {
      id: 4,
      question: "How are Hoodoo and Sicilian folk spirituality different?",
      answer: "These traditions are not the same and should not be collapsed into one another.\n\nHoodoo is a Black American spiritual tradition shaped by African American history, enslavement, survival, biblical faith, ancestral power, rootwork, resistance, and the need to preserve spiritual practices under oppression.\n\nSicilian folk spirituality comes through Mediterranean, Catholic, ancestral, and regional folk practices tied to family, land, saints, the Madonna, devotional customs, protection, and reverence for the dead.\n\nI honor their differences while also recognizing where my own bloodlines, spirit work, and lived practice meet."
    },
    {
      id: 5,
      question: "How do you work with both lineages respectfully?",
      answer: "I do not treat these traditions as costumes, trends, or interchangeable aesthetics. I approach them as ancestral inheritances through prayer, study, humility, lived experience, spiritual instruction, and responsibility.\n\nHoodoo remains Hoodoo. Sicilian folk spirituality remains Sicilian folk spirituality. Where they meet in my practice, they meet through my bloodlines, my calling, my ancestors, and the guidance of Spirit."
    },
    {
      id: 6,
      question: "Do you mix the traditions together?",
      answer: "I do not force the traditions together. Some workings are rooted more clearly in Hoodoo. Some are devotional, ancestral, or saint-centered in ways that reflect Sicilian folk spirituality. Some work happens at the bridge between them.\n\nThe method depends on the request, the spiritual guidance received, and what is appropriate for the situation."
    },
    {
      id: 7,
      question: "What does “the bridge” mean in your practice?",
      answer: "“The bridge” represents the meeting place within me: Black American Hoodoo, Sicilian folk spirituality, ancestral veneration, prayer, divination, and spirit-led work.\n\nI am not half of one tradition and half of another. I carry both ancestral streams with reverence, discernment, and responsibility."
    },
    {
      id: 8,
      question: "Why do you mention Saints, ancestors, roots, and rosaries together?",
      answer: "Because these are part of the spiritual language I inherited and practice.\n\nThe roots speak to Hoodoo, plant medicine, protection, cleansing, conjure, and the spiritual knowledge carried by Black ancestors who survived and adapted under oppression.\n\nThe rosaries speak to prayer, devotion, the Madonna, the Saints, family faith, and the Sicilian folk-spiritual ways passed through my bloodline.\n\nThe ancestors remain central because they are the living memory behind the work."
    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen py-24 md:py-32 px-6 md:px-12 bg-deep-black/30 relative">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Breadcrumb / Back Navigation */}
        <div className="flex items-center">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-antique-gold hover:text-parchment transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Title Block */}
        <div className="space-y-4 border-b border-white/5 pb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-parchment italic leading-tight">
            Understanding the Traditions
          </h1>
          <p className="text-sm md:text-base font-light tracking-wide text-parchment/70 max-w-2xl leading-relaxed">
            A brief guide to the ancestral lineages, language, and spiritual foundations behind this work.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="border border-white/5 bg-charcoal/20 hover:border-antique-gold/25 transition-colors duration-300 rounded-[2px]"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full py-6 px-6 md:px-8 flex items-center justify-between gap-4 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <span className="font-serif italic text-lg md:text-xl text-antique-gold/90 hover:text-antique-gold transition-colors duration-300">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-antique-gold/60 transition-transform duration-500 ease-out flex-shrink-0 ${
                      isExpanded ? "rotate-180 text-antique-gold" : ""
                    }`}
                  />
                </button>

                {/* Collapsible Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/5 font-light text-sm md:text-base text-parchment/85 leading-relaxed space-y-4 whitespace-pre-wrap">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Back Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={onClose}
            className="px-8 py-4 border border-antique-gold text-[10px] uppercase tracking-[0.3em] text-antique-gold bg-transparent hover:bg-antique-gold hover:text-deep-black transition-all duration-300 rounded-[2px] cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
