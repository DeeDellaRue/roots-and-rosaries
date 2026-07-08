/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  name: string;
  service: string;
  onClose: () => void;
}

function getCleanRequestType(service: string): string {
  if (!service) return "";
  const lower = service.toLowerCase();
  
  if (lower.includes("quick clarity")) {
    return "Quick Clarity Reading";
  }
  if (lower.includes("detailed spiritual")) {
    return "Detailed Spiritual Insight Reading";
  }
  if (lower.includes("ancestral guidance")) {
    return "Ancestral Guidance Reading";
  }
  if (lower.includes("live spiritual") || lower.includes("live_consultation") || lower.includes("live consultation")) {
    return "Live Spiritual Consultation";
  }
  if (lower.includes("ritual consultation") || lower.includes("ritual & rootwork") || lower.includes("rootwork") || lower.includes("ritual")) {
    return "Ritual & Rootwork Consultation";
  }
  if (lower.includes("altar light") || lower.includes("petition")) {
    return "Community Altar Light Petition";
  }
  if (lower.includes("general inquiry") || lower.includes("contact") || lower.includes("guidance")) {
    return "General Contact & Inquiries";
  }
  
  return service;
}

export default function FeedbackModal({ isOpen, name, service, onClose }: FeedbackModalProps) {
  const requestType = getCleanRequestType(service);

  let bodyContent = null;
  if (requestType === "Community Altar Light Petition") {
    bodyContent = (
      <div className="space-y-4 text-center">
        <p className="text-sm font-light tracking-wide text-parchment/85 leading-relaxed">
          Thank you, <span className="text-antique-gold font-medium">{name || "visitor"}</span>.
        </p>
        <p className="text-sm font-light tracking-wide text-parchment/90 leading-relaxed">
          Your symbolic flame has been set on the virtual altar. This digital candle represents your submitted intention. Your request will be reviewed, and if accepted, you will receive payment instructions by email. Physical altar work and prayer service are confirmed only after payment is received.
        </p>
      </div>
    );
  } else if (!requestType) {
    bodyContent = (
      <p className="text-sm font-light tracking-wide text-parchment/80 leading-relaxed text-center">
        Your submission has been received by Madame Della Rue of Roots & Rosaries.
      </p>
    );
  } else if (!name || !name.trim()) {
    bodyContent = (
      <div className="space-y-4 text-center">
        <p className="text-sm font-light tracking-wide text-parchment/80 leading-relaxed">
          Thank you. Your request for <span className="text-antique-gold font-medium">{requestType}</span> has been received by Madame Della Rue of Roots & Rosaries.
        </p>
        <p className="text-sm font-light tracking-wide text-parchment/80 leading-relaxed">
          Your submission will be reviewed, and you will receive an email with the appropriate next steps. Please watch your inbox, including your spam or junk folder.
        </p>
      </div>
    );
  } else {
    bodyContent = (
      <div className="space-y-4 text-center">
        <p className="text-sm font-light tracking-wide text-parchment/80 leading-relaxed">
          Thank you, <span className="text-antique-gold font-medium">{name}</span>. Your request for <span className="text-antique-gold font-medium">{requestType}</span> has been received by Madame Della Rue of Roots & Rosaries.
        </p>
        <p className="text-sm font-light tracking-wide text-parchment/80 leading-relaxed">
          Your submission will be reviewed, and you will receive an email with the appropriate next steps. Please watch your inbox, including your spam or junk folder.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal content body */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-charcoal border border-antique-gold/45 text-parchment p-8 md:p-12 max-w-lg w-full text-center rounded-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Embedded delicate inner border */}
            <div className="absolute inset-2 border border-white/[0.02] pointer-events-none rounded-[2px]" />

            {/* Close button top right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-parchment/40 hover:text-antique-gold p-1 transition-colors"
              aria-label="Close message dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 space-y-6">
              
              {/* Animated icon circle */}
              <div className="mx-auto w-14 h-14 bg-burgundy/40 border border-antique-gold/50 flex items-center justify-center rounded-full text-antique-gold shadow-[0_0_15px_rgba(197,160,89,0.2)] animate-pulse">
                <Sparkles className="w-6 h-6" />
              </div>

              {/* Title */}
              <h3 className="font-serif italic text-2xl text-antique-gold leading-tight">
                Your Request Has Been Received
              </h3>

              {/* Message text with beautiful variables */}
              <div className="border-y border-white/5 py-6">
                {bodyContent}
              </div>

              {/* Close trigger button */}
              <button
                onClick={onClose}
                className="w-full h-12 flex items-center justify-center text-center bg-burgundy hover:bg-antique-gold hover:text-deep-black text-parchment text-[10px] uppercase font-bold tracking-[0.3em] border border-antique-gold transition-all duration-400 rounded-[2px] cursor-pointer"
              >
                Close
              </button>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
