import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import heroCar from "@/assets/hero-car.webp";

const STATS = [
  { k: "4,200+", v: "Cars Delivered" },
  { k: "11 yrs",  v: "In Business" },
  { k: "32-pt",   v: "Inspection" },
  { k: "100%",    v: "Verified History" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const carY    = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const textY   = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const mx = useSpring(0, { stiffness: 32, damping: 22 });
  const my = useSpring(0, { stiffness: 32, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth  - 0.5) * 18);
      my.set((e.clientY / window.innerHeight - 0.5) * 10);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden hero-gradient">

      {/* Fine architectural grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* Car image — bottom right */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.7, ease: EASE, delay: 0.25 }}
        style={{ y: carY, x: mx }}
        className="pointer-events-none absolute bottom-0 right-[-2%] w-[62%] md:right-0 md:w-[56%] lg:w-[60%]"
      >
        {/* Subtle tyre-glow */}
        <div className="absolute bottom-[6%] left-[32%] right-[6%] h-[14%] rounded-full bg-gold/10 blur-[80px]" />

        <motion.img
          src={heroCar}
          alt="Luxury sports coupe"
          style={{ y: my, opacity, mixBlendMode: "screen" }}
          className="relative w-full"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col px-8 md:px-16"
      >
        {/* Top label row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="flex items-center justify-between pt-30 md:pt-34"
        >
          <div
            className="flex items-center gap-4 text-[9px] tracking-[0.55em] text-gold/55"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="h-px w-10 bg-gold/35" />
            CONCIERGE AUTO ACQUISITION
          </div>
          <span
            className="hidden text-[8px] tracking-[0.45em] text-foreground/18 md:block"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            EST. 2014 · WARSAW
          </span>
        </motion.div>

        {/* Headline */}
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="font-display">

            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "104%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, ease: EASE, delay: 0.26 }}
                className="block text-[4rem] font-light leading-[0.92] md:text-[6rem] lg:text-[7.5rem] xl:text-[9rem]"
              >
                Buy your
              </motion.span>
            </div>

            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "104%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, ease: EASE, delay: 0.40 }}
                className="block text-[4rem] font-light italic leading-[0.92] gold-shine md:text-[6rem] lg:text-[7.5rem] xl:text-[9rem]"
              >
                dream car.
              </motion.span>
            </div>

            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "104%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, ease: EASE, delay: 0.54 }}
                className="block text-[4rem] font-light leading-[0.92] text-foreground/18 md:text-[6rem] lg:text-[7.5rem] xl:text-[9rem]"
              >
                Online.
              </motion.span>
            </div>
          </h1>

          {/* Body + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.76 }}
            className="mt-10 max-w-[400px] md:mt-12"
          >
            <p className="text-[0.9rem] leading-[1.95] text-muted-foreground/85">
              We source the finest European luxury cars, verify every detail,
              and deliver straight to your door. No compromise.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#collection"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden bg-gold px-7 py-3.5 text-[0.78rem] tracking-[0.14em] text-primary-foreground transition hover:opacity-90"
                style={{ borderRadius: "2px", fontFamily: "var(--font-sans)" }}
              >
                VIEW COLLECTION
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center border border-foreground/15 px-7 py-3.5 text-[0.78rem] tracking-[0.14em] transition hover:border-gold/50 hover:text-gold"
                style={{ borderRadius: "2px", fontFamily: "var(--font-sans)" }}
              >
                REQUEST A QUOTE
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
          className="mb-8 grid grid-cols-4 border-t border-border/35 md:mb-12"
        >
          {STATS.map((s, i) => (
            <div
              key={s.v}
              className={`py-6 ${i > 0 ? "border-l border-border/25 pl-6 md:pl-8" : ""} pr-4`}
            >
              <div className="font-display text-[1.8rem] font-light text-gold md:text-[2.2rem]">
                {s.k}
              </div>
              <div
                className="mt-1.5 text-[8.5px] tracking-[0.28em] text-muted-foreground/60"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {s.v.toUpperCase()}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 right-10 hidden flex-col items-end gap-2 md:flex"
      >
        <div
          className="text-[8px] tracking-[0.5em] text-muted-foreground/35"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          SCROLL
        </div>
        <motion.div
          animate={{ scaleY: [1, 0.25, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px origin-top bg-linear-to-b from-gold/35 to-transparent"
        />
      </motion.div>
    </section>
  );
}
