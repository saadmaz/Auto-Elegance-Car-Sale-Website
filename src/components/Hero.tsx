import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { EmblemScene } from "@/components/CarScene";
import heroCar from "@/assets/hero-car.webp";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const carY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const carRotate = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const sx = useSpring(0, { stiffness: 60, damping: 20 });
  const sy = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      sx.set(x * 55);
      sy.set(y * 38);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [sx, sy]);

  return (
    <section
      ref={ref}
      className="content-auto relative min-h-[120vh] overflow-hidden hero-gradient grain"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating 3D emblem */}
      <motion.div
        style={{ y }}
        className="absolute right-[6%] top-[18%] hidden h-[380px] w-[380px] lg:block"
      >
        <EmblemScene />
      </motion.div>

      <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col justify-center px-6 pt-32 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3 text-xs tracking-[0.4em] text-gold/80"
        >
          <span className="h-px w-12 bg-gold/60" />
          CONCIERGE AUTO ACQUISITION
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mt-8 font-display text-[14vw] leading-[0.9] tracking-tight md:text-[10rem]"
        >
          <span className="block">Buy your</span>
          <span className="block gold-shine italic">dream car.</span>
          <span className="block text-foreground/40">Online.</span>
        </motion.h1>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-end">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            We search Europe, verify every detail, and deliver to your doorstep. No haggling. No
            surprises. Just the car you've been dreaming of — handed over with the keys, by people
            who care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#collection"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground transition hover:scale-[1.02]"
            >
              <span className="relative z-10">View the collection</span>
              <svg
                className="relative z-10 h-4 w-4 transition group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-gold via-amber-200 to-gold opacity-0 transition group-hover:opacity-100" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-8 py-4 text-sm tracking-wide transition hover:border-gold hover:text-gold"
            >
              Request a quote
            </a>
          </motion.div>
        </div>

        {/* Hero car — entrance drive-in + scroll parallax */}
        <motion.div
          initial={{ x: "18%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          style={{ y: carY, rotate: carRotate, scale: carScale }}
          className="pointer-events-none absolute inset-x-0 -bottom-[10%] flex justify-center"
        >
          <div className="absolute inset-x-[15%] bottom-[10%] h-[30%] rounded-full bg-gold/20 blur-[80px]" />
          <motion.img
            src={heroCar}
            alt="Luxury black sports coupe"
            style={{ x: sx, y: sy, opacity: fade }}
            className="relative w-[140vw] max-w-[1800px] drop-shadow-[0_60px_80px_rgba(212,168,76,0.3)]"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="relative z-10 mt-auto grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/40 md:grid-cols-4"
        >
          {[
            { k: "4,200+", v: "Cars delivered" },
            { k: "11 yrs", v: "Of craft" },
            { k: "32 pt", v: "Inspection" },
            { k: "100%", v: "Verified history" },
          ].map((s) => (
            <div key={s.v} className="bg-background/80 px-6 py-6 backdrop-blur">
              <div className="font-display text-3xl text-gold">{s.k}</div>
              <div className="mt-1 text-xs tracking-widest text-muted-foreground">
                {s.v.toUpperCase()}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-muted-foreground">
        SCROLL ↓
      </div>
    </section>
  );
}
