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

export function Collection() {
  return (
    <section id="collection" className="content-auto relative overflow-hidden py-32 md:py-52">
      <div className="mx-auto max-w-400 px-6 md:px-16">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs tracking-[0.4em] text-gold/80">— COLLECTION</div>
            <h2 className="mt-8 font-display text-6xl leading-none tracking-tight md:text-7xl">
              In the garage <span className="italic gold-shine">now</span>.
            </h2>
          </div>
          <a
            href="#contact"
            className="hidden text-sm text-muted-foreground transition hover:text-gold md:inline"
          >
            Request a custom search →
          </a>
        </div>

        <div className="mt-24 space-y-36">
          {COLLECTION.map((car, i) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1 }}
              className={`grid items-center gap-16 md:grid-cols-2 md:gap-24 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <TiltCard>
                <div className="relative">
                  <div className="absolute -inset-8 rounded-full bg-gradient-radial from-gold/25 via-transparent to-transparent blur-2xl" />
                  <div className="group/img relative overflow-hidden">
                    <img
                      src={car.img}
                      alt={car.name}
                      className="relative w-full transition-transform duration-700 group-hover/img:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                      width={1280}
                      height={768}
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-900 ease-in-out group-hover/img:translate-x-[500%]" />
                  </div>
                </div>
              </TiltCard>

              <div className="py-4">
                <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-gold">
                  <span className="h-px w-8 bg-gold" />
                  REF. 0{i + 1} · {car.tag.toUpperCase()}
                </div>
                <h3 className="mt-8 font-display text-5xl leading-[1.05] md:text-6xl">
                  {car.name}
                </h3>
                <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
                  {[
                    { k: car.year, v: "Year" },
                    { k: car.km, v: "Mileage" },
                    { k: car.price, v: "Price" },
                  ].map((d) => (
                    <div key={d.v} className="bg-card px-5 py-6 md:px-6">
                      <div className="text-xs tracking-widest text-muted-foreground">
                        {d.v.toUpperCase()}
                      </div>
                      <div className="mt-2 font-display text-xl">{d.k}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm text-primary-foreground transition hover:scale-[1.02]"
                  >
                    Reserve this car →
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3.5 text-sm transition hover:border-gold hover:text-gold"
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
