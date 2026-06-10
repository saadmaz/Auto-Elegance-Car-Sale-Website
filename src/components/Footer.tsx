const EXPLORE_LINKS = [
  { label: "Services", href: "#collection" },
  { label: "Process",  href: "#process" },
  { label: "Our Craft", href: "#atelier" },
  { label: "Book",     href: "#contact" },
];

const LEGAL_LINKS  = ["Imprint", "Privacy", "Terms"];
const SOCIAL_LINKS = ["Instagram", "YouTube", "LinkedIn"];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="mx-auto max-w-[1600px] px-8 py-20 md:px-16 md:py-28">

        {/* Top row */}
        <div className="flex flex-col gap-16 md:flex-row md:items-start md:justify-between md:gap-20">

          {/* Brand block */}
          <div className="max-w-[280px]">
            <div className="font-display text-[2.8rem] font-light leading-none tracking-tight">
              POLISH STATION
            </div>
            <div
              className="mt-3 text-[8.5px] tracking-[0.4em] text-muted-foreground/50"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              PREMIUM DETAILING · DELIVERED WITH PRECISION
            </div>
            <p className="mt-8 text-[0.86rem] leading-[1.9] text-muted-foreground/65">
              Professional car detailing, ceramic coating, and paint correction.
              Precision in every detail.
            </p>
            <div className="mt-8 flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span
                className="text-[8.5px] tracking-[0.35em] text-gold/60"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                BOOKING NOW OPEN
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-16 text-sm">
            <div>
              <div
                className="mb-7 text-[8.5px] tracking-[0.42em] text-gold/65"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                EXPLORE
              </div>
              {EXPLORE_LINKS.map((x) => (
                <a
                  key={x.label}
                  href={x.href}
                  className="block py-2 text-[0.88rem] text-muted-foreground/60 transition hover:text-foreground/85"
                >
                  {x.label}
                </a>
              ))}
            </div>
            <div>
              <div
                className="mb-7 text-[8.5px] tracking-[0.42em] text-gold/65"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                LEGAL
              </div>
              {LEGAL_LINKS.map((x) => (
                <a
                  key={x}
                  href="#"
                  className="block py-2 text-[0.88rem] text-muted-foreground/60 transition hover:text-foreground/85"
                >
                  {x}
                </a>
              ))}
            </div>
            <div>
              <div
                className="mb-7 text-[8.5px] tracking-[0.42em] text-gold/65"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                FOLLOW
              </div>
              {SOCIAL_LINKS.map((x) => (
                <a
                  key={x}
                  href="#"
                  className="block py-2 text-[0.88rem] text-muted-foreground/60 transition hover:text-foreground/85"
                >
                  {x}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/30 pt-10 md:flex-row">
          <div
            className="text-[8.5px] tracking-[0.3em] text-muted-foreground/40"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © 2026 POLISH STATION. ALL DETAILS PERFECTED.
          </div>
          <div
            className="text-[8.5px] tracking-[0.3em] text-muted-foreground/30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            CRAFTED WITH PRECISION.
          </div>
        </div>
      </div>
    </footer>
  );
}
