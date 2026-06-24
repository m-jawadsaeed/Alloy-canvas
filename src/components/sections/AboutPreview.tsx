import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE_CONTENT } from "../../data/content";
import { Eyebrow, ArrowLink } from "../shared/Primitives";

export function AboutPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const statement =
    "As a cutting-edge software development business, we specialise in creating effective digital products and experiences.";
  const words = statement.split(" ");

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-blue-950 py-28 sm:py-40">
      {/* dark bg */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-full opacity-50"
          style={{ background: "radial-gradient(ellipse, rgba(47,107,255,0.35) 0%, transparent 65%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="noise-overlay opacity-[0.04]" />
      </div>

      <div className="container-x relative z-10">
        <Eyebrow dark className="mb-10">
          About Buggcy
        </Eyebrow>

        {/* Big statement with word reveal */}
        <motion.h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.12] tracking-tight text-white max-w-5xl">
          {words.map((word, i) => (
            <span key={i} className="reveal-mask mr-[0.25em] inline-block align-bottom">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0.12 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-15%" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                {/cutting-edge|effective|digital/i.test(word) ? (
                  <span className="blue-text italic">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        {/* Two columns: stats + paragraph */}
        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div style={{ y }} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-white/60">
              Our connection with clients sets us apart from competitors in addition
              to our expertise. Collaboration across departmental lines and ongoing
              development define our strategy.
            </p>
            <p className="mt-6 leading-relaxed text-white/45">
              Because we care about our customers, they not only get a team of highly
              skilled developers, but also the assistance and advice of accomplished
              engineers and business experts.
            </p>
            <div className="mt-8">
              <ArrowLink href="/about" dark>
                More about us
              </ArrowLink>
            </div>
          </motion.div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              {SITE_CONTENT.hero.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="bg-blue-950 p-7"
                >
                  <div className="font-display text-4xl font-semibold blue-text">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
