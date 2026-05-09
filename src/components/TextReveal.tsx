"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

type TextRevealProps = {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
};

export function TextReveal({
  text,
  className,
  once = true,
  delay = 0
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <span className={clsx("inline-flex flex-wrap overflow-hidden", className)}>
      {words.map((word, index) => (
        <span className="mr-[0.18em] block overflow-hidden" key={`${word}-${index}`}>
          <motion.span
            className="block"
            initial={{ y: "115%", rotate: 2 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once, margin: "-12% 0px" }}
            transition={{
              duration: 0.82,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + index * 0.035
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
