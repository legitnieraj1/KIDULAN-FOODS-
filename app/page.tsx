import { CookieBar } from "@/components/CookieBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HorizontalMenu } from "@/components/HorizontalMenu";
import { LifeMarquee } from "@/components/LifeMarquee";
import { Locations } from "@/components/Locations";
import { ScrollFx } from "@/components/ScrollFx";
import { StoreEditorial } from "@/components/StoreEditorial";
import { StickyStory } from "@/components/StickyStory";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "KIDULAN™ FOODS",
  servesCuisine: ["Healthy Foods", "Millets", "Muesli"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Chennai",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN"
  },
  url: "https://www.kidulanfoods.in",
  email: "hello@kidulanfoods.in",
  priceRange: "€€"
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollFx />
      <Header />
      <main id="main">
        <Hero />
        <StickyStory />
        <HorizontalMenu />
        <LifeMarquee />
        <StoreEditorial />
        <Locations />
      </main>
      <Footer />
      <CookieBar />
    </>
  );
}
