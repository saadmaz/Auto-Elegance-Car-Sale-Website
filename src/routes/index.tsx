import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { WheelScene, EmblemScene } from "@/components/CarScene";
import heroCar from "@/assets/hero-car.png";
import car1 from "@/assets/car-1.png";
import car2 from "@/assets/car-2.png";
import car3 from "@/assets/car-3.png";
import carTop from "@/assets/car-top.jpg";

const CinematicDrive = lazy(() =>
  import("@/components/CinematicDrive").then((module) => ({ default: module.CinematicDrive })),
);

const Runway = lazy(() =>
  import("@/components/Runway").then((module) => ({ default: module.Runway })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAISON AUTO — Curated Luxury Cars, Delivered" },
      {
        name: "description",
        content:
          "Hand-picked European luxury cars, sourced, verified, and delivered to your door. Concierge auto-buying for collectors and enthusiasts.",
      },
      { property: "og:title", content: "MAISON AUTO — Curated Luxury Cars" },
      {
        property: "og:description",
        content: "Concierge sourcing of European luxury cars. Verified. Delivered.",
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Atelier", href: "#atelier" },
  { label: "Collection", href: "#collection" },
  { label: "Process", href: "#process" },
  { label: "Voices", href: "#voices" },
  { label: "Contact", href: "#contact" },
];

const COLLECTION = [
  {
    name: "Porsche 911 Carrera",
    year: "2023",
    price: "€148,000",
    km: "8,200 km",
    img: car1,
    tag: "Silver Pearl",
  },
  {
    name: "BMW M4 Competition",
    year: "2024",
    price: "€132,500",
    km: "3,400 km",
    img: car2,
    tag: "Tanzanite Blue",
  },
  {
    name: "Audi RS7 Sportback",
    year: "2023",
    price: "€189,000",
    km: "12,100 km",
    img: car3,
    tag: "Daytona Grey",
  },
];

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Gradient veil for legibility */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-background/85 to-transparent" />

      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40">
            <span className="font-display text-xl text-gold">M</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl tracking-wider">MAISON</div>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground">
              AUTO · EST 2014
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative text-sm tracking-wide text-foreground/70 transition hover:text-foreground"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-5 py-2.5 text-sm text-foreground backdrop-blur transition hover:bg-gold/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Request a search
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <motion.div
              animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
              className="h-px w-6 bg-foreground origin-center"
            />
            <motion.div
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="h-px w-4 self-end bg-foreground"
            />
            <motion.div
              animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
              className="h-px w-6 bg-foreground origin-center"
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0, 0, 1] }}
            className="overflow-hidden border-b border-border bg-background/96 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto max-w-[1600px] px-6 pb-8 pt-2">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.28 }}
                  className="flex items-center justify-between border-b border-border/40 py-5 font-display text-3xl text-foreground/80 transition hover:text-gold"
                >
                  {n.label}
                  <span className="text-sm text-gold/50">→</span>
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm tracking-wide text-primary-foreground transition hover:scale-[1.01]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/60" />
                Request a search
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
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
      sx.set(x * 30);
      sy.set(y * 20);
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

        {/* Hero car - giant, parallax & tilt */}
        <motion.div
          style={{ y: carY, rotate: carRotate, scale: carScale, opacity: fade }}
          className="pointer-events-none absolute inset-x-0 -bottom-[10%] flex justify-center"
        >
          <motion.img
            src={heroCar}
            alt="Luxury black sports coupe"
            style={{ x: sx, y: sy }}
            className="w-[140vw] max-w-[1800px] drop-shadow-[0_60px_80px_rgba(212,168,76,0.25)]"
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

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-muted-foreground">
        SCROLL ↓
      </div>
    </section>
  );
}

function Marquee() {
  const words = [
    "Porsche",
    "Mercedes-AMG",
    "BMW M",
    "Audi RS",
    "Lamborghini",
    "Ferrari",
    "Aston Martin",
    "Bentley",
    "McLaren",
    "Maserati",
  ];
  return (
    <div className="content-auto relative overflow-hidden border-y border-border bg-card py-8">
      <div className="marquee flex w-max gap-16">
        {[...words, ...words].map((w, i) => (
          <div
            key={i}
            className="flex items-center gap-16 font-display text-5xl text-foreground/30 md:text-7xl"
          >
            {w}
            <span className="text-gold">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Atelier() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-15, 25]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="atelier"
      ref={ref}
      className="content-auto relative overflow-hidden py-32 md:py-48"
    >
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
          <div className="text-xs tracking-[0.4em] text-gold/80">— THE ATELIER</div>
          <h2 className="mt-6 font-display text-6xl leading-[1] tracking-tight md:text-7xl">
            A car is not a transaction. It's a <span className="italic gold-shine">moment</span>.
          </h2>
          <p className="mt-8 max-w-md text-muted-foreground">
            For over a decade we've made the unromantic act of buying a car feel like coming home.
            Every car we touch is sourced personally, verified against a 32-point protocol, and
            prepared with reverence.
          </p>
          <div className="mt-10 flex items-center gap-6 text-xs tracking-widest text-muted-foreground">
            <div>
              <div className="font-display text-4xl text-foreground">98%</div>
              REPEAT CLIENTS
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="font-display text-4xl text-foreground">9.8</div>
              AVG. RATING / 10
            </div>
          </div>
        </div>

        <div className="relative md:col-span-7">
          <motion.div
            style={{ y, rotate }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border"
          >
            <img
              src={carTop}
              alt="Aerial luxury car"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1280}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <div className="text-xs tracking-[0.3em] text-gold">REF. 087 / 2024</div>
                <div className="mt-2 font-display text-2xl">Mercedes-AMG GT Black Series</div>
              </div>
              <div className="rounded-full border border-gold/40 bg-background/60 px-4 py-2 text-xs backdrop-blur">
                Featured
              </div>
            </div>
          </motion.div>

          <div className="absolute -left-12 top-1/3 hidden h-48 w-48 md:block">
            <WheelScene />
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      n: "01",
      t: "We search",
      d: "You tell us the dream. We crawl auctions, private dealers, and our European network — surfacing only what fits.",
    },
    {
      n: "02",
      t: "We verify",
      d: "Each candidate passes a 32-point inspection, full history check, and an in-person review by our specialists.",
    },
    {
      n: "03",
      t: "We deliver",
      d: "Paperwork, transport, registration — handled. The car arrives at your door, fueled, detailed, and ready.",
    },
  ];
  return (
    <section id="process" className="content-auto relative overflow-hidden py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="text-xs tracking-[0.4em] text-gold/80">— PROCESS</div>
            <h2 className="mt-6 font-display text-6xl leading-[1] tracking-tight md:text-7xl">
              Three steps. <br />
              <span className="italic text-foreground/50">Zero compromise.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Most clients receive their car within 14–28 days. Some have waited months for the right
            one. We don't rush perfection.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:border-gold/40"
            >
              <div className="font-display text-7xl text-gold/30 transition group-hover:text-gold/60">
                {s.n}
              </div>
              <h3 className="mt-8 font-display text-3xl">{s.t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              <div className="mt-12 flex items-center justify-between border-t border-border pt-6 text-xs tracking-widest text-muted-foreground">
                <span>STEP {s.n}</span>
                <span className="text-gold">→</span>
              </div>
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/0 blur-3xl transition group-hover:bg-gold/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Collection() {
  return (
    <section id="collection" className="content-auto relative overflow-hidden py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs tracking-[0.4em] text-gold/80">— COLLECTION</div>
            <h2 className="mt-6 font-display text-6xl leading-[1] tracking-tight md:text-7xl">
              In the garage <span className="italic gold-shine">now</span>.
            </h2>
          </div>
          <a href="#contact" className="hidden text-sm text-muted-foreground hover:text-gold md:inline">
            Request a custom search →
          </a>
        </div>

        <div className="mt-20 space-y-32">
          {COLLECTION.map((car, i) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1 }}
              className={`grid items-center gap-12 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-gradient-radial from-gold/20 via-transparent to-transparent blur-2xl" />
                <motion.img
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 150 }}
                  src={car.img}
                  alt={car.name}
                  className="relative w-full"
                  loading="lazy"
                  decoding="async"
                  width={1280}
                  height={768}
                />
              </div>
              <div>
                <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-gold">
                  <span className="h-px w-8 bg-gold" />
                  REF. 0{i + 1} · {car.tag.toUpperCase()}
                </div>
                <h3 className="mt-6 font-display text-5xl leading-[1.05] md:text-6xl">
                  {car.name}
                </h3>
                <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
                  {[
                    { k: car.year, v: "Year" },
                    { k: car.km, v: "Mileage" },
                    { k: car.price, v: "Price" },
                  ].map((d) => (
                    <div key={d.v} className="bg-card px-4 py-4">
                      <div className="text-xs tracking-widest text-muted-foreground">
                        {d.v.toUpperCase()}
                      </div>
                      <div className="mt-1 font-display text-xl">{d.k}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm text-primary-foreground transition hover:scale-[1.02]"
                  >
                    Reserve this car →
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm transition hover:border-gold hover:text-gold"
                  >
                    Enquire
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Voices() {
  const quotes = [
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
  return (
    <section
      id="voices"
      className="content-auto relative overflow-hidden border-y border-border bg-card py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="text-xs tracking-[0.4em] text-gold/80">— VOICES</div>
        <h2 className="mt-6 max-w-3xl font-display text-6xl leading-[1] tracking-tight md:text-7xl">
          4,200 owners. <span className="italic text-foreground/40">A few of their words.</span>
        </h2>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
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

function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    // TODO: replace setTimeout with a real email service call (Resend, Sendgrid, etc.)
    setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <section id="contact" className="content-auto relative overflow-hidden py-32 md:py-48">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-2 md:px-12">
        <div>
          <div className="text-xs tracking-[0.4em] text-gold/80">— CONTACT</div>
          <h2 className="mt-6 font-display text-6xl leading-[1] tracking-tight md:text-8xl">
            Tell us the <span className="italic gold-shine">dream</span>.
          </h2>
          <p className="mt-8 max-w-md text-muted-foreground">
            One form. One reply within 24 hours. One car, found.
          </p>
          <div className="mt-12 space-y-6 text-sm">
            <div>
              <div className="text-xs tracking-widest text-muted-foreground">CALL</div>
              <div className="mt-1 font-display text-2xl">+48 600 000 000</div>
            </div>
            <div>
              <div className="text-xs tracking-widest text-muted-foreground">WRITE</div>
              <div className="mt-1 font-display text-2xl">hello@maisonauto.com</div>
            </div>
            <div>
              <div className="text-xs tracking-widest text-muted-foreground">VISIT</div>
              <div className="mt-1 font-display text-2xl">Warsaw · Berlin · Munich</div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start justify-center rounded-3xl border border-gold/30 bg-card p-8 md:p-10"
            >
              <div className="text-xs tracking-[0.4em] text-gold/80">— RECEIVED</div>
              <div className="mt-6 font-display text-5xl italic gold-shine">Thank you.</div>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                We've received your request and will reply within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-10 text-sm text-muted-foreground transition hover:text-foreground"
              >
                Submit another request →
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-border bg-card p-8 md:p-10"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-6">
                {[
                  { l: "Your name", t: "text", required: true },
                  { l: "Email", t: "email", required: true },
                  { l: "Dream car (brand, model, year)", t: "text", required: false },
                  { l: "Budget", t: "text", required: false },
                ].map((f) => (
                  <label key={f.l} className="block">
                    <span className="text-xs tracking-widest text-muted-foreground">
                      {f.l.toUpperCase()}
                      {f.required && <span className="ml-1 text-gold">*</span>}
                    </span>
                    <input
                      type={f.t}
                      required={f.required}
                      className="mt-2 w-full border-b border-border bg-transparent py-3 text-lg outline-none transition focus:border-gold"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="text-xs tracking-widest text-muted-foreground">
                    ANYTHING ELSE?
                  </span>
                  <textarea
                    rows={3}
                    className="mt-2 w-full resize-none border-b border-border bg-transparent py-3 text-lg outline-none transition focus:border-gold"
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm tracking-wide text-primary-foreground transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                      Sending…
                    </>
                  ) : (
                    "Send my request →"
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
          <div>
            <div className="font-display text-5xl">MAISON AUTO</div>
            <div className="mt-2 text-xs tracking-[0.3em] text-muted-foreground">
              CURATED CARS · DELIVERED WITH CARE
            </div>
          </div>
          <div className="flex flex-wrap gap-12 text-sm">
            <div>
              <div className="mb-4 text-xs tracking-widest text-gold">EXPLORE</div>
              {[
                { label: "Collection", href: "#collection" },
                { label: "Process", href: "#process" },
                { label: "Atelier", href: "#atelier" },
                { label: "Contact", href: "#contact" },
              ].map((x) => (
                <a
                  key={x.label}
                  href={x.href}
                  className="block py-1 text-muted-foreground hover:text-foreground"
                >
                  {x.label}
                </a>
              ))}
            </div>
            <div>
              <div className="mb-4 text-xs tracking-widest text-gold">LEGAL</div>
              {["Imprint", "Privacy", "Terms"].map((x) => (
                <a
                  key={x}
                  href="#"
                  className="block py-1 text-muted-foreground hover:text-foreground"
                >
                  {x}
                </a>
              ))}
            </div>
            <div>
              <div className="mb-4 text-xs tracking-widest text-gold">FOLLOW</div>
              {["Instagram", "YouTube", "LinkedIn"].map((x) => (
                <a
                  key={x}
                  href="#"
                  className="block py-1 text-muted-foreground hover:text-foreground"
                >
                  {x}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <div>© 2026 Maison Auto. All cars hand-picked.</div>
          <div>Crafted with reverence in Warsaw.</div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="relative bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Suspense
        fallback={
          <section className="content-auto flex h-[90vh] items-center justify-center border-y border-border bg-card/40">
            <div className="text-center">
              <div className="font-display text-5xl text-gold">Loading the drive...</div>
              <div className="mt-3 text-xs tracking-[0.4em] text-muted-foreground">
                SCENE · PREPARING
              </div>
            </div>
          </section>
        }
      >
        <CinematicDrive />
      </Suspense>
      <Atelier />
      <Process />
      <Suspense
        fallback={
          <section className="content-auto flex h-[70vh] items-center justify-center bg-background">
            <div className="text-center">
              <div className="font-display text-4xl text-gold">Loading the showroom...</div>
              <div className="mt-3 text-xs tracking-[0.4em] text-muted-foreground">
                FLEET · PREPARING
              </div>
            </div>
          </section>
        }
      >
        <Runway />
      </Suspense>
      <Collection />
      <Voices />
      <Contact />
      <Footer />
    </main>
  );
}
