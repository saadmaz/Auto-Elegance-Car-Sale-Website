import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WheelScene } from "@/components/CarScene";
import carTop from "@/assets/car-top.jpg";

export function Atelier() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-15, 25]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="atelier"
      ref={ref}
      className="content-auto relative overflow-hidden py-32 md:py-52"
    >
      <div className="mx-auto grid max-w-400 gap-20 px-6 md:grid-cols-12 md:gap-28 md:px-16">
        <div className="md:col-span-5 md:sticky md:top-36 md:self-start">
          <div className="text-xs tracking-[0.4em] text-gold/80">— THE ATELIER</div>
          <h2 className="mt-8 font-display text-6xl leading-[1] tracking-tight md:text-7xl">
            A car is not a transaction. It's a{" "}
            <span className="italic gold-shine">moment</span>.
          </h2>
          <p className="mt-10 max-w-md leading-[1.85] text-muted-foreground">
            For over a decade we've made the unromantic act of buying a car feel like coming home.
            Every car we touch is sourced personally, verified against a 32-point protocol, and
            prepared with reverence.
          </p>
          <div className="mt-14 flex items-center gap-10 text-xs tracking-widest text-muted-foreground">
            <div>
              <div className="font-display text-4xl text-foreground">98%</div>
              <div className="mt-2">REPEAT CLIENTS</div>
            </div>
            <div className="h-14 w-px bg-border" />
            <div>
              <div className="font-display text-4xl text-foreground">9.8</div>
              <div className="mt-2">AVG. RATING / 10</div>
            </div>
          </div>
        </div>

        <div className="relative md:col-span-7">
          <motion.div
            style={{ y, rotate }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border"
          >
            <img
              src={carTop}
              alt="Aerial luxury car"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1280}
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between md:bottom-10 md:left-10 md:right-10">
              <div>
                <div className="text-xs tracking-[0.3em] text-gold">REF. 087 / 2024</div>
                <div className="mt-3 font-display text-2xl">Mercedes-AMG GT Black Series</div>
              </div>
              <div className="rounded-full border border-gold/40 bg-background/60 px-4 py-2 text-xs backdrop-blur">
                Featured
              </div>
            </div>
          </motion.div>

          <div className="absolute -left-12 top-1/3 hidden h-48 w-48 md:block">
            <WheelScene />
          </div>
        </div>
      </div>
    </section>
  );
}
