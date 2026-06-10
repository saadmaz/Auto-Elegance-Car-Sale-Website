import { motion } from "motion/react";
import { TiltCard } from "@/components/TiltCard";
import car1 from "@/assets/car-1.webp";
import car2 from "@/assets/car-2.webp";
import car3 from "@/assets/car-3.webp";

const COLLECTION = [
  {
    name: "Porsche 911 Carrera",
    year: "2023",
    price: "€148,000",
    km: "8,200 km",
    img: car1,
    color: "Silver Pearl",
    ref: "REF · 087",
  },
  {
    name: "BMW M4 Competition",
    year: "2024",
    price: "€132,500",
    km: "3,400 km",
    img: car2,
    color: "Tanzanite Blue",
    ref: "REF · 091",
  },
  {
    name: "Audi RS7 Sportback",
    year: "2023",
    price: "€189,000",
    km: "12,100 km",
    img: car3,
    color: "Daytona Grey",
    ref: "REF · 094",
  },
];

export function Collection() {
  return (
    <section id="collection" className="content-auto relative overflow-hidden py-36 md:py-56">
      <div className="mx-auto max-w-[1600px] px-8 md:px-16">

        {/* Header */}
        <div className="flex items-end justify-between border-b border-border/40 pb-16">
          <div>
            <p
              className="flex items-center gap-3 text-[9px] tracking-[0.55em] text-gold/65"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="h-px w-8 bg-gold/40" />
              COLLECTION
            </p>
            <h2 className="mt-8 font-display text-[3rem] font-light leading-[1.0] md:text-[4.5rem] lg:text-[6rem]">
              In the garage
              <br />
              <span className="italic gold-shine">right now.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="hidden text-[0.78rem] tracking-[0.12em] text-muted-foreground/60 transition hover:text-gold md:inline-flex"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            REQUEST A CUSTOM SEARCH →
          </a>
        </div>

        {/* Car listings */}
        <div className="mt-0 divide-y divide-border/30">
          {COLLECTION.map((car, i) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.0 }}
              className={`grid items-center gap-14 py-20 md:grid-cols-2 md:gap-20 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <TiltCard>
                <div className="relative">
                  <div className="absolute -inset-8 rounded-full bg-gold/8 blur-3xl opacity-0 transition-opacity duration-700 group-hover/tilt:opacity-100" />
                  <div className="group/img relative overflow-hidden border border-border/30" style={{ borderRadius: "4px" }}>
                    <img
                      src={car.img}
                      alt={car.name}
                      className="relative w-full transition-transform duration-700 group-hover/img:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                      width={1280}
                      height={768}
                    />
                    {/* Paint glint sweep */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-12 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover/img:translate-x-[600%]" />
                  </div>
                </div>
              </TiltCard>

              {/* Details */}
              <div className="py-4">
                <div
                  className="flex items-center gap-3 text-[9px] tracking-[0.4em] text-gold/70"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <span className="h-px w-8 bg-gold/50" />
                  {car.ref} · {car.color.toUpperCase()}
                </div>

                <h3 className="mt-8 font-display text-[2.5rem] font-light leading-[1.05] md:text-[3.2rem] lg:text-[4rem]">
                  {car.name}
                </h3>

                {/* Specs */}
                <div className="mt-10 grid grid-cols-3 divide-x divide-border/40 border border-border/40" style={{ borderRadius: "2px" }}>
                  {[
                    { k: car.year,  v: "Year" },
                    { k: car.km,    v: "Mileage" },
                    { k: car.price, v: "Price" },
                  ].map((d) => (
                    <div key={d.v} className="px-5 py-6 md:px-7">
                      <div
                        className="text-[8.5px] tracking-[0.3em] text-muted-foreground/55"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {d.v.toUpperCase()}
                      </div>
                      <div className="mt-2.5 font-display text-[1.3rem] font-light">
                        {d.k}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-10 flex gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-[0.78rem] tracking-[0.12em] text-primary-foreground transition hover:opacity-90"
                    style={{ borderRadius: "2px", fontFamily: "var(--font-sans)" }}
                  >
                    RESERVE THIS CAR →
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center border border-foreground/15 px-7 py-3.5 text-[0.78rem] tracking-[0.12em] transition hover:border-gold/50 hover:text-gold"
                    style={{ borderRadius: "2px", fontFamily: "var(--font-sans)" }}
                  >
                    ENQUIRE
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
