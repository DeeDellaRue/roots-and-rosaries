/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, RotateCcw } from "lucide-react";
import { TarotCard } from "../types";

export default function CardDeck() {
  const CARD_POOL: TarotCard[] = [
    {
      id: "pool-1",
      numeral: "I",
      title: "The Road Opens Slowly",
      faceText: "The path is not closed.",
      message: "The path is not closed. It is asking for patience, preparation, and discernment. Move one step at a time and watch for the signs that repeat.",
      accent: "gold"
    },
    {
      id: "pool-2",
      numeral: "II",
      title: "Under the Madonna’s Gaze",
      faceText: "Protection surrounds the path meant for you.",
      message: "You are being asked to move with prayer, patience, and discernment. Protection surrounds the path that is meant for you.",
      accent: "haint"
    },
    {
      id: "pool-3",
      numeral: "III",
      title: "The Ancestors Are Near",
      faceText: "You are not walking alone.",
      message: "You are not walking alone. Something in your bloodline remembers how to survive, how to pray, and how to find the way forward.",
      accent: "gold"
    },
    {
      id: "pool-4",
      numeral: "IV",
      title: "Clean Hands, Clear Road",
      faceText: "Release what has been clinging.",
      message: "Release what has been clinging to your spirit. A cleansing of thought, space, and intention may help the next door open.",
      accent: "burgundy"
    },
    {
      id: "pool-5",
      numeral: "V",
      title: "The Candle Knows",
      faceText: "Set your intention with care.",
      message: "Set your intention with care. What you feed with attention grows. What you starve with discipline loses its hold.",
      accent: "gold"
    },
    {
      id: "pool-6",
      numeral: "VI",
      title: "Crossroads Lesson",
      faceText: "Not every choice requires fear.",
      message: "Not every choice requires fear. Some crossroads appear because Spirit is giving you permission to choose differently.",
      accent: "haint"
    },
    {
      id: "pool-7",
      numeral: "VII",
      title: "The Root Beneath",
      faceText: "Look beneath the surface.",
      message: "Look beneath the surface. The answer is not only in what is happening now, but in what has been planted, inherited, repeated, or avoided.",
      accent: "gold"
    },
    {
      id: "pool-8",
      numeral: "VIII",
      title: "The Saint at the Door",
      faceText: "Help may arrive through a person or sign.",
      message: "Help may arrive through a person, a sign, a prayer, or a sudden knowing. Stay humble enough to recognize support when it comes.",
      accent: "haint"
    },
    {
      id: "pool-9",
      numeral: "IX",
      title: "Do Not Rush the Omen",
      faceText: "Let the message unfold.",
      message: "A sign does not always reveal its full meaning immediately. Let the message unfold before you act on impulse.",
      accent: "burgundy"
    },
    {
      id: "pool-10",
      numeral: "X",
      title: "The House Must Be Tended",
      faceText: "Your home, body, and spirit are connected.",
      message: "Your home, body, and spirit are connected. Begin with what is closest to you. Order in one place can invite order elsewhere.",
      accent: "gold"
    },
    {
      id: "pool-11",
      numeral: "XI",
      title: "A Prayer Before the Step",
      faceText: "Before you move, pray.",
      message: "Before you move, pray. Before you answer, listen. Before you decide, ask whether your spirit feels expanded or contracted.",
      accent: "haint"
    },
    {
      id: "pool-12",
      numeral: "XII",
      title: "The Unseen Witness",
      faceText: "Move with integrity.",
      message: "There are forces around you that see more than you can see right now. Move with integrity even when no one else is watching.",
      accent: "gold"
    },
    {
      id: "pool-13",
      numeral: "XIII",
      title: "The Threshold",
      faceText: "Standing between what was and what is becoming.",
      message: "You are standing between what was and what is becoming. Do not drag old fear into a door that requires a new version of you.",
      accent: "burgundy"
    },
    {
      id: "pool-14",
      numeral: "XIV",
      title: "Return to the Ancestors",
      faceText: "Return to the dead who love you.",
      message: "When you feel scattered, return to the dead who love you, the prayers that steady you, and the practices that bring you back to yourself.",
      accent: "gold"
    },
    {
      id: "pool-15",
      numeral: "XV",
      title: "The Bowl Receives",
      faceText: "Pour out what is too heavy.",
      message: "Pour out what is too heavy to keep carrying. Some burdens are not meant to be solved in the mind alone. Give them to Spirit.",
      accent: "haint"
    },
    {
      id: "pool-16",
      numeral: "XVI",
      title: "The Key Is Discernment",
      faceText: "Not every open door is your door.",
      message: "Not every open door is your door. Not every delay is denial. Discernment is the difference between movement and alignment.",
      accent: "gold"
    },
    {
      id: "pool-17",
      numeral: "XVII",
      title: "The Flame Remains",
      faceText: "Protect that flame.",
      message: "Even when the room feels dark, something sacred in you is still burning. Protect that flame. Feed it with truth, prayer, and courage.",
      accent: "burgundy"
    },
    {
      id: "pool-18",
      numeral: "XVIII",
      title: "The Message Repeats",
      faceText: "An invitation to finally hear.",
      message: "If the same lesson keeps returning, it is not punishment. It is an invitation to finally hear what your spirit already knows.",
      accent: "haint"
    },
    {
      id: "pool-19",
      numeral: "XIX",
      title: "The Rosary and the Root",
      faceText: "Prayer and action belong together.",
      message: "Prayer and action belong together. Speak your petition, but also prepare the ground for what you are asking to receive.",
      accent: "gold"
    },
    {
      id: "pool-20",
      numeral: "XX",
      title: "The Water Carries It",
      faceText: "Let the water carry away what you outgrew.",
      message: "Let the water carry away what your spirit has outgrown. Grief, fear, and confusion can move when you stop gripping them so tightly.",
      accent: "haint"
    },
    {
      id: "pool-21",
      numeral: "XXI",
      title: "The Bridge Holds",
      faceText: "You do not have to split yourself to be whole.",
      message: "You do not have to split yourself to be whole. The places you come from, the spirits who walk with you, and the wisdom you carry can meet within you.",
      accent: "gold"
    }
  ];

  // Keep track of which card indices are flipped
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeCards, setActiveCards] = useState<TarotCard[]>(() => {
    const shuffled = [...CARD_POOL].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  });
  const [isShuffling, setIsShuffling] = useState(false);

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleShuffle = () => {
    setIsShuffling(true);
    setFlippedCards({}); // Unflip all first
    
    setTimeout(() => {
      const shuffled = [...CARD_POOL].sort(() => 0.5 - Math.random());
      setActiveCards(shuffled.slice(0, 3));
      setIsShuffling(false);
    }, 600);
  };

  return (
    <section id="interactive" className="py-24 md:py-32 px-6 md:px-12 text-center bg-deep-black">
      <div className="max-w-5xl mx-auto">
        
        {/* Title Block */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-serif italic mb-5 text-parchment"
          >
            The Card That Finds You
          </motion.h2>
          <p className="text-xs uppercase italic tracking-[0.45em] text-haint-blue max-w-lg mx-auto leading-relaxed">
            Take a slow breath. Set your intention. Allow the message to meet you.
          </p>
        </div>

        {/* Tarot Layout Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 min-h-[380px] mb-16">
          {activeCards.map((card, index) => {
            const isFlipped = !!flippedCards[card.id];
            
            return (
              <div
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="h-[360px] cursor-pointer group"
                style={{ perspective: "1200px" }}
              >
                {/* Flippable Inner Body */}
                <div
                  className={`relative w-full h-full duration-700 transition-transform select-none ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  
                  {/* FRONT side of Card (Unflipped - Burgundy, gold stars pattern) */}
                  <div
                    className="absolute inset-0 w-full h-full bg-burgundy rounded-[4px] border border-antique-gold/45 flex flex-col items-center justify-between p-10 backface-hidden shadow-xl"
                    style={{
                      backgroundImage: "radial-gradient(var(--antique-gold) 0.5px, transparent 0.5px)",
                      backgroundSize: "20px 20px"
                    }}
                  >
                    {/* Top Accent details */}
                    <div className="w-full flex justify-between items-center opacity-65 text-antique-gold font-serif italic text-xs">
                      <span>✦</span>
                      <span>Roots & Rosaries</span>
                      <span>✦</span>
                    </div>

                    {/* Centered Roman Numeral with hover pulse */}
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-serif text-antique-gold text-[70px] leading-none tracking-widest block font-light select-none group-hover:scale-105 transition-transform duration-300">
                        {index === 0 ? "I" : index === 1 ? "II" : "III"}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.4em] text-antique-gold/50 font-semibold mt-2">
                        Reveal message
                      </span>
                    </div>

                    {/* Bottom Accent */}
                    <div className="text-[12px] opacity-70 text-antique-gold">
                      • ✦ •
                    </div>
                  </div>

                  {/* BACK side of Card (Flipped - Charcoal and haint-blue or gold trim) */}
                  <div
                    className={`absolute inset-0 w-full h-full bg-charcoal rounded-[4px] border flex flex-col items-center justify-center p-8 backface-hidden rotate-y-180 shadow-2xl transition-all duration-300 ${
                      card.accent === "haint"
                        ? "border-haint-blue/50 outline-1 outline-haint-blue/10"
                        : "border-antique-gold/50 outline-1 outline-antique-gold/10"
                    }`}
                  >
                    {/* Ornate inner border */}
                    <div className="absolute inset-4 border border-white/[0.03] pointer-events-none rounded-[2px]" />

                    <div className="relative z-10 space-y-6">
                      <Sparkles className={`w-5 h-5 mx-auto ${
                        card.accent === "haint" ? "text-haint-blue" : "text-antique-gold"
                      }`} />

                      <h4 className="text-[10px] uppercase font-sans tracking-[0.4em] font-bold text-parchment/40">
                        {card.title}
                      </h4>
                      
                      <p className="font-serif italic text-sm md:text-md text-parchment/90 leading-relaxed px-2 font-medium">
                        "{card.message}"
                      </p>

                      <div className="h-[1px] w-8 bg-white/10 mx-auto" />
                      
                      <p className="text-[9px] uppercase tracking-wider text-antique-gold/50 font-medium">
                        Click to turn back
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet disclaimer if any card is flipped */}
        {Object.values(flippedCards).some((v) => v) && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] text-parchment/40 italic tracking-wider mb-8 max-w-md mx-auto"
          >
            This is a general reflective message and does not replace a personal reading.
          </motion.p>
        )}

        {/* Shuffler Controller */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center"
        >
          <button
            onClick={handleShuffle}
            disabled={isShuffling}
            className="flex items-center gap-3 px-8 py-4 bg-charcoal hover:bg-burgundy text-antique-gold hover:text-parchment border border-antique-gold/20 hover:border-antique-gold text-[10px] uppercase tracking-[0.3em] transition-all duration-300 rounded-[2px] cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isShuffling ? "animate-spin" : ""}`} />
            <span>{isShuffling ? "Shuffling Threshold..." : "Whisper into the Deck"}</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
