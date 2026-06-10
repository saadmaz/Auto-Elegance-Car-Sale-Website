import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Craft",    href: "#atelier" },
  { label: "Services", href: "#collection" },
  { label: "Process",  href: "#process" },
  { label: "Clients",  href: "#voices" },
  { label: "Book",     href: "#contact" },
];

export function Nav() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background/95 to-transparent" />

      {/* Bottom border that appears on scroll */}
      <motion.div
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
      />

      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between px-8 py-6 md:px-16 md:py-7">

        {/* Logo */}
        <a href="#" className="flex items-center gap-4 group">
          <div
            className="flex h-10 w-10 items-center justify-center border border-gold/30 transition-colors group-hover:border-gold/60"
            style={{ borderRadius: "2px" }}
          >
            <span className="font-display text-lg text-gold leading-none">P</span>
          </div>
          <div className="leading-none">
            <div className="font-display text-[1.05rem] tracking-[0.18em] text-foreground/90">
              POLISH STATION
            </div>
            <div
              className="mt-1 text-[9px] tracking-[0.45em] text-muted-foreground/60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              EST. 2024
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative text-[0.8rem] tracking-[0.12em] text-foreground/55 transition-colors hover:text-foreground/90"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {n.label.toUpperCase()}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold/70 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-5">
          <a
            href="#contact"
            className="hidden items-center gap-2.5 border border-gold/35 px-6 py-2.5 text-[0.75rem] tracking-[0.14em] text-foreground/80 backdrop-blur transition hover:border-gold/60 hover:text-foreground md:inline-flex"
            style={{ borderRadius: "2px", fontFamily: "var(--font-sans)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            BOOK NOW
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <motion.div
              animate={open ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: [0.25, 0, 0, 1] }}
              className="h-px w-[22px] origin-center bg-foreground/80"
            />
            <motion.div
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18 }}
              className="h-px w-[14px] self-end bg-foreground/80"
            />
            <motion.div
              animate={open ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: [0.25, 0, 0, 1] }}
              className="h-px w-[22px] origin-center bg-foreground/80"
            />
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.30, ease: [0.25, 0, 0, 1] }}
            className="overflow-hidden border-b border-border/60 bg-background/98 backdrop-blur-2xl md:hidden"
          >
            <nav className="mx-auto max-w-[1600px] px-8 pb-12 pt-2">
              {NAV_LINKS.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.26 }}
                  className="flex items-center justify-between border-b border-border/30 py-7 font-display text-[2.6rem] leading-none text-foreground/75 transition hover:text-gold"
                >
                  {n.label}
                  <span className="text-sm text-gold/40 font-sans">→</span>
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.28 }}
                className="mt-8 inline-flex w-full items-center justify-center gap-2.5 bg-gold px-8 py-4 text-[0.78rem] tracking-[0.18em] text-primary-foreground transition hover:opacity-90"
                style={{ borderRadius: "2px", fontFamily: "var(--font-sans)" }}
              >
                BOOK NOW
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
