import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WheelScene } from "@/components/CarScene";
import carTop from "@/assets/car-top.jpg";

export function Atelier() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 18]);
  const y      = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section
      id="atelier"
      ref={ref}
      className="content-auto relative overflow-hidden py-36 md:py-56"
    >
      {/* Subtle vertical rule */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-linear-to-b from-transparent via-border/40 to-transparent md:block" />

      <div className="mx-auto grid max-w-[1600px] gap-20 px-8 md:grid-cols-12 md:gap-24 md:px-16">

        {/* Left: sticky copy */}
        <div className="md:col-span-5 md:sticky md:top-36 md:self-start">
          <p
            className="flex items-center gap-3 text-[9px] tracking-[0.55em] text-gold/65"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="h-px w-8 bg-gold/40" />
            THE ATELIER
          </p>

          <h2 className="mt-8 font-display text-[3rem] font-light leading-[1.05] md:text-[4rem] lg:text-[5rem]">
            A car is not a
            <br />
            transaction.
            <br />
            <span className="italic gold-shine">It&apos;s a moment.</span>
          </h2>

          <div className="mt-1 h-px w-16 bg-gold/30" />

          <p className="mt-10 max-w-sm text-[0.9rem] leading-[1.95] text-muted-foreground/80">
            For over a decade we&apos;ve made the unromantic act of buying a car feel like
            coming home. Every car we touch is sourced personally, verified against a
            32-point protocol, and prepared with reverence.
          </p>

          <div className="mt-16 flex items-center gap-12">
            <div>
              <div className="font-display text-[2.8rem] font-light text-foreground">98%</div>
              <div
                className="mt-2 text-[8.5px] tracking-[0.3em] text-muted-foreground/60"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                REPEAT CLIENTS
              </div>
            </div>
            <div className="h-14 w-px bg-border/60" />
            <div>
              <div className="font-display text-[2.8rem] font-light text-foreground">9.8</div>
              <div
                className="mt-2 text-[8.5px] tracking-[0.3em] text-muted-foreground/60"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                AVG. RATING / 10
              </div>
            </div>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative md:col-span-7">
          <motion.div
            style={{ y, rotate, borderRadius: "4px" }}
            className="relative aspect-[4/5] overflow-hidden border border-border/50"
          >
            <img
              src={carTop}
              alt="Aerial luxury car"
              className="h-full w-full object-cover scale-[1.03]"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1280}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/10 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-background/20 to-transparent" />

            {/* Image caption */}
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between md:bottom-10 md:left-10 md:right-10">
              <div>
                <div
                  className="text-[9px] tracking-[0.4em] text-gold/80"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  REF. 087 / 2024
                </div>
                <div className="mt-3 font-display text-[1.4rem] font-light leading-tight">
                  Mercedes-AMG GT Black Series
                </div>
              </div>
              <div
                className="border border-gold/30 bg-background/60 px-4 py-2 text-[9px] tracking-[0.25em] backdrop-blur"
                style={{ borderRadius: "2px", fontFamily: "var(--font-mono)" }}
              >
                FEATURED
              </div>
            </div>
          </motion.div>

          {/* 3D Wheel accent */}
          <div className="absolute -left-14 top-1/3 hidden h-44 w-44 md:block">
            <WheelScene />
          </div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -bottom-8 -right-4 hidden border border-border/60 bg-card/90 px-8 py-6 backdrop-blur-md md:block"
            style={{ borderRadius: "4px" }}
          >
            <div
              className="text-[8.5px] tracking-[0.4em] text-gold/70"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              32-POINT PROTOCOL
            </div>
            <div className="mt-3 font-display text-[2rem] font-light">
              Every. Car.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
