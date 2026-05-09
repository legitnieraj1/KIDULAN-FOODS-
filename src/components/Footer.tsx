import Image from "next/image";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { navItems } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer-reveal flex h-[100svh] flex-col overflow-hidden bg-ink px-5 pb-6 pt-24 text-cream md:px-12 md:pb-8 md:pt-32">
      <div className="mx-auto flex w-full max-w-[1600px] grow flex-col justify-between">

        <div className="grid h-full grow grid-cols-1 items-end md:grid-cols-[1.3fr_1fr] lg:grid-cols-[1.5fr_1fr]">

          {/* Big Typography Left */}
          <div className="flex h-full flex-col justify-end pb-12">
            <div className="mt-auto">
              <p className="display-script mb-2 pl-2 text-[3.5rem] leading-none text-butter md:mb-4 md:pl-4 md:text-[5.5rem] lg:text-[6.5rem]">
                pure and natural
              </p>
              <h2 className="headline text-[26vw] leading-[0.78] tracking-tighter text-cream md:text-[18vw] lg:text-[15vw]">
                <span className="block">KIDULAN™</span>
                <span className="block">FOODS</span>
              </h2>
            </div>
          </div>

          {/* Navigation & Contact Right */}
          <div className="relative flex h-full flex-col justify-end pb-16 pl-4 md:pl-12">

            {/* Pineapple Decoration */}
            <div className="pointer-events-none absolute bottom-0 left-[-6rem] hidden w-[150px] opacity-100 md:block lg:bottom-[-2rem] lg:left-[-16rem] lg:w-[250px] xl:w-[300px] xl:left-[-20rem] z-10">
              <Image
                src="/images/pineapple.webp"
                alt="Pineapple Graphic"
                width={1200}
                height={1200}
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-12 sm:flex-row sm:gap-20">

              {/* Nav Links & Text */}
              <div className="flex flex-col gap-6">
                <p className="max-w-xs text-sm font-semibold leading-relaxed text-cream/80 md:text-base">
                  Bringing ancient grains back to modern tables. Pure, unadulterated, and crafted for your everyday well-being.
                </p>
                <div className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <a
                      href={item.href}
                      className="w-fit text-lg font-black uppercase tracking-wide text-cream transition-colors hover:text-butter md:text-xl"
                      key={item.href}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contacts */}
              <div className="flex flex-col gap-5 text-sm font-semibold text-cream md:text-base">
                <div className="flex items-center gap-4">
                  <MapPin className="size-5 text-butter" />
                  <span>Chennai, Tamil Nadu</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="size-5 text-butter" />
                  <a href="mailto:hello@kidulanfoods.in" className="hover:text-butter">hello@kidulanfoods.in</a>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="size-5 text-butter" />
                  <a href="tel:+919876543210" className="hover:text-butter">+91 98765 43210</a>
                </div>
                <div className="flex items-center gap-4">
                  <Instagram className="size-5 text-butter" />
                  <a href="https://instagram.com/kidulanfoods" className="hover:text-butter">@kidulanfoods</a>
                </div>

                <MagneticButton href="#shop" variant="yellow" className="mt-4 w-fit px-8 py-3 text-sm">
                  Shop Now
                </MagneticButton>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="flex flex-col justify-between border-t border-cream/20 pt-6 text-xs font-black uppercase text-cream/45 md:flex-row">
          <span>© 2026 KIDULAN™ FOODS</span>
          <span className="mt-2 md:mt-0">Cookies · Privacy Policy · Legal</span>
        </div>

      </div>
    </footer>
  );
}
