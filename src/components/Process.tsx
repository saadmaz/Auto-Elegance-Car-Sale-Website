import { motion } from "motion/react";
import car1 from "@/assets/car-1.webp";
import car2 from "@/assets/car-2.webp";
import car3 from "@/assets/car-3.webp";

const STEPS = [
  {
    n: "01",
    t: "We Search",
    d: "You tell us the dream. We crawl auctions, private dealers, and our European network — surfacing only what fits.",
    img: car1,
  },
  {
    n: "02",
    t: "We Verify",
    d: "Each candidate passes a 32-point inspection, full history check, and an in-person review by our specialists.",
    img: car2,
  },
  {
    n: "03",
    t: "We Deliver",
    d: "Paperwork, transport, registration — handled. The car arrives at your door, fueled, detailed, and ready.",
    img: car3,
  },
];

export function Process() {
  return (
    <section id="process" className="content-auto relative overflow-hidden py-36 md:py-56">
      <div className="mx-auto max-w-[1600px] px-8 md:px-16">

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-10 border-b border-border/40 pb-20 md:flex-row md:items-end">
          <div>
            <p
              className="flex items-center gap-3 text-[9px] tracking-[0.55em] text-gold/65"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="h-px w-8 bg-gold/40" />
              PROCESS
            </p>
            <h2 className="mt-8 font-display text-[3rem] font-light leading-[1.0] md:text-[4.5rem] lg:text-[6rem]">
              Three steps.
              <br />
              <span className="italic text-foreground/35">Zero compromise.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[0.88rem] leading-[1.9] text-muted-foreground/75 md:text-right">
            Most clients receive their car within 14–28 days. Some have waited months for
            the right one. We don&apos;t rush perfection.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-0 divide-y divide-border/30">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1 }}
              className="group grid items-start gap-10 py-16 md:grid-cols-12 md:gap-20"
            >
              {/* Number */}
              <div className="md:col-span-2">
                <div className="font-display text-[4rem] font-light leading-none text-foreground/12 transition-colors duration-500 group-hover:text-gold/25">
                  {s.n}
                </div>
              </div>

              {/* Title + description */}
              <div className="md:col-span-5">
                <h3 className="font-display text-[2.2rem] font-light leading-tight md:text-[2.8rem]">
                  {s.t}
                </h3>
                <p className="mt-5 text-[0.88rem] leading-[1.95] text-muted-foreground/75">
                  {s.d}
                </p>
                <div
                  className="mt-8 flex items-center gap-2 text-[8.5px] tracking-[0.3em] text-gold/60 transition-colors group-hover:text-gold"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  STEP {s.n}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>

              {/* Image reveal */}
              <div className="overflow-hidden md:col-span-5">
                <div className="relative aspect-[16/9] overflow-hidden border border-border/40" style={{ borderRadius: "4px" }}>
                  <img
                    src={s.img}
                    alt={s.t}
                    className="h-full w-full object-cover object-center scale-[1.06] transition-transform duration-700 group-hover:scale-100"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-background/30 transition-opacity duration-500 group-hover:bg-background/0" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
