import { motion } from "motion/react";
import heroCar from "@/assets/hero-car.webp";

const QUOTES = [
  {
    q: "The ceramic coating left my paint looking better than the day it left the factory. Genuinely impressive work.",
    who: "Michael D.",
    car: "Porsche 911 — Ceramic Coating",
    rating: 5,
  },
  {
    q: "Booked the paint correction on my M4. Six years of swirls gone in a single session. Can't stop looking at it.",
    who: "James R.",
    car: "BMW M4 — Paint Correction",
    rating: 5,
  },
  {
    q: "Incredibly professional. The attention to detail is on another level. My car came back spotless in every sense.",
    who: "Sarah T.",
    car: "Range Rover — Full Detail",
    rating: 5,
  },
];

export function Voices() {
  return (
    <section
      id="voices"
      className="content-auto relative overflow-hidden border-y border-border/40 bg-card py-36 md:py-56"
    >
      {/* Ghost car watermark */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden">
        <img
          src={heroCar}
          alt=""
          aria-hidden="true"
          className="w-full -scale-x-100 opacity-[0.038]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-linear-to-b from-card via-card/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-8 md:px-16">

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-10 border-b border-border/35 pb-18 md:flex-row md:items-end">
          <div>
            <p
              className="flex items-center gap-3 text-[9px] tracking-[0.55em] text-gold/65"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="h-px w-8 bg-gold/40" />
              CLIENT VOICES
            </p>
            <h2 className="mt-8 font-display text-[3rem] font-light leading-[1.0] md:text-[4.5rem] lg:text-[6rem]">
              500 clients.
              <br />
              <span className="italic text-foreground/30">A few of their words.</span>
            </h2>
          </div>
          <div
            className="text-[8.5px] tracking-[0.4em] text-muted-foreground/40"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            VERIFIED REVIEWS
            <br />
            <span className="text-gold/60">★★★★★ AVG. 5.0 / 5</span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-18 grid gap-px bg-border/30 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.85 }}
              className="group bg-card px-10 py-14 transition-colors hover:bg-background/50 md:px-12 md:py-16"
            >
              {/* Opening quote mark */}
              <div className="font-display text-[5rem] font-light leading-none text-gold/25 transition-colors duration-500 group-hover:text-gold/45">
                &ldquo;
              </div>

              <blockquote className="mt-4 font-display text-[1.4rem] font-light leading-[1.55] text-foreground/85">
                {q.q}
              </blockquote>

              <figcaption className="mt-12 flex items-center justify-between border-t border-border/40 pt-8">
                <div>
                  <div className="text-[0.88rem] font-medium text-foreground/80">
                    {q.who}
                  </div>
                  <div
                    className="mt-1 text-[8.5px] tracking-[0.3em] text-muted-foreground/55"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {q.car.toUpperCase()}
                  </div>
                </div>
                <div className="flex gap-0.5 text-gold/70 text-xs">
                  {"★".repeat(q.rating)}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
