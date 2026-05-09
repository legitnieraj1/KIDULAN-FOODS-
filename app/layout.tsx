import type { Metadata, Viewport } from "next";
import { ClientShell } from "@/components/ClientShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kidulanfoods.in"),
  title: {
    default: "KIDULAN™ FOODS | Pure Grains. Real Goodness.",
    template: "%s | KIDULAN™ FOODS"
  },
  description:
    "A health-based e-commerce platform for KIDULAN™ FOODS, offering pure millets, ragi, and muesli crafted for everyday wellness and nutrition.",
  keywords: [
    "KIDULAN™ FOODS",
    "healthy millets",
    "muesli delivery",
    "health food store",
    "ragi products",
    "Indian grains"
  ],
  openGraph: {
    title: "KIDULAN™ FOODS",
    description:
      "Nourishing your body with pure grains, muesli, and ragi. Delivered fresh to you.",
    url: "https://www.kidulanfoods.in",
    siteName: "KIDULAN™ FOODS",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1600&q=85",
        width: 1600,
        height: 1067,
        alt: "Healthy muesli and pure grains"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "KIDULAN™ FOODS",
    description:
      "Health-based grains and muesli for your daily wellness."
  }
};

export const viewport: Viewport = {
  themeColor: "#f4f0df",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
