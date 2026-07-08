/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import deesicilianImg from "../assets/images/deesicilian.png";
import ceremonialWaterCleanImg from "../assets/images/ceremonial-water-clean-madame-della-rue.jpg";

export default function ThePath() {
  return (
    <section id="path" className="py-24 md:py-32 px-6 md:px-12 bg-deep-black/30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-24">
        
        {/* Left Aspect: Image / Quote Sidebar */}
        <div className="md:col-span-2">
          <div className="sticky top-32">
            
            {/* Original Single Image Column */}
            <div className="relative group">
              {/* Outer faint border overlay for a premium look */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-haint-blue/20 -z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"></div>
              
              {/* Main Image framing */}
              <div className="border border-antique-gold/40 p-3 bg-charcoal/40 transition-colors duration-500 group-hover:border-antique-gold">
                <img
                  src={ceremonialWaterCleanImg}
                  className="w-full object-cover transition duration-700 contrast-110 brightness-95 hover:brightness-100"
                  referrerPolicy="no-referrer"
                  alt="Madame Dee Della Rue dancing at the coastline during golden hour sunset"
                />
              </div>
            </div>

            {/* Embedded Haint Blue Quote */}
            <div className="mt-12 space-y-3 pl-4 border-l border-antique-gold/35">
              <h3 className="font-serif italic text-2xl md:text-3xl text-haint-blue leading-relaxed">
                "The ancestors guide me.<br />The saints guard the way."
              </h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-parchment/40 font-medium">
                — Madame Dee Della Rue
              </p>
            </div>
          </div>
        </div>

        {/* Right Aspect: Narrative Block */}
        <div className="md:col-span-3 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-parchment italic mb-10 leading-tight">
              The Path of the Bridge
            </h2>

            {/* The scrollable custom narrative container */}
            <div className="story-container font-light text-sm md:text-base leading-[2] text-parchment/85 space-y-8 pr-6">
              
              {/* Paragraph 1 */}
              <p className="story-para">
                I am <span className="text-antique-gold font-semibold uppercase tracking-widest">Madame Dee Della Rue</span>, 
                a spiritualist, conjure woman, seer, and ancestral practitioner whose work stands at the meeting place of{" "}
                <span className="text-antique-gold font-medium">Black American Hoodoo</span>{" "}
                and <span className="text-antique-gold font-medium">Sicilian folk spirituality</span>.
              </p>

              {/* Paragraph 2 */}
              <p className="story-para">
                My practice is rooted in ancestral veneration, intuitive and spirit-led divination, rootwork, prayer, and devotional relationships with the Saints.
              </p>

              {/* Added Paragraph */}
              <p className="story-para">
                I am a perpetual <span className="text-antique-gold font-medium">student</span> of Spirit. I believe spiritual growth requires continued learning, discernment, humility, and a willingness to deepen my understanding of both the traditions I carry and the responsibilities that come with serving others.
              </p>

              {/* Paragraph 3 */}
              <p className="story-para !mt-5">
                My practice was not created by choosing two traditions that looked beautiful together. 
                It was born from <span className="italic text-antique-gold font-medium">who I already was</span>. 
                I come from both Black American and Sicilian bloodlines—two ancestral streams shaped by survival, devotion, 
                family, spiritual resistance, and an understanding that the seen and unseen worlds are never completely separate.
              </p>

              {/* Subsection: Awakening of Sight */}
              <div className="pt-4">
                <h4 className="text-haint-blue uppercase tracking-widest text-xs font-bold mb-4 font-sans">
                  The Awakening of Sight
                </h4>
                <p className="story-para">
                  I did not always have language for my spiritual sensitivity. From an early age, I could feel changes in people 
                  and rooms before anything was spoken aloud. Over time, my work with Hoodoo, the Saints, and my ancestors helped me recognize 
                  that what I carried was more than sensitivity. <span className="italic text-antique-gold font-medium">It was sight.</span>
                </p>
                <p className="story-para">
                  Through study, initiation, and disciplined development, I began to understand myself as a Spiritualist and a bridge. 
                  The greater responsibility lies in discernment: understanding what is being shown and how to deliver it without 
                  taking away another person’s authority over their own life.
                </p>
              </div>

              {/* Subsection: The Traditions */}
              <div className="pt-4">
                <h4 className="text-haint-blue uppercase tracking-widest text-xs font-bold mb-4 font-sans">
                  The Traditions
                </h4>
                <p className="story-para">
                  My foundation in <span className="text-antique-gold font-medium">Hoodoo</span> connects me to ancestral 
                  reverence, biblical prayer, rootwork, and traditional spiritual methods born from Black survival and faith. My 
                  <span className="text-antique-gold font-medium"> Sicilian inheritance </span> 
                  brings the language of the Saints, the Madonna, folk prayer, and the intimate relationship between family, spirit, and faith.
                </p>
                <p className="story-para">
                  Roots & Rosaries was created from that meeting place. Within me, the Bible rests beside the rosary. 
                  The roots sit near the medals of the Saints. I am not half of one tradition and half of another. 
                  <span className="text-haint-blue font-medium italic"> I am the bridge between them.</span>
                </p>

                {/* Sicilian Heritage portrait permanently embedded here */}
                <div className="mt-12 border border-antique-gold/20 p-5 sm:p-6 md:p-8 bg-deep-black/40 rounded-[2px] relative group overflow-hidden shadow-2xl">
                  <div className="absolute -bottom-2 -right-2 w-full h-full border border-antique-gold/5 -z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"></div>
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
                    <div className="w-48 h-64 sm:w-52 sm:h-72 lg:w-48 lg:h-64 xl:w-52 xl:h-72 shrink-0 border border-antique-gold/30 p-2 bg-charcoal/40 shadow-lg transition-all duration-500 group-hover:border-antique-gold/50">
                      <img
                        src={`${deesicilianImg}?v=3`}
                        className="w-full h-full object-cover transition duration-700 contrast-105 brightness-95 hover:brightness-100"
                        referrerPolicy="no-referrer"
                        alt="Madame Della Rue - Sicilian Lineage Portrait"
                      />
                    </div>
                    <div className="space-y-4 text-center lg:text-left flex-1 py-1 min-w-0 px-2 lg:px-0 lg:pr-4">
                      <h5 className="text-sm uppercase tracking-widest text-antique-gold font-bold leading-relaxed">The Sicilian Inheritance</h5>
                      <p className="text-xs sm:text-sm text-parchment/80 leading-relaxed font-light italic">
                        “My Sicilian lineage carries a devotional language of prayer, sacred images, candlelight, the Madonna, the Saints, and reverence for the dead. These traditions do not sit apart from my Hoodoo practice; they meet within me while remaining fully themselves.”
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Subsection: The Dead & The Living - SPECIFICALLY requested to preserve paragraphs and this narrative */}
              <div className="pt-10 border-t border-antique-gold/10 mt-10">
                <h4 className="text-haint-blue uppercase tracking-widest text-xs font-bold mb-4 font-sans">
                  The Dead & The Living
                </h4>
                <p className="story-para">
                  My work is deeply connected to the <span className="italic text-antique-gold font-medium">Beloved Dead</span>—the ancestors 
                  and elevated guides whose prayers continue beyond the grave. I also hold compassion for the forgotten dead—the 
                  <span className="text-haint-blue italic"> Lonesomes</span>—but I practice strict discernment. 
                  My spiritual space is protected.
                </p>
                <p className="story-para">
                  I am here to help people listen more closely—to their own intuition, to the patterns around them, and to the spiritual 
                  truths they may already feel but have not yet been able to name. I hold the threshold with care and dignity, honoring both sides 
                  of the veil.
                </p>
              </div>

              {/* Subsection: How I Serve */}
              <div className="pt-6 border-t border-antique-gold/20 mt-6">
                <h4 className="text-antique-gold uppercase tracking-[0.2em] text-xs font-bold mb-4 font-sans">
                  How I Serve
                </h4>
                <p className="story-para">
                  I work with people seeking clarity, spiritual direction, ancestral connection, protection, cleansing, and support at personal crossroads.
                </p>
                <p className="story-para">
                  Depending on the needs of the client and the guidance I receive, my work may include intuitive sight, cartomancy, rosary divination, charm casting, tea-leaf reading, dowsing, prayer, petition work, candle services, spiritual baths, protection work, road opening, and personalized rootwork.
                </p>
                <p className="story-para">
                  Not every situation requires the same method. I approach each request individually and use discernment to determine which tools or services may be most appropriate.
                </p>
                <p className="story-para">
                  My role is not to make decisions for you or promise a specific outcome. My purpose is to help you better understand what may be influencing your path, what Spirit may be bringing forward, and what steps may help you move with greater clarity and intention.
                </p>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
