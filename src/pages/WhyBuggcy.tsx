import { motion } from "framer-motion";
import { SITE_CONTENT } from "../data/content";
import { PageHero } from "../components/shared/PageHero";
import { Eyebrow } from "../components/shared/Primitives";
import { WhyBuggcySection } from "../components/sections/WhyBuggcySection";
import { CTASection } from "../components/sections/CTASection";

export default function WhyBuggcy() {
  return (
    <main className="bg-white">
      <PageHero
        badge="Why Choose Us"
        title="Why"
        accentText="Buggcy?"
        description="Our connection with clients sets us apart from competitors in addition to our expertise."
      />

      <WhyBuggcySection />

      {/* dark reasons band */}
      <section className="bg-blue-950 py-24 sm:py-32">
        <div className="container-x">
          <Eyebrow dark className="mb-12">
            The Buggcy Advantage
          </Eyebrow>
          <div className="grid gap-x-16 gap-y-0 md:grid-cols-2">
            {SITE_CONTENT.whyBuggcy.reasons.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
                className="group flex items-start gap-5 border-t border-white/10 py-8"
              >
                <span className="font-display text-2xl font-medium blue-text">{reason.number}</span>
                <div>
                  <h3 className="font-display text-xl font-medium text-white sm:text-2xl">{reason.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/50">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
