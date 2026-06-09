import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import heroCar from "@/assets/hero-car.webp";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    // TODO: replace with a real email service (Resend, Sendgrid, etc.)
    setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <section id="contact" className="content-auto relative overflow-hidden py-32 md:py-48">
      {/* Car teaser backdrop */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden">
        <img
          src={heroCar}
          alt=""
          aria-hidden="true"
          className="w-full opacity-[0.06]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-2 md:px-12">
        <div>
          <div className="text-xs tracking-[0.4em] text-gold/80">— CONTACT</div>
          <h2 className="mt-6 font-display text-6xl leading-[1] tracking-tight md:text-8xl">
            Tell us the <span className="italic gold-shine">dream</span>.
          </h2>
          <p className="mt-8 max-w-md text-muted-foreground">
            One form. One reply within 24 hours. One car, found.
          </p>
          <div className="mt-12 space-y-6 text-sm">
            <div>
              <div className="text-xs tracking-widest text-muted-foreground">CALL</div>
              <div className="mt-1 font-display text-2xl">+48 600 000 000</div>
            </div>
            <div>
              <div className="text-xs tracking-widest text-muted-foreground">WRITE</div>
              <div className="mt-1 font-display text-2xl">hello@maisonauto.com</div>
            </div>
            <div>
              <div className="text-xs tracking-widest text-muted-foreground">VISIT</div>
              <div className="mt-1 font-display text-2xl">Warsaw · Berlin · Munich</div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start justify-center rounded-3xl border border-gold/30 bg-card p-8 md:p-10"
            >
              <div className="text-xs tracking-[0.4em] text-gold/80">— RECEIVED</div>
              <div className="mt-6 font-display text-5xl italic gold-shine">Thank you.</div>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                We've received your request and will reply within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-10 text-sm text-muted-foreground transition hover:text-foreground"
              >
                Submit another request →
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-border bg-card p-8 md:p-10"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-6">
                {[
                  { l: "Your name", t: "text", required: true },
                  { l: "Email", t: "email", required: true },
                  { l: "Dream car (brand, model, year)", t: "text", required: false },
                  { l: "Budget", t: "text", required: false },
                ].map((f) => (
                  <label key={f.l} className="block">
                    <span className="text-xs tracking-widest text-muted-foreground">
                      {f.l.toUpperCase()}
                      {f.required && <span className="ml-1 text-gold">*</span>}
                    </span>
                    <input
                      type={f.t}
                      required={f.required}
                      className="mt-2 w-full border-b border-border bg-transparent py-3 text-lg outline-none transition focus:border-gold"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="text-xs tracking-widest text-muted-foreground">
                    ANYTHING ELSE?
                  </span>
                  <textarea
                    rows={3}
                    className="mt-2 w-full resize-none border-b border-border bg-transparent py-3 text-lg outline-none transition focus:border-gold"
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm tracking-wide text-primary-foreground transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                      Sending…
                    </>
                  ) : (
                    "Send my request →"
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
