"use client";

const benefits = [
  {
    num: "01",
    title: "Heart-Healthy Grains",
    desc: "Oats and sprouted grains contain beta-glucan, a soluble fibre clinically shown to reduce LDL cholesterol and support a steady, strong heartbeat with every morning bowl.",
    stat: "10% avg. LDL reduction"
  },
  {
    num: "02",
    title: "Sustained Energy",
    desc: "Complex carbohydrates digest slowly, releasing glucose steadily — no mid-morning slumps, just calm, clean fuel that carries you through your day.",
    stat: "4h+ of stable energy"
  },
  {
    num: "03",
    title: "Gut Wellness",
    desc: "Rich prebiotic fibre nourishes good gut bacteria, improving digestion, reducing bloating, and laying the foundation for whole-body immunity.",
    stat: "8g fibre per serving"
  },
  {
    num: "04",
    title: "Brain Nourishment",
    desc: "B vitamins, iron, and magnesium from whole grains support neurotransmitter production, sharpening focus, memory, and mental clarity naturally.",
    stat: "6 essential B vitamins"
  },
  {
    num: "05",
    title: "Immunity Armour",
    desc: "Sprouting unlocks zinc, selenium, and antioxidants locked inside dormant seeds, activating your body's natural defences and reducing oxidative stress at the cellular level.",
    stat: "3× more bioavailable nutrients vs. raw grains"
  },
  {
    num: "06",
    title: "Mindful Weight Balance",
    desc: "High satiety fibre keeps hunger hormones in check — helping you feel full longer, eat mindfully, and maintain a healthy weight without deprivation.",
    stat: "60% longer satiety"
  }
];

const footerStats = [
  { val: "100%", label: "Whole Grain, No Refining" },
  { val: "0g", label: "Artificial Additives or Preservatives" },
  { val: "12+", label: "Ancient Grains & Millets Used" },
  { val: "48h", label: "Slow Sprouting for Peak Nutrition" },
];

export function Locations() {
  return (
    <section id="benefits" className="relative overflow-hidden bg-butter px-5 py-24 text-ink md:px-8 md:py-36">
      <div className="relative mx-auto max-w-[1800px]">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-grotesk text-sm font-black uppercase text-coral">
              Rooted in Nature
            </p>
            <h2 className="headline max-w-[16ch] text-[15vw] leading-[0.85] md:text-[7vw]">
              Every grain carries a promise of well-being.
            </h2>
          </div>
          <p className="max-w-md text-balance text-xl font-semibold leading-tight md:pb-3">
            Our sprouted grains, ancient millets, and whole-grain blends are crafted to nourish every layer of your health — from your gut to your mind.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((feature) => (
            <article
              key={feature.num}
              data-gsap="reveal"
              className="flex flex-col justify-between rounded-[1.5rem] bg-cream p-6 shadow-soft md:p-8"
            >
              <div>
                <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-ink font-grotesk text-sm font-black text-cream">
                  {feature.num}
                </div>
                <h3 className="headline text-[2.5rem] leading-[0.9] md:text-[3rem]">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base font-semibold leading-relaxed text-ink/80">
                  {feature.desc}
                </p>
              </div>
              <div className="mt-8 border-t border-ink/10 pt-5">
                <p className="font-grotesk text-xs font-black uppercase tracking-widest text-coral">
                  Stat
                </p>
                <p className="mt-2 text-xl font-bold leading-tight">
                  {feature.stat}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-[1.5rem] bg-ink p-8 text-cream md:p-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
            {footerStats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-3">
                <span className="headline text-5xl text-butter md:text-6xl">{stat.val}</span>
                <span className="text-balance text-sm font-semibold leading-snug text-cream/80 md:text-base">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
