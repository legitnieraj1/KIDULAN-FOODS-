"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";


export function StickyStory() {
  const sectionRef = useRef<HTMLElement | null>(null);


  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="relative overflow-hidden px-5 py-16 text-ink md:px-8 md:py-20"
    >
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex flex-col justify-center lg:sticky lg:top-32 lg:h-fit">
          <h2 className="headline text-[19vw] text-butter md:text-[9.5vw] lg:text-[7.5vw] leading-[0.85] tracking-tight">
            <div className="flex flex-col">
              <span>EAT WELL,</span>
              <span>LIVE</span>
              <span>BETTER</span>
            </div>
          </h2>
          <p
            className="mt-8 max-w-lg text-balance text-lg font-semibold leading-snug md:text-xl"
          >
            KIDULAN™ FOODS is rooted in the belief that real nutrition starts with
            ancient grains. From power-packed ragi to wholesome muesli and
            nutrient-dense millets — every packet carries purpose.
          </p>
          <a
            href="#shop"
            className="mt-8 inline-flex w-fit items-center justify-center rounded-[10px] bg-butter px-[36px] py-[14px] font-grotesk text-sm font-black uppercase tracking-wide text-ink transition-all duration-300 hover:scale-105 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-butter"
          >
            Shop Now
          </a>
          <motion.div
            className="mt-16 flex justify-center w-full"
            style={{ rotate: -8 }}
          >
            <a 
              href="https://www.instagram.com/kidulanfoods_india/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="display-script text-coral text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] whitespace-nowrap transition-transform hover:scale-105"
            >
              @KIDULAN FOODS
            </a>
          </motion.div>
        </div>

        <div className="flex items-center justify-center lg:pb-16 relative w-full">
          <motion.div
            className="relative h-[40vh] w-[55%] md:h-[65vh] md:w-[50%] drop-shadow-2xl z-10"
            initial={{ rotate: -6, scale: 1.2 }}
            animate={{ rotate: -6, scale: 1.2 }}
            whileHover={{ scale: 1.26, rotate: -2, zIndex: 30 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/sprout.webp"
              alt="Sprouted Health Mix"
              fill
              sizes="(min-width: 1024px) 40vw, 55vw"
              className="object-contain"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            className="relative h-[35vh] w-[50%] md:h-[60vh] md:w-[45%] drop-shadow-2xl z-20 translate-y-8 md:translate-y-16 -ml-12 md:-ml-24"
            initial={{ rotate: 6, scale: 1.2 }}
            animate={{ rotate: 6, scale: 1.2 }}
            whileHover={{ scale: 1.26, rotate: 2, zIndex: 30 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/honeymuslie.webp"
              alt="Honey Muesli"
              fill
              sizes="(min-width: 1024px) 35vw, 50vw"
              className="object-contain"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
