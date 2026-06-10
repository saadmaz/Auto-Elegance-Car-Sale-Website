import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import type { FormEvent } from "react";

const CONTACT_ITEMS = [
  { label: "CALL",  value: "+48 600 000 000" },
  { label: "WRITE", value: "hello@maisonauto.com" },
  { label: "VISIT", value: "Warsaw · Berlin · Munich" },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <section id="contact" className="content-auto relative overflow-hidden py-36 md:py-56">
      {/* Background rule */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-linear-to-b from-transparent via-border/30 to-transparent md:block" />

      <div className="relative mx-auto grid max-w-[1600px] gap-20 px-8 md:grid-cols-2 md:gap-24 md:px-16">

        {/* Left: info */}
        <div className="py-4">
          <p
            className="flex items-center gap-3 text-[9px] tracking-[0.55em] text-gold/65"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="h-px w-8 bg-gold/40" />
            CONTACT
          </p>

          <h2 className="mt-8 font-display text-[3rem] font-light leading-[1.0] md:text-[4.5rem] lg:text-[6rem]">
            Tell us the
            <br />
            <span className="italic gold-shine">dream.</span>
          </h2>

          <p className="mt-10 max-w-sm text-[0.88rem] leading-[1.95] text-muted-foreground/80">
            One form. One reply within 24 hours. One car, found.
          </p>

          <div className="mt-16 space-y-10">
            {CONTACT_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-border/30 pb-10">
                <div
                  className="text-[8.5px] tracking-[0.45em] text-muted-foreground/50"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.label}
                </div>
                <div className="mt-3 font-display text-[1.5rem] font-light">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form or success */}
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex flex-col items-start justify-center border border-gold/25 bg-card px-10 py-14 md:px-14 md:py-18"
              style={{ borderRadius: "4px" }}
            >
              <p
                className="text-[9px] tracking-[0.5em] text-gold/70"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                — REQUEST RECEIVED
              </p>
              <div className="mt-8 font-display text-[3rem] font-light italic gold-shine leading-tight">
                Thank you.
              </div>
              <p className="mt-8 max-w-xs text-[0.88rem] leading-[1.95] text-muted-foreground/75">
                We&apos;ve received your request and will reply within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-12 text-[0.78rem] tracking-[0.12em] text-muted-foreground/50 transition hover:text-foreground/80"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                SUBMIT ANOTHER REQUEST →
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="border border-border/50 bg-card px-10 py-14 md:px-14 md:py-18"
              style={{ borderRadius: "4px" }}
            >
              <div className="grid gap-10">
                {[
                  { l: "Your name",                     t: "text",  required: true  },
                  { l: "Email address",                  t: "email", required: true  },
                  { l: "Dream car (brand, model, year)", t: "text",  required: false },
                  { l: "Budget",                         t: "text",  required: false },
                ].map((f) => (
                  <label key={f.l} className="block">
                    <span
                      className="text-[8.5px] tracking-[0.38em] text-muted-foreground/55"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {f.l.toUpperCase()}
                      {f.required && <span className="ml-1 text-gold/70">*</span>}
                    </span>
                    <input
                      type={f.t}
                      required={f.required}
                      className="mt-3 w-full border-b border-border/50 bg-transparent py-3 text-[1.05rem] font-light outline-none transition-colors focus:border-gold/60 placeholder:text-foreground/20"
                      style={{ fontFamily: "var(--font-display)" }}
                    />
                  </label>
                ))}

                <label className="block">
                  <span
                    className="text-[8.5px] tracking-[0.38em] text-muted-foreground/55"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    ANYTHING ELSE?
                  </span>
                  <textarea
                    rows={3}
                    className="mt-3 w-full resize-none border-b border-border/50 bg-transparent py-3 text-[1.05rem] font-light outline-none transition-colors focus:border-gold/60"
                    style={{ fontFamily: "var(--font-display)" }}
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 inline-flex items-center justify-center gap-2.5 bg-gold px-9 py-4 text-[0.78rem] tracking-[0.16em] text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ borderRadius: "2px", fontFamily: "var(--font-sans)" }}
                >
                  {status === "loading" ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground/35 border-t-primary-foreground" />
                      SENDING…
                    </>
                  ) : (
                    "SEND MY REQUEST →"
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
