import { motion } from "motion/react";
import car1 from "@/assets/car-1.webp";
import car2 from "@/assets/car-2.webp";
import car3 from "@/assets/car-3.webp";

const STEPS = [
  {
    n: "01",
    t: "We search",
    d: "You tell us the dream. We crawl auctions, private dealers, and our European network — surfacing only what fits.",
    img: car1,
  },
  {
    n: "02",
    t: "We verify",
    d: "Each candidate passes a 32-point inspection, full history check, and an in-person review by our specialists.",
    img: car2,
  },
  {
    n: "03",
    t: "We deliver",
    d: "Paperwork, transport, registration — handled. The car arrives at your door, fueled, detailed, and ready.",
    img: car3,
  },
];

export function Process() {
  return (
    <section id="process" className="content-auto relative overflow-hidden py-32 md:py-52">
      <div className="mx-auto max-w-400 px-6 md:px-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <div className="text-xs tracking-[0.4em] text-gold/80">— PROCESS</div>
            <h2 className="mt-8 font-display text-6xl leading-none tracking-tight md:text-7xl">
              Three steps. <br />
              <span className="italic text-foreground/50">Zero compromise.</span>
            </h2>
          </div>
          <p className="max-w-sm leading-[1.85] text-muted-foreground">
            Most clients receive their car within 14–28 days. Some have waited months for the right
            one. We don't rush perfection.
          </p>
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-10 transition-all duration-500 hover:border-gold/50 md:p-12"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <img
                  src={s.img}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full scale-110 object-cover object-center transition-transform duration-1000 group-hover:scale-100"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-linear-to-b from-card/85 via-card/60 to-card/92" />
              </div>

              <div className="relative">
                <div className="font-display text-7xl text-gold/30 transition-colors duration-500 group-hover:text-gold/70">
                  {s.n}
                </div>
                <h3 className="mt-10 font-display text-3xl">{s.t}</h3>
                <p className="mt-5 leading-[1.85] text-sm text-muted-foreground">{s.d}</p>
                <div className="mt-14 flex items-center justify-between border-t border-border/60 pt-8 text-xs tracking-widest text-muted-foreground">
                  <span>STEP {s.n}</span>
                  <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/0 blur-3xl transition-colors duration-700 group-hover:bg-gold/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
