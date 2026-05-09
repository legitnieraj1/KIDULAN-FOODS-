import type { StaticImageData } from "next/image";

export type ImageAsset = {
  src: string | StaticImageData;
  alt: string;
  focus?: string;
};

export const navItems = [
  { label: "Shop", href: "#shop" },
  { label: "Our Story", href: "#sobre" },
  { label: "Products", href: "#tienda" },
  { label: "Health Benefits", href: "#health" },
  { label: "Contact", href: "#contact" }
];

export const heroImages: ImageAsset[] = [
  {
    src: "/images/hero bg -kidulan.webp",
    alt: "KIDULAN™ FOODS premium natural products background",
    focus: "50% 50%"
  },
  {
    src: "https://images.unsplash.com/photo-1543253687-c931c8e01820?auto=format&fit=crop&w=1800&q=88",
    alt: "Wholesome grain packets arranged on wooden surface",
    focus: "50% 40%"
  },
  {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1800&q=88",
    alt: "Healthy breakfast bowl with millets and seeds",
    focus: "50% 50%"
  }
];

export const storyImages: ImageAsset[] = [
  {
    src: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&w=1200&q=85",
    alt: "Colorful muesli mix with dried fruits and oats",
    focus: "50% 40%"
  },
  {
    src: "https://images.unsplash.com/photo-1541480551145-2370a440d585?auto=format&fit=crop&w=1200&q=85",
    alt: "Ragi millet grains in a rustic bowl",
    focus: "50% 42%"
  },
  {
    src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=85",
    alt: "Healthy grain and seed spread on a kitchen table",
    focus: "48% 45%"
  }
];

export const burgerItems = [
  {
    name: "Lean Vita",
    description: "Premium health supplement blend with natural herbs and vitamins. Supports weight management & vitality.",
    src: "/images/product5.webp",
    accent: ""
  },
  {
    name: "ABC Malt",
    description: "Apple, Beetroot & Carrot malt powder. Antioxidant-rich, naturally sweet and gut-nourishing.",
    src: "/images/abc.webp",
    accent: ""
  },
  {
    name: "Sprouted Ragi Choco Malt",
    description: "Dark cocoa meets sprouted ragi — a guilt-free chocolate malt drink with calcium & iron.",
    src: "/images/chocolate.webp",
    accent: ""
  },
  {
    name: "Sprouted Health Mix",
    description: "A powerhouse blend of sprouted grains, seeds & legumes. Rich in plant protein, fibre & essential vitamins.",
    src: "/images/sprout.webp",
    accent: ""
  },
  {
    name: "Millet Flakes",
    description: "Crispy, golden millet flakes – Non-GMO, a natural source of energy for every morning.",
    src: "/images/product 3.webp",
    accent: ""
  },
  {
    name: "Honey Muesli",
    description: "A crunchy blend of rolled oats, honey-roasted nuts, and sun-dried fruits.",
    src: "/images/honeymuslie.webp",
    accent: ""
  }
];

export const gallery = [
  {
    title: "Honey Muesli",
    eyebrow: "Breakfast",
    src: "/images/honeymuslie.webp",
    alt: "Honey Muesli product packet"
  },
  {
    title: "Sprouted Health Mix",
    eyebrow: "Superfood",
    src: "/images/sprout.webp",
    alt: "Sprouted Health Mix product packet"
  },
  {
    title: "Millet Flakes",
    eyebrow: "Products",
    src: "/images/product 3.webp",
    alt: "Millet Flakes product packet"
  },
  {
    title: "ABC Malt",
    eyebrow: "Wellness",
    src: "/images/abc.webp",
    alt: "ABC Malt product packet"
  }
];

export const locations = [
  {
    id: "store",
    label: "KIDULAN™ FOODS Store",
    address: "Chennai, Tamil Nadu, India",
    hours: "Monday to Saturday 9:00 AM – 7:00 PM",
    image:
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1400&q=85",
    alt: "KIDULAN™ FOODS store with healthy grain products"
  },
  {
    id: "delivery",
    label: "Pan-India Delivery",
    address: "Ships across all major cities in India",
    hours: "Order anytime · Delivered in 3–5 business days",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=85",
    alt: "Healthy millet breakfast bowl for delivery"
  }
];
