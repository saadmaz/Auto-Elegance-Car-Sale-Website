import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Atelier", href: "#atelier" },
  { label: "Collection", href: "#collection" },
  { label: "Process", href: "#process" },
  { label: "Voices", href: "#voices" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background/90 to-transparent" />

      <div className="relative mx-auto flex max-w-400 items-center justify-between px-6 py-6 md:px-16 md:py-8">
        <a href="#" className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40">
            <span className="font-display text-xl text-gold">M</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl tracking-wider">MAISON</div>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground">AUTO · EST 2014</div>
          </div>
        </a>

        <nav className="hidden items-center gap-12 md:flex">
          {NAV_LINKS.map((n) => (
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

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-6 py-3 text-sm text-foreground backdrop-blur transition hover:bg-gold/10 md:inline-flex"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            Request a search
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.25 md:hidden"
          >
            <motion.div
              animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
              className="h-px w-6 origin-center bg-foreground"
            />
            <motion.div
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="h-px w-4 self-end bg-foreground"
            />
            <motion.div
              animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
              className="h-px w-6 origin-center bg-foreground"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0, 0, 1] }}
            className="overflow-hidden border-b border-border bg-background/96 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto max-w-400 px-6 pb-10 pt-4">
              {NAV_LINKS.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.28 }}
                  className="flex items-center justify-between border-b border-border/40 py-6 font-display text-3xl text-foreground/80 transition hover:text-gold"
                >
                  {n.label}
                  <span className="text-sm text-gold/50">→</span>
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-8 flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm tracking-wide text-primary-foreground transition hover:scale-[1.01]"
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
