"use client";

import { MouseEvent, ReactNode, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "yellow" | "green" | "cream";
  icon?: boolean;
  ariaLabel?: string;
};

const variants = {
  yellow:
    "bg-butter text-ink hover:bg-ink hover:text-cream focus-visible:outline-ink",
  green:
    "bg-ink text-cream hover:bg-butter hover:text-ink focus-visible:outline-butter",
  cream:
    "bg-cream text-ink hover:bg-coral hover:text-salt focus-visible:outline-ink"
};

export function MagneticButton({
  children,
  href,
  className,
  variant = "yellow",
  icon = false,
  ariaLabel
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 170, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 170, damping: 16 });

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const distanceX = event.clientX - (rect.left + rect.width / 2);
    const distanceY = event.clientY - (rect.top + rect.height / 2);
    x.set(distanceX * 0.26);
    y.set(distanceY * 0.35);
  };

  const handleLeave = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };

  const classes = clsx(
    "magnet group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-center font-grotesk text-sm font-black uppercase leading-none tracking-tightish shadow-glow outline-none transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:min-h-14 md:px-8",
    variants[variant],
    className
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon ? (
        <span
          className={clsx(
            "relative z-10 grid size-7 place-items-center rounded-full transition-transform duration-300",
            isHovering ? "translate-x-1 -translate-y-1" : ""
          )}
          aria-hidden="true"
        >
          <ArrowUpRight className="size-4" strokeWidth={3} />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={classes}
        style={{ x, y }}
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleLeave}
        whileTap={{ scale: 0.96 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      aria-label={ariaLabel}
      className={classes}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
    >
      {content}
    </motion.button>
  );
}
