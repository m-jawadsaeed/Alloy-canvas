import { motion } from "framer-motion";
import {
  Plane, ShoppingCart, TrendingUp, Heart, Store, GraduationCap, Zap, Building,
} from "lucide-react";
import { SITE_CONTENT } from "../data/content";
import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/sections/CTASection";

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Plane, ShoppingCart, TrendingUp, Heart, Store, GraduationCap, Zap, Building,
};

export default function Industries() {
  return (
    <main className="bg-white">
      <PageHero
        badge="Industries"
        title="Every"
        accentText="industry"
        description="Through outsourcing software development, buggcy serves numerous industrial sectors — offering a complete range of innovative web development solutions."
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <div className="grid gap-x-16 gap-y-0 md:grid-cols-2">
            {SITE_CONTENT.industries.map((industry, i) => {
              const Icon = iconMap[industry.icon] || Building;
              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
                  className="group flex items-start gap-6 border-t border-blue-100 py-10 transition-colors duration-300 hover:border-blue-300"
                >
                  <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl font-medium text-blue-950">{industry.title}</h3>
                      <span className="font-mono text-xs text-blue-400">0{i + 1}</span>
                    </div>
                    <p className="mt-3 leading-relaxed text-blue-950/55">{industry.description}</p>
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
