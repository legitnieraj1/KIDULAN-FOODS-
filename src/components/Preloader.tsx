"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const words = ["PURE", "NATURAL", "WHOLESOME", "NUTRITIOUS", "ANCIENT", "KIDULAN™ FOODS"];

type PreloaderProps = {
  onComplete?: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    
    // Lock scroll
    document.documentElement.style.overflow = "hidden";

    // Progress counter with organic easing
    let currentProgress = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 3) + 1;
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
          document.documentElement.style.overflow = "";
        }, 1200);
      }
    }, 45);

    return () => {
      clearInterval(interval);
      document.documentElement.style.overflow = "";
    };
  }, [onComplete]);

  useEffect(() => {
    if (index === words.length - 1) return;
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1200 : 250);
    return () => clearTimeout(timeout);
  }, [index]);

  const initialPath = useMemo(() => 
    `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`,
    [dimension]
  );
  
  const targetPath = useMemo(() => 
    `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} -300 0 0 L0 0`,
    [dimension]
  );

  const easing = [0.76, 0, 0.24, 1] as [number, number, number, number];

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.8, ease: easing }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.8, ease: easing, delay: 0.3 }
    }
  };

  return (
    <motion.div
      variants={{
        initial: { top: 0 },
        exit: { top: "-100vh", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }
      }}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-ink overflow-hidden"
    >
      {dimension.width > 0 && (
        <>
          <svg className="absolute top-0 w-full fill-ink" style={{ height: "calc(100% + 300px)" }}>
            <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
          </svg>

          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#facb48 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center gap-2 md:gap-4"
          >
            {/* Word Cycle */}
            <div className="h-[2em] overflow-hidden flex items-center justify-center">
               <AnimatePresence mode="wait">
                 <motion.p
                   key={words[index]}
                   initial={{ y: "110%" }}
                   animate={{ y: 0 }}
                   exit={{ y: "-110%" }}
                   transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                   className="headline leading-tight text-4xl text-cream md:text-7xl lg:text-[7rem] italic"
                 >
                   {words[index]}
                 </motion.p>
               </AnimatePresence>
            </div>

            {/* Progress Percentage */}
            <div className="flex items-baseline gap-1">
              <motion.span 
                className="font-body text-[22vw] font-black leading-none text-butter md:text-[16rem] lg:text-[18rem] tracking-tighter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {progress}
              </motion.span>
              <span className="font-body text-xl font-black text-butter md:text-4xl opacity-50">%</span>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
