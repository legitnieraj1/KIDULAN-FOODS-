"use client";

import { motion } from "framer-motion";

export function PageCurtain() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[95] grid place-items-center bg-ink text-cream"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
      aria-hidden="true"
    >
      <motion.div
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="headline text-[18vw] leading-none text-butter"
      >
        KIDULAN™ FOODS
      </motion.div>
    </motion.div>
  );
}
