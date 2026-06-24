import { motion } from "framer-motion";
import {
  Globe, Smartphone, Shield, Database, BarChart3, Cloud, Building2, Layers,
} from "lucide-react";
import { SITE_CONTENT } from "../data/content";
import { PageHero } from "../components/shared/PageHero";
import { Eyebrow } from "../components/shared/Primitives";
import { CTASection } from "../components/sections/CTASection";
import { Marquee } from "../components/shared/Marquee";

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Globe, Smartphone, Shield, Database, BarChart3, Cloud, Building2, Layers,
};

export default function Services() {
  return (
    <main className="bg-white">
      <PageHero
        badge="What We Do"
        title="Our"
        accentText="Services"
        description="Our focus areas cover a wide range in software and web development. From Big Data to DevOps to a simple app for your phone — buggcy has you covered!"
      />

      <section className="py-12">
        <Marquee duration={36}>
          {["Custom Software", "Web Development", "Mobile Apps", "IoT & Security", "Big Data", "DevOps", "Cloud", "UI/UX Design"].map((s) => (
            <span key={s} className="mx-6 flex items-center gap-6 text-4xl font-medium text-blue-950/12 sm:text-6xl">
              {s}
              <span className="text-blue-300">✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* big list */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <Eyebrow className="mb-10">All Capabilities</Eyebrow>
          <div className="border-t border-blue-100">
            {SITE_CONTENT.services.map((service, i) => {
              const Icon = iconMap[service.icon] || Globe;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.7, delay: (i % 3) * 0.06 }}
                  className="group grid grid-cols-1 gap-6 border-b border-blue-100 py-10 transition-colors duration-300 hover:bg-blue-50/40 sm:grid-cols-[auto_1fr] sm:gap-10"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-mono text-sm text-blue-400">0{i + 1}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={20} />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-blue-950 sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-blue-950/55">
                      {service.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-blue-100 px-3 py-1 text-xs text-blue-700/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
