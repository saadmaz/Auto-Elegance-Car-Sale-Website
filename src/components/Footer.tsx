const EXPLORE_LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "Process", href: "#process" },
  { label: "Atelier", href: "#atelier" },
  { label: "Contact", href: "#contact" },
];

const LEGAL_LINKS = ["Imprint", "Privacy", "Terms"];

const SOCIAL_LINKS = ["Instagram", "YouTube", "LinkedIn"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-400 px-6 py-24 md:px-16 md:py-32">
        <div className="flex flex-col items-start justify-between gap-16 md:flex-row md:gap-20">
          <div className="max-w-xs">
            <div className="font-display text-5xl">MAISON AUTO</div>
            <div className="mt-3 text-xs tracking-[0.3em] text-muted-foreground">
              CURATED CARS · DELIVERED WITH CARE
            </div>
            <p className="mt-8 leading-[1.85] text-sm text-muted-foreground">
              Hand-picked European luxury cars, sourced personally and delivered to your door.
            </p>
          </div>

          <div className="flex flex-wrap gap-16 text-sm">
            <div>
              <div className="mb-6 text-xs tracking-widest text-gold">EXPLORE</div>
              {EXPLORE_LINKS.map((x) => (
                <a
                  key={x.label}
                  href={x.href}
                  className="block py-2 text-muted-foreground transition hover:text-foreground"
                >
                  {x.label}
                </a>
              ))}
            </div>
            <div>
              <div className="mb-6 text-xs tracking-widest text-gold">LEGAL</div>
              {LEGAL_LINKS.map((x) => (
                <a
                  key={x}
                  href="#"
                  className="block py-2 text-muted-foreground transition hover:text-foreground"
                >
                  {x}
                </a>
              ))}
            </div>
            <div>
              <div className="mb-6 text-xs tracking-widest text-gold">FOLLOW</div>
              {SOCIAL_LINKS.map((x) => (
                <a
                  key={x}
                  href="#"
                  className="block py-2 text-muted-foreground transition hover:text-foreground"
                >
                  {x}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-border pt-10 text-xs text-muted-foreground md:flex-row">
          <div>© 2026 Maison Auto. All cars hand-picked.</div>
          <div>Crafted with reverence in Warsaw.</div>
        </div>
      </div>
    </footer>
  );
}
