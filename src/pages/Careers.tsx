import { motion } from "framer-motion";
import { Briefcase, MapPin, Check } from "lucide-react";
import { SITE_CONTENT } from "../data/content";
import { PageHero } from "../components/shared/PageHero";
import { Eyebrow, ArrowLink } from "../components/shared/Primitives";
import { CTASection } from "../components/sections/CTASection";

export default function Careers() {
  return (
    <main className="bg-white">
      <PageHero
        badge="Careers"
        title="Build the"
        accentText="future"
        description="Be part of a cutting-edge software development company that's turning digital dreams into reality."
      />

      {/* Culture */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-6">Our Culture</Eyebrow>
            <h2 className="font-display text-3xl font-medium leading-tight text-blue-950 sm:text-4xl">
              More than a workplace.
            </h2>
            <p className="mt-6 leading-relaxed text-blue-950/60">{SITE_CONTENT.careers.culture}</p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-3xl border border-blue-100 bg-blue-50/40 p-8 sm:p-10">
              <h3 className="font-display text-xl font-medium text-blue-950">Benefits</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {SITE_CONTENT.careers.benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="flex items-center gap-3 text-blue-950/70"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check size={12} />
                    </span>
                    {benefit}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="bg-blue-950 py-24 sm:py-32">
        <div className="container-x">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <Eyebrow dark className="mb-4">Open Positions</Eyebrow>
              <h2 className="font-display text-4xl font-medium tracking-tight text-white sm:text-5xl">
                Join the team
              </h2>
            </div>
          </div>

          <div className="border-t border-white/10">
            {SITE_CONTENT.careers.openRoles.map((role, i) => (
              <motion.a
                href="#"
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
                className="group grid grid-cols-1 items-center gap-4 border-b border-white/10 py-7 transition-colors duration-300 hover:bg-white/5 sm:grid-cols-[1fr_auto]"
              >
                <div className="flex items-center gap-5">
                  <span className="font-mono text-sm text-blue-300/60">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl font-medium text-white sm:text-2xl">{role.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/50">
                      <span className="flex items-center gap-1.5"><Briefcase size={13} /> {role.type}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={13} /> {role.location}</span>
                      <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-blue-200">{role.department}</span>
                    </div>
                  </div>
                </div>
                <span className="justify-self-start rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 group-hover:border-blue-400 group-hover:bg-blue-500 sm:justify-self-end">
                  Apply Now ↗
                </span>
              </motion.a>
            ))}
          </div>

          <div className="mt-12">
            <ArrowLink href="/contact" dark>
              Don't see your role? Reach out
            </ArrowLink>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
