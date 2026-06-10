import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Atelier } from "@/components/Atelier";
import { Process } from "@/components/Process";
import { Collection } from "@/components/Collection";
import { Voices } from "@/components/Voices";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const CinematicDrive = lazy(() =>
  import("@/components/CinematicDrive").then((m) => ({ default: m.CinematicDrive })),
);

const Runway = lazy(() =>
  import("@/components/Runway").then((m) => ({ default: m.Runway })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAISON AUTO — Curated Luxury Cars, Delivered" },
      {
        name: "description",
        content:
          "Hand-picked European luxury cars, sourced, verified, and delivered to your door. Concierge auto-buying for collectors and enthusiasts.",
      },
      { property: "og:title", content: "MAISON AUTO — Curated Luxury Cars" },
      {
        property: "og:description",
        content: "Concierge sourcing of European luxury cars. Verified. Delivered.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Suspense fallback={<SceneFallback label="Loading the drive..." tag="SCENE · PREPARING" tall />}>
        <CinematicDrive />
      </Suspense>
      <Atelier />
      <Process />
      <Suspense fallback={<SceneFallback label="Loading the showroom..." tag="FLEET · PREPARING" />}>
        <Runway />
      </Suspense>
      <Collection />
      <Voices />
      <Contact />
      <Footer />
    </main>
  );
}

function SceneFallback({ label, tag, tall }: { label: string; tag: string; tall?: boolean }) {
  return (
    <section
      className={`content-auto flex items-center justify-center border-y border-border/40 bg-card/30 ${tall ? "h-[90vh]" : "h-[70vh]"}`}
    >
      <div className="text-center">
        <div className="font-display text-[2.5rem] font-light text-gold/70 md:text-[3.5rem]">{label}</div>
        <div
          className="mt-3 text-[9px] tracking-[0.45em] text-muted-foreground/50"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {tag}
        </div>
      </div>
    </section>
  );
}
