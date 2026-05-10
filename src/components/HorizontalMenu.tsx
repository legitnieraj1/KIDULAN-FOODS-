"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { ProductModal } from "@/components/ProductModal";
import { burgerItems } from "@/data/site";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HorizontalMenu() {
  const [selectedProduct, setSelectedProduct] = useState<typeof burgerItems[number] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? window.innerWidth / 3 : window.innerWidth * 0.85;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="pedidos" className="relative overflow-hidden bg-cream py-24 text-ink md:py-36">
      <div className="mx-auto max-w-[1800px] px-5 md:px-8">
        <div className="relative mb-16 flex items-center justify-center">
          <h2 className="display-script text-[14vw] leading-none tracking-tight md:text-[6rem]">
            OUR PRODUCTS
          </h2>
          <div className="absolute right-0 hidden gap-3 md:flex">
            <button 
              onClick={() => scroll('left')}
              className="flex size-12 items-center justify-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-cream"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="flex size-12 items-center justify-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-cream"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="no-scrollbar flex w-full snap-x snap-proximity gap-8 overflow-x-auto pb-10 md:gap-12 [touch-action:pan-x] overscroll-x-contain"
          data-lenis-prevent="true"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {burgerItems.map((item) => (
            <article
              className="group flex w-[85vw] shrink-0 snap-center cursor-pointer flex-col items-center md:w-[40vw] lg:w-[28vw]"
              key={item.name}
              onClick={() => setSelectedProduct(item)}
            >
              <div className="relative h-[45vh] w-full md:h-[50vh]">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 85vw"
                  className="object-contain drop-shadow-[0_20px_40px_rgba(21,63,50,0.2)] transition duration-700 group-hover:scale-105 group-hover:-rotate-2"
                  loading="lazy"
                />
              </div>
              <h3 className="headline mt-8 text-center text-[2.2rem] uppercase leading-[0.9] md:text-[2.6rem]">
                {item.name}
              </h3>
              <p className="mt-4 max-w-[320px] text-center text-sm font-semibold leading-relaxed text-ink/80 md:text-base">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-8 md:mt-20">
          <div className="flex gap-4 md:hidden">
            <button 
              onClick={() => scroll('left')}
              className="flex size-12 items-center justify-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-cream"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="flex size-12 items-center justify-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-cream"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
          <MagneticButton href="#shop" variant="yellow">
            ALL PRODUCTS
          </MagneticButton>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
