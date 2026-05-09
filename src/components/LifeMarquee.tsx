"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function LifeMarquee() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-ink py-24 text-cream md:py-36"
    >
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_30%,#facb48_0_8%,transparent_28%),radial-gradient(circle_at_80%_70%,#e7654f_0_6%,transparent_24%)]" />
      <motion.div
        className="relative flex w-max gap-8 whitespace-nowrap headline text-[20vw] text-butter md:text-[12vw]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        aria-hidden="true"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index}>PURE GRAINS · HEALTHY LIFE · </span>
        ))}
      </motion.div>
      <motion.div
        className="relative z-10 mx-auto mt-16 grid max-w-[1800px] gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:px-8"
        style={{ y }}
      >
        <p
          data-gsap="reveal"
          className="display-script max-w-md text-5xl leading-none text-butter md:text-7xl"
        >
          Eat right. Live strong.
        </p>
        <h2
          data-gsap="reveal"
          className="headline text-balance text-[10vw] leading-[0.9] text-cream md:text-[5.6vw]"
        >
          Nourishing your body, one grain at a time.
        </h2>
      </motion.div>
    </section>
  );
}
