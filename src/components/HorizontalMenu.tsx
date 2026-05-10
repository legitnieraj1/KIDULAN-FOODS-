"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { ProductModal } from "@/components/ProductModal";
import { burgerItems } from "@/data/site";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HorizontalMenu() {
  const [selectedProduct, setSelectedProduct] = useState<typeof burgerItems[number] | null>(null);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleItems, setVisibleItems] = useState(3);
  
  // Cooldown for arrows
  const handleScroll = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    const maxIndex = burgerItems.length - visibleItems;
    
    if (direction === 'left' && index > 0) {
      setIsAnimating(true);
      setIndex(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 450); // Match transition duration + small buffer
    } else if (direction === 'right' && index < maxIndex) {
      setIsAnimating(true);
      setIndex(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 450);
    }
  };

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1024) setVisibleItems(3);
      else if (window.innerWidth >= 768) setVisibleItems(2);
      else setVisibleItems(1);
    };
    
    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  return (
    <section id="pedidos" className="relative overflow-hidden bg-cream py-24 text-ink md:py-36">
      <div className="mx-auto max-w-[1800px] px-5 md:px-8">
        <div className="relative mb-16 flex items-center justify-center">
          <h2 className="display-script text-[14vw] leading-none tracking-tight md:text-[6rem]">
            OUR PRODUCTS
          </h2>
          <div className="absolute right-0 hidden gap-3 md:flex">
            <button 
              onClick={() => handleScroll('left')}
              disabled={isAnimating || index === 0}
              className={`flex size-12 items-center justify-center rounded-full border border-ink/20 transition-all duration-300 ${isAnimating || index === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-ink hover:text-cream'}`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              disabled={isAnimating || index >= burgerItems.length - visibleItems}
              className={`flex size-12 items-center justify-center rounded-full border border-ink/20 transition-all duration-300 ${isAnimating || index >= burgerItems.length - visibleItems ? 'opacity-30 cursor-not-allowed' : 'hover:bg-ink hover:text-cream'}`}
              aria-label="Scroll right"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>

        {/* Carousel Wrapper */}
        <div 
          className="relative overflow-hidden [perspective:1000px] [backface-visibility:hidden]"
          data-lenis-prevent="true"
        >
          <motion.div 
            className="flex w-full will-change-transform"
            animate={{ 
              x: `calc(-${index * (100 / visibleItems)}%)` 
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            style={{ 
              display: 'flex',
              gap: '0px' // Spacing is handled by item padding for easier transform calculation
            }}
          >
            {burgerItems.map((item) => (
              <article
                className="group shrink-0 cursor-pointer flex flex-col items-center px-4 md:px-6"
                style={{ width: `${100 / visibleItems}%` }}
                key={item.name}
                onClick={() => setSelectedProduct(item)}
              >
                <div className="relative h-[45vh] w-full md:h-[50vh] [transform-style:preserve-3d] [backface-visibility:hidden]">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-contain drop-shadow-[0_20px_40px_rgba(21,63,50,0.2)] transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2"
                    loading="eager"
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
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-8 md:mt-20">
          <div className="flex gap-4 md:hidden">
            <button 
              onClick={() => handleScroll('left')}
              disabled={isAnimating || index === 0}
              className={`flex size-12 items-center justify-center rounded-full border border-ink/20 transition-all duration-300 ${isAnimating || index === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-ink hover:text-cream'}`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              disabled={isAnimating || index >= burgerItems.length - visibleItems}
              className={`flex size-12 items-center justify-center rounded-full border border-ink/20 transition-all duration-300 ${isAnimating || index >= burgerItems.length - visibleItems ? 'opacity-30 cursor-not-allowed' : 'hover:bg-ink hover:text-cream'}`}
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

