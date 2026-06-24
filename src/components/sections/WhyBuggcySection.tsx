import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE_CONTENT } from "../../data/content";
import { Eyebrow, TextReveal } from "../shared/Primitives";

function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const numeric = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * numeric));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function WhyBuggcySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xLine = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-28 sm:py-40">
      <div className="container-x">
        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <Eyebrow className="mb-5">Why Choose Us</Eyebrow>
          <TextReveal
            text="Why choose buggcy?"
            as="h2"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-blue-950"
          />
          <p className="mt-6 text-lg text-blue-950/55">
            Our connection with clients sets us apart from competitors in addition to
            our expertise.
          </p>
        </div>

        {/* Big animated counters */}
        <div className="mb-24 grid grid-cols-2 gap-y-12 border-y border-blue-100 py-14 lg:grid-cols-4">
          {SITE_CONTENT.whyBuggcy.stats.map((stat, i) => {
            const suffix = stat.value.replace(/\d/g, "");
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="text-center lg:border-r lg:border-blue-100 lg:last:border-r-0"
              >
                <div className="font-display text-5xl font-semibold tracking-tight text-blue-950 sm:text-6xl">
                  <Counter value={stat.value} suffix={suffix} />
                </div>
                <div className="mt-3 text-sm text-blue-950/50">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Reasons as sticky two-col */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* sticky heading */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h3 className="font-display text-3xl font-medium leading-tight text-blue-950 sm:text-4xl">
                A process built on trust, craft & delivery.
              </h3>
              {/* progress line */}
              <div className="relative mt-8 h-px w-full overflow-hidden bg-blue-100">
                <motion.div
                  style={{ width: xLine }}
                  className="absolute left-0 top-0 h-full bg-blue-600"
                />
              </div>
            </div>
          </div>

          {/* reasons */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-px">
              {SITE_CONTENT.whyBuggcy.reasons.map((reason, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                  className="group flex gap-6 border-t border-blue-100 py-8 last:border-b"
                >
                  <span className="font-mono text-sm text-blue-400">{reason.number}</span>
                  <div>
                    <h4 className="font-display text-xl font-medium text-blue-950 sm:text-2xl">
                      {reason.title}
                    </h4>
                    <p className="mt-2 leading-relaxed text-blue-950/55">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
