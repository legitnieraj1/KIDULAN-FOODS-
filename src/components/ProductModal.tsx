"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Smile, ShieldCheck, ChevronDown, Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";

// Price map per size
const PRICES: Record<string, number> = { "500g": 349, "1kg": 649, "2kg": 1149 };

type Product = {
  name: string;
  description: string;
  src: string;
  accent: string;
};

export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState("500g");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  // Reset state when product changes
  useEffect(() => {
    setSelectedSize("500g");
    setQty(1);
    setAdded(false);
  }, [product?.name]);

  // Lock body scroll and pause Lenis
  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();

    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [product]);

  if (!product) return null;

  const price = PRICES[selectedSize] ?? 349;
  const originalPrice = Math.round(price * (100 / 70));

  const handleAddToCart = () => {
    addItem({
      name: product.name,
      src: product.src,
      size: selectedSize,
      price,
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-ink/80 px-4 py-6 backdrop-blur-sm md:px-8 md:py-10"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      data-lenis-prevent="true"
    >
      <motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto flex w-full max-w-[1200px] flex-col overflow-hidden rounded-[2rem] bg-cream shadow-2xl text-ink"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-salt/60 p-2 text-ink backdrop-blur-md transition-colors hover:bg-coral hover:text-cream md:right-6 md:top-6"
        >
          <X className="size-6" strokeWidth={2.5} />
        </button>

        {/* ── Top Product Section ── */}
        <div className="flex w-full shrink-0 flex-col md:flex-row">

          {/* Left: Image */}
          <div className="relative h-[45vh] min-h-[250px] w-full shrink-0 bg-salt md:h-auto md:min-h-full md:w-[40%]">
            <Image
              src={product.src}
              alt={product.name}
              fill
              className="scale-110 object-contain drop-shadow-2xl"
            />
          </div>

          {/* Middle: Badges */}
          <div className="flex shrink-0 flex-row justify-center gap-6 border-y border-ink/10 bg-butter/20 p-6 md:w-[15%] md:flex-col md:border-y-0 md:border-r md:py-10">
            {[
              { icon: <Zap className="size-8" strokeWidth={1.5} />, label: "🔥 PURE FUEL", bg: "bg-coral" },
              { icon: <Smile className="size-8" strokeWidth={1.5} />, label: "💚 GUT HAPPY", bg: "bg-ink" },
              { icon: <ShieldCheck className="size-8" strokeWidth={1.5} />, label: "🌾 ZERO JUNK", bg: "bg-[#1e4a36]" },
            ].map((b, i) => (
              <div key={i} className={`flex flex-col items-center gap-2 text-center ${i > 0 ? "mt-0 md:mt-6" : ""}`}>
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${b.bg} text-cream`}>{b.icon}</div>
                <span className="text-[0.65rem] font-black uppercase tracking-wider text-ink">{b.label}</span>
              </div>
            ))}
          </div>

          {/* Right: Content */}
          <div className="flex w-full flex-col p-6 md:w-[45%] md:p-10">
            <div className="mb-4 text-[0.65rem] font-black uppercase tracking-widest text-coral">
              Home / Products / {product.name}
            </div>

            <h2 className="headline mb-6 text-[2.5rem] leading-[0.85] tracking-tight text-ink md:text-[3.4rem]">
              {product.name}
            </h2>

            {/* Size Selector */}
            <div className="mb-6 flex flex-col gap-3">
              <p className="font-grotesk text-xs font-black uppercase text-ink/60">Select Size:</p>
              <div className="flex flex-wrap gap-2">
                {["500g", "1kg", "2kg"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`rounded-full border-2 px-4 py-2 text-xs font-black uppercase tracking-wide transition-all duration-200 ${
                      selectedSize === s
                        ? "border-ink bg-ink text-cream"
                        : "border-ink/15 text-ink hover:border-ink hover:bg-ink/5"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-3 flex items-end gap-3">
              <span className="text-4xl font-black tracking-tight text-ink">Rs. {price.toLocaleString()}</span>
              <span className="pb-1 text-lg font-bold text-ink/30 line-through">Rs. {originalPrice.toLocaleString()}</span>
            </div>
            <div className="mb-5 flex items-center gap-4">
              <span className="text-xs font-black uppercase tracking-wide text-coral">
                Rs. {(price / (selectedSize === "500g" ? 500 : selectedSize === "1kg" ? 1000 : 2000)).toFixed(2)} / g
              </span>
              <div className="rounded bg-butter px-2 py-1 text-[0.65rem] font-black uppercase tracking-wider text-ink">Save 30%</div>
            </div>
            <p className="mb-6 text-xs font-bold text-ink/50">Inclusive of All Taxes</p>

            {/* Delivery Details */}
            <div className="mb-6 flex flex-col gap-3">
              <p className="font-grotesk text-xs font-black uppercase text-ink/60">Delivery Details</p>
              <div className="flex w-full max-w-sm overflow-hidden rounded-xl border-2 border-ink/15 bg-transparent transition-colors focus-within:border-ink">
                <input type="text" placeholder="Enter your pincode" className="w-full bg-transparent px-4 py-3 text-sm font-semibold text-ink outline-none placeholder:text-ink/40" />
                <button className="bg-ink px-6 py-3 text-sm font-black uppercase text-cream transition-colors hover:bg-coral">Check</button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 max-w-md text-sm font-semibold leading-relaxed text-ink/80">
              <p>With <strong className="text-ink">100% pure ingredients</strong> and no added sugar — wholesome, clean, and seriously satisfying.</p>
              <p className="mt-3">{product.description}</p>
            </div>

            {/* Quantity + Add To Cart */}
            <div className="mt-auto flex flex-col gap-4 border-t border-ink/10 pt-6">
              <div className="flex items-center gap-4">
                {/* Qty Stepper */}
                <div className="flex items-center overflow-hidden rounded-full border-2 border-ink/15">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex size-11 items-center justify-center transition-colors hover:bg-ink/5"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 text-center text-lg font-black">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex size-11 items-center justify-center transition-colors hover:bg-ink/5"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.97 }}
                  className={`flex flex-1 items-center justify-center gap-3 rounded-full py-4 font-grotesk text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                    added
                      ? "bg-[#1e4a36] text-cream"
                      : "bg-ink text-cream hover:bg-coral"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span key="added" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
                        <Check className="size-4" /> Added to Cart!
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
                        <ShoppingCart className="size-4" /> Add to Cart · Rs. {(price * qty).toLocaleString()}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              <p className="display-script text-[1.4rem] leading-tight text-coral md:text-[1.7rem]">
                Because we believe your mornings deserve the right amount of love &amp; nutrition.
              </p>
            </div>
          </div>
        </div>

        {/* ── FAQ Section ── */}
        <div className="flex w-full flex-col items-center border-t border-ink/10 bg-cream px-6 py-16 md:px-16">
          <h2 className="headline mb-10 text-5xl text-ink md:text-[4rem]">FAQs</h2>
          <div className="flex w-full max-w-3xl flex-col gap-4">
            {[
              { q: "Are they Gluten Free?", a: "Yes, all our products are naturally gluten-free and processed in a safe facility." },
              { q: "Are they good for weight management?", a: "Absolutely! Rich in dietary fiber, they keep you fuller for longer and support healthy weight management." },
              { q: "How to incorporate these grains in our diet?", a: "Use them as a wholesome breakfast bowl, in porridges, or even bake with them!" },
            ].map((faq, i) => (
              <div key={i} className="group flex w-full cursor-pointer items-center justify-between rounded-xl bg-[#00a8a8] p-5 text-cream transition-colors hover:bg-[#009696] md:p-6">
                <span className="text-lg font-bold">{faq.q}</span>
                <ChevronDown className="size-5 transition-transform group-hover:translate-y-1" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Other Products Section ── */}
        <div className="flex w-full flex-col items-center bg-[#de3b74] px-6 py-16 text-cream md:px-12">
          <h2 className="headline mb-12 max-w-3xl text-center text-4xl leading-tight md:text-[4.5rem]">
            Food That Actually Loves You Back
          </h2>
          <div className="grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[
              { title: "Millet Flakes", time: "5 min", img: "/images/product 3.webp" },
              { title: "Sprouted Health Mix", time: "5 min", img: "/images/sprout.webp" },
              { title: "Honey Muesli", time: "5 min", img: "/images/honeymuslie.webp" },
              { title: "ABC Malt", time: "5 min", img: "/images/abc.webp" },
            ].map((recipe, i) => (
              <div key={i} className="flex h-full flex-col overflow-hidden rounded-xl bg-cream text-ink">
                <div className="relative h-36 w-full bg-salt md:h-48">
                  <Image src={recipe.img} alt={recipe.title} fill className="scale-110 object-contain" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <h3 className="mb-3 text-sm font-bold leading-tight md:text-lg">{recipe.title}</h3>
                  <div className="mt-auto">
                    <div className="mb-2 flex gap-1 text-butter text-sm">{'★★★★★'.split('').map((s, j) => <span key={j}>{s}</span>)}</div>
                    <p className="mb-3 text-xs font-semibold opacity-60">⏱ {recipe.time}</p>
                    <button className="w-full rounded-lg bg-[#153f32] py-2.5 text-xs font-bold uppercase tracking-widest text-cream transition-colors hover:bg-ink">View recipe</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
