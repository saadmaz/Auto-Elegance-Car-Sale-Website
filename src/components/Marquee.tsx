const BRANDS = [
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

export function Marquee() {
  return (
    <div className="content-auto relative overflow-hidden border-y border-border bg-card py-8">
      <div className="marquee flex w-max gap-16">
        {[...BRANDS, ...BRANDS].map((w, i) => (
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
