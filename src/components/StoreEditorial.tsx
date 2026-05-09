"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "@/components/MagneticButton";
import { gallery } from "@/data/site";

export function StoreEditorial() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="tienda"
      ref={ref}
      className="relative overflow-hidden px-5 py-24 md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-12 grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="mb-3 font-grotesk text-sm font-black uppercase text-coral">
              Products / Health
            </p>
            <h2 className="headline w-full text-[15vw] text-ink md:text-[8vw] leading-none tracking-tight">
              grains that nourish
            </h2>
          </div>
          <p
            data-gsap="reveal"
            className="max-w-2xl text-balance text-xl font-semibold leading-tight md:text-2xl"
          >
            From muesli blends to ragi health packets and multi-millet mixes —
            discover a curated range of KIDULAN™ FOODS products crafted for a
            healthier, more vibrant lifestyle.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          style={{ x }}
        >
          {gallery.map((item, index) => (
            <article
              data-gsap="mask"
              className="image-mask distort-card group relative min-h-[40vh] overflow-hidden rounded-[1.5rem] bg-ink p-4 text-cream shadow-soft md:min-h-[66vh] md:p-5"
              key={item.title}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-contain scale-110 md:scale-[1.15] transition duration-700 group-hover:scale-[1.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-ink/10 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <p className="font-grotesk text-[10px] md:text-xs font-black uppercase text-butter">
                  {item.eyebrow}
                </p>
                <h3 className="headline mt-2 text-[1.8rem] leading-[0.9] md:mt-3 md:text-[2.2vw]">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="mt-12 flex flex-wrap gap-4">
          <MagneticButton href="#health" variant="green" icon>
            Health Benefits
          </MagneticButton>
          <MagneticButton href="#shop" variant="yellow" icon>
            Shop All Products
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
