"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { CartProvider } from "@/context/CartContext";

declare global {
  interface Window { __lenis?: Lenis; }
}

type ClientShellProps = {
  children: ReactNode;
};

export function ClientShell({ children }: ClientShellProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.4,
      wheelMultiplier: 0.82,
    });

    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
