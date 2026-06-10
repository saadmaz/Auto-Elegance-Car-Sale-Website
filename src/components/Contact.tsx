import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import type { FormEvent } from "react";
import heroCar from "@/assets/hero-car.webp";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    // TODO: replace with a real email service (Resend, Sendgrid, etc.)
    setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <section id="contact" className="content-auto relative overflow-hidden py-32 md:py-52">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden">
        <img
          src={heroCar}
          alt=""
          aria-hidden="true"
          className="w-full opacity-[0.06]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-400 gap-20 px-6 md:grid-cols-2 md:gap-28 md:px-16">
        <div className="py-4">
          <div className="text-xs tracking-[0.4em] text-gold/80">— CONTACT</div>
          <h2 className="mt-8 font-display text-6xl leading-none tracking-tight md:text-8xl">
            Tell us the <span className="italic gold-shine">dream</span>.
          </h2>
          <p className="mt-10 max-w-md leading-[1.85] text-muted-foreground">
            One form. One reply within 24 hours. One car, found.
          </p>
          <div className="mt-16 space-y-8">
            {[
              { label: "CALL", value: "+48 600 000 000" },
              { label: "WRITE", value: "hello@maisonauto.com" },
              { label: "VISIT", value: "Warsaw · Berlin · Munich" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-xs tracking-widest text-muted-foreground">{item.label}</div>
                <div className="mt-2 font-display text-2xl">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start justify-center rounded-3xl border border-gold/30 bg-card p-10 md:p-14"
            >
              <div className="text-xs tracking-[0.4em] text-gold/80">— RECEIVED</div>
              <div className="mt-8 font-display text-5xl italic gold-shine">Thank you.</div>
              <p className="mt-8 leading-[1.85] text-muted-foreground">
                We've received your request and will reply within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-12 text-sm text-muted-foreground transition hover:text-foreground"
              >
                Submit another request →
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-border bg-card p-10 md:p-14"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-8">
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
                      className="mt-3 w-full border-b border-border bg-transparent py-3 text-lg outline-none transition focus:border-gold"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="text-xs tracking-widest text-muted-foreground">
                    ANYTHING ELSE?
                  </span>
                  <textarea
                    rows={3}
                    className="mt-3 w-full resize-none border-b border-border bg-transparent py-3 text-lg outline-none transition focus:border-gold"
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-9 py-4 text-sm tracking-wide text-primary-foreground transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
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
