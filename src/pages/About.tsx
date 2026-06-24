import { motion } from "framer-motion";
import { SITE_CONTENT } from "../data/content";
import { PageHero } from "../components/shared/PageHero";
import { Reveal, Eyebrow } from "../components/shared/Primitives";
import { CTASection } from "../components/sections/CTASection";

export default function About() {
  return (
    <main className="bg-white">
      <PageHero
        badge="About Us"
        title="We are"
        accentText="Buggcy"
        description="As a cutting-edge software development business, we specialise in creating effective digital products and experiences."
      />

      {/* Story */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="mb-6">Our Story</Eyebrow>
              <h2 className="font-display text-3xl font-medium leading-tight text-blue-950 sm:text-4xl">
                Collaboration defines our strategy.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-blue-950/60">{SITE_CONTENT.about.description}</p>
              <p className="mt-6 leading-relaxed text-blue-950/45">{SITE_CONTENT.about.description2}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats strip on dark */}
      <section className="bg-blue-950 py-20">
        <div className="container-x grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {SITE_CONTENT.hero.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl font-semibold blue-text sm:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-x">
          <Reveal className="mb-16">
            <Eyebrow className="mb-5">Core Values</Eyebrow>
            <h2 className="font-display text-4xl font-medium tracking-tight text-blue-950 sm:text-5xl">
              What we stand for
            </h2>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-blue-100 bg-blue-100 sm:grid-cols-2 lg:grid-cols-4">
            {SITE_CONTENT.about.values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                className="group bg-white p-8 transition-colors duration-300 hover:bg-blue-50/60"
              >
                <span className="font-mono text-sm text-blue-400">0{i + 1}</span>
                <h3 className="mt-6 font-display text-xl font-medium text-blue-950">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-blue-950/55">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
