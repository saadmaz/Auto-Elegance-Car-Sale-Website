import { motion } from "motion/react";
import heroCar from "@/assets/hero-car.webp";

const QUOTES = [
  {
    q: "They found the exact spec I'd been hunting for two years. Delivered in three weeks. Flawless.",
    who: "Mateusz K.",
    car: "Porsche Cayman GT4",
  },
  {
    q: "I never set foot in a dealership. The car arrived better than described — and that's saying something.",
    who: "Agnieszka W.",
    car: "Audi e-tron GT",
  },
  {
    q: "Worth every euro. The peace of mind alone is the product.",
    who: "Krzysztof B.",
    car: "BMW M2 CS",
  },
];

export function Voices() {
  return (
    <section
      id="voices"
      className="content-auto relative overflow-hidden border-y border-border bg-card py-32 md:py-48"
    >
      {/* Atmospheric car backdrop */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden">
        <img
          src={heroCar}
          alt=""
          aria-hidden="true"
          className="w-full -scale-x-100 opacity-[0.055]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-card via-card/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="text-xs tracking-[0.4em] text-gold/80">— VOICES</div>
        <h2 className="mt-6 max-w-3xl font-display text-6xl leading-[1] tracking-tight md:text-7xl">
          4,200 owners. <span className="italic text-foreground/40">A few of their words.</span>
        </h2>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="rounded-3xl border border-border bg-background p-8"
            >
              <div className="font-display text-6xl leading-none text-gold">"</div>
              <blockquote className="mt-4 font-display text-2xl leading-snug">{q.q}</blockquote>
              <figcaption className="mt-8 flex items-center justify-between border-t border-border pt-6 text-sm">
                <div>
                  <div>{q.who}</div>
                  <div className="text-xs text-muted-foreground">{q.car}</div>
                </div>
                <div className="flex gap-0.5 text-gold">★★★★★</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
