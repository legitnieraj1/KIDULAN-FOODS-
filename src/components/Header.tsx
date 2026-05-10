"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { gsap } from "gsap";
import { MagneticButton } from "@/components/MagneticButton";
import { navItems } from "@/data/site";
import { useCart } from "@/context/CartContext";

const categories = [
  { name: "New Launches & Offers", img: "/WhatsApp%20Image%202026-05-08%20at%2023.45.15.jpeg" },
  { name: "Plant Protein", img: "/WhatsApp%20Image%202026-05-08%20at%2023.45.40.jpeg" },
  { name: "Whey Protein", img: "/WhatsApp%20Image%202026-05-08%20at%2023.46.13.jpeg" },
  { name: "All Products", img: "/WhatsApp%20Image%202026-05-08%20at%2023.46.44.jpeg" },
  { name: "Breakfast", img: "/WhatsApp%20Image%202026-05-08%20at%2023.46.58.jpeg" },
  { name: "Protein", img: "/WhatsApp%20Image%202026-05-08%20at%2023.47.34.jpeg" },
  { name: "Muesli", img: "/WhatsApp%20Image%202026-05-08%20at%2023.49.10.jpeg" },
  { name: "Bars", img: "/WhatsApp%20Image%202026-05-08%20at%2023.51.10.jpeg" },
  { name: "Dry Fruits & Seeds", img: "/WhatsApp%20Image%202026-05-08%20at%2023.51.19.jpeg" },
  { name: "Oats & Quinoa", img: "/WhatsApp%20Image%202026-05-08%20at%2023.51.29.jpeg" },
  { name: "Gifting", img: "/WhatsApp%20Image%202026-05-08%20at%2023.51.41.jpeg" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [categoryView, setCategoryView] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, itemCount, subtotal, removeItem, updateQty } = useCart();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      setTimeout(() => setCategoryView(false), 500);
    }
  }, [open]);

  useEffect(() => {
    if (open || cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, cartOpen]);

  useEffect(() => {
    if (!open || !menuRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-menu-item]",
        { y: 80, autoAlpha: 0, rotate: 1.5 },
        {
          y: 0,
          autoAlpha: 1,
          rotate: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.065
        }
      );
    }, menuRef);

    return () => ctx.revert();
  }, [open]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 bg-cream shadow-sm">
        <nav
          className="mx-auto flex w-full max-w-[1800px] items-center justify-between px-5 py-3 md:px-8"
          aria-label="Main navigation"
        >
          <a
            href="#main"
            className="relative h-10 w-40 origin-left scale-125 md:h-12 md:w-48 md:scale-[1.35]"
            aria-label="KIDULAN™ FOODS home"
          >
            <Image
              src="/images/full logo(kidulan).webp"
              alt="KIDULAN™ FOODS Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </a>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 font-grotesk text-sm font-black uppercase text-ink transition-colors hover:text-coral"
              aria-label="Open Cart"
            >
              <ShoppingCart className="size-5" strokeWidth={2.5} />
              <span className="hidden md:inline">Cart</span>
              {itemCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-coral text-[10px] font-black text-cream">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="text-ink outline-none transition-colors hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {open ? (
                <X className="size-9" strokeWidth={2.5} />
              ) : (
                <div className="flex flex-col justify-center gap-[6px]">
                  <span className="h-[3px] w-8 rounded-full bg-ink transition-all" />
                  <span className="h-[3px] w-8 rounded-full bg-ink transition-all" />
                  <span className="h-[3px] w-8 rounded-full bg-ink transition-all" />
                </div>
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={menuRef}
            className="fixed inset-0 z-40 bg-ink text-cream"
            initial={{ clipPath: "circle(0% at 92% 8%)" }}
            animate={{ clipPath: "circle(145% at 92% 8%)" }}
            exit={{ clipPath: "circle(0% at 92% 8%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="h-[100dvh] w-full overflow-y-auto">
              <AnimatePresence mode="wait">
                {categoryView ? (
                  <motion.div
                    key="category-view"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex w-full flex-col min-h-screen pt-28 md:pt-36"
                >
                  <div className="flex flex-col text-center mb-8 px-5 relative mx-auto w-full max-w-[1800px]">
                    <button 
                      onClick={() => setCategoryView(false)} 
                      className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 text-cream hover:text-coral transition-colors font-bold"
                    >
                      <ArrowLeft className="size-6" />
                    </button>
                    <h2 className="headline text-5xl text-cream md:text-7xl tracking-tighter">Shop</h2>
                  </div>
                  
                  <div className="w-full bg-cream py-4 mb-8">
                    <div className="mx-auto w-full max-w-[1800px] px-5 md:px-10">
                      <h3 className="font-grotesk text-sm font-black uppercase text-ink/80 tracking-widest">Shop by Category</h3>
                    </div>
                  </div>

                  <div className="mx-auto w-full max-w-[1800px] px-5 pb-20 md:px-10">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                      {categories.map((cat) => (
                        <a 
                          href="#shop" 
                          key={cat.name} 
                          onClick={() => setOpen(false)} 
                          className="group flex h-28 items-center justify-between rounded-2xl bg-cream p-4 shadow-soft hover:scale-105 transition-transform duration-300 md:h-32 md:p-6"
                        >
                          <span className="font-black text-ink text-sm md:text-base max-w-[60%] leading-tight group-hover:text-coral transition-colors">{cat.name}</span>
                          <div className="relative h-full w-12 md:w-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image src={cat.img} alt={cat.name} fill className="object-contain" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="main-menu"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="mx-auto flex min-h-[100svh] w-full max-w-[1800px] flex-col justify-between px-5 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40"
                >
                  <div className="grid grow items-center gap-12 lg:grid-cols-[1fr_0.6fr] lg:gap-20">
                    <div className="flex w-full flex-col">
                      {navItems.map((item, index) => (
                        <a
                          data-menu-item
                          className="headline group flex items-start gap-4 border-t border-cream/16 py-4 text-[10.5vw] leading-[0.9] text-butter transition-colors hover:text-cream md:gap-6 md:py-6 md:text-[6.5vw] lg:text-[5.5vw]"
                          href={item.href}
                          key={item.href}
                          onClick={(e) => {
                            if (item.label.toLowerCase() === "shop" || item.label.toLowerCase() === "products") {
                              e.preventDefault();
                              setCategoryView(true);
                            } else {
                              setOpen(false);
                            }
                          }}
                        >
                          <span className="mt-2 shrink-0 font-body text-sm font-black text-cream/55 transition-colors group-hover:text-cream md:mt-3 md:text-base">
                            0{index + 1}
                          </span>
                          <span className="block break-words">
                            {item.label}
                          </span>
                        </a>
                      ))}
                      <div className="border-t border-cream/16" />
                    </div>

                    <aside
                      data-menu-item
                      className="rounded-[1.5rem] border border-cream/18 bg-cream/8 p-8 shadow-soft backdrop-blur-md lg:p-10"
                    >
                      <p className="display-script mb-6 text-5xl text-butter md:mb-8 md:text-6xl">
                        Pure. Natural. Nourishing.
                      </p>
                      <p className="max-w-md text-balance text-lg font-semibold leading-relaxed text-cream/82 md:text-xl">
                        Wholesome millets, muesli &amp; ragi — crafted for a healthier,
                        stronger you. Fuel your day the natural way.
                      </p>
                      <MagneticButton
                        href="#shop"
                        variant="cream"
                        className="mt-10 w-fit px-8 py-3"
                        icon
                        ariaLabel="Shop products"
                      >
                        Shop Now
                      </MagneticButton>
                    </aside>
                  </div>

                  <div className="flex flex-wrap items-end justify-between gap-4 border-t border-cream/16 pt-5 text-sm font-black uppercase text-cream/62">
                    <span>KIDULAN™ FOODS · India</span>
                    <span>@kidulanfoods</span>
                    <span>hello@kidulanfoods.in</span>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-md flex-col bg-cream shadow-2xl sm:rounded-l-[2rem]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-ink/10 p-6 md:p-8">
                <div>
                  <h2 className="display-script text-4xl text-coral">Your Cart</h2>
                  {itemCount > 0 && (
                    <p className="mt-1 text-xs font-black uppercase tracking-widest text-ink/50">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
                  )}
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="flex size-10 items-center justify-center rounded-full bg-butter text-ink transition-transform hover:scale-110"
                >
                  <X className="size-5" strokeWidth={2.5} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <AnimatePresence>
                  {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center opacity-60">
                      <ShoppingCart className="mb-4 size-14 text-ink/30" strokeWidth={1} />
                      <p className="headline text-3xl text-ink">It&apos;s empty.</p>
                      <p className="mt-3 text-sm font-semibold text-ink/70">Looks like you haven&apos;t added any grains yet.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-salt p-4"
                        >
                          {/* Product Image */}
                          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-butter/30">
                            <Image
                              src={item.src}
                              alt={item.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex flex-1 flex-col gap-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-grotesk text-sm font-black uppercase leading-tight text-ink">{item.name}</p>
                                <p className="mt-0.5 text-xs font-semibold text-ink/50">{item.size}</p>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="shrink-0 rounded-full p-1.5 text-ink/30 transition-colors hover:bg-coral/10 hover:text-coral"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between">
                              {/* Qty Stepper */}
                              <div className="flex items-center overflow-hidden rounded-full border border-ink/15">
                                <button
                                  onClick={() => updateQty(item.id, item.quantity - 1)}
                                  className="flex size-8 items-center justify-center transition-colors hover:bg-ink/5"
                                >
                                  <Minus className="size-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                                <button
                                  onClick={() => updateQty(item.id, item.quantity + 1)}
                                  className="flex size-8 items-center justify-center transition-colors hover:bg-ink/5"
                                >
                                  <Plus className="size-3" />
                                </button>
                              </div>

                              <p className="font-grotesk text-sm font-black text-ink">
                                Rs. {(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="border-t border-ink/10 bg-butter p-6 sm:rounded-bl-[2rem] md:p-8">
                <div className="mb-2 flex items-center justify-between font-grotesk text-xs font-black uppercase tracking-widest text-ink/50">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="mb-5 flex items-center justify-between font-grotesk text-xl font-black text-ink">
                  <span>Total</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 font-grotesk text-sm font-black uppercase tracking-widest text-cream transition-all hover:bg-coral disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-3 w-full text-center text-xs font-bold uppercase tracking-widest text-ink/40 hover:text-ink"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
