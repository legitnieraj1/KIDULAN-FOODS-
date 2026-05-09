"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { HeroCanvas } from "@/components/HeroCanvas";
import { heroImages } from "@/data/site";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollYProgress, [0, 0.22], [1.05, 1.21]);

  return (
    <section className="relative mt-[64px] md:mt-[72px] min-h-[calc(100svh-64px)] md:min-h-[calc(100svh-72px)] overflow-hidden bg-ink text-cream">
      <motion.div
        className="absolute inset-0 block w-full h-full"
        style={{ scale: imageScale, willChange: "transform", transformOrigin: "top center" }}
        aria-hidden="true"
      >
        <a href="#shop" className="block w-full h-full absolute inset-0 cursor-pointer z-20">
          <span className="sr-only">Shop Now</span>
        </a>
        {/* Desktop Banner */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src={heroImages[0].src as string}
            alt={heroImages[0].alt}
            fill
            sizes="100vw"
            priority
            className="object-cover object-top"
          />
        </div>
        
        {/* Mobile Banner */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/images/HERO MOBILE.webp"
            alt={heroImages[0].alt}
            fill
            sizes="100vw"
            priority
            className="object-cover object-top"
          />
        </div>
      </motion.div>

      <HeroCanvas />


    </section>
  );
}
