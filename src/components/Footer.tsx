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
              {EXPLORE_LINKS.map((x) => (
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
              {LEGAL_LINKS.map((x) => (
                <a key={x} href="#" className="block py-1 text-muted-foreground hover:text-foreground">
                  {x}
                </a>
              ))}
            </div>
            <div>
              <div className="mb-4 text-xs tracking-widest text-gold">FOLLOW</div>
              {SOCIAL_LINKS.map((x) => (
                <a key={x} href="#" className="block py-1 text-muted-foreground hover:text-foreground">
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
