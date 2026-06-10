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
    <div className="content-auto relative overflow-hidden border-y border-border/50 bg-card py-14 md:py-18">
      {/* Top accent rule */}
      <div className="rule-gold pointer-events-none absolute inset-x-0 top-0" />
      <div className="rule-gold pointer-events-none absolute inset-x-0 bottom-0" />

      <div className="marquee flex w-max gap-0">
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <div
            key={i}
            className="flex items-center gap-14 px-14"
          >
            <span className="font-display text-[2.6rem] font-light tracking-tight text-foreground/22 md:text-[3.8rem]">
              {brand}
            </span>
            <span
              className="text-[0.55rem] tracking-[0.5em] text-gold/55"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
