"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollFx() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-gsap='reveal']");
      const masks = gsap.utils.toArray<HTMLElement>("[data-gsap='mask']");
      const parallax = gsap.utils.toArray<HTMLElement>("[data-speed]");

      reveals.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 74, rotate: 0.8 },
          {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true
            }
          }
        );
      });

      masks.forEach((element) => {
        gsap.fromTo(
          element,
          { clipPath: "inset(18% 12% 18% 12% round 1.5rem)", scale: 1.08 },
          {
            clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
            scale: 1,
            duration: 1.35,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true
            }
          }
        );
      });

      parallax.forEach((element) => {
        const speed = Number(element.dataset.speed ?? 0.15);
        gsap.to(element, {
          yPercent: speed * -100,
          ease: "none",
          scrollTrigger: {
            trigger: element.parentElement ?? element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    });

    return () => media.revert();
  }, []);

  return null;
}
