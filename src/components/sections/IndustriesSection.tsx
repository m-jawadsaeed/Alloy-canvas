import { motion } from "framer-motion";
import {
  Plane, ShoppingCart, TrendingUp, Heart, Store, GraduationCap, Zap, Building,
} from "lucide-react";
import { SITE_CONTENT } from "../../data/content";
import { Eyebrow, TextReveal } from "../shared/Primitives";

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Plane, ShoppingCart, TrendingUp, Heart, Store, GraduationCap, Zap, Building,
};

export function IndustriesSection() {
  return (
    <section className="relative overflow-hidden bg-blue-950 py-28 sm:py-40">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -bottom-40 left-1/2 h-[600px] w-[1200px] -translate-x-1/2 rounded-full opacity-40"
          style={{ background: "radial-gradient(ellipse, rgba(47,107,255,0.4) 0%, transparent 60%)", filter: "blur(70px)" }}
        />
        <div className="noise-overlay opacity-[0.04]" />
      </div>

      <div className="container-x relative z-10">
        {/* Header */}
        <div className="mb-16 max-w-3xl sm:mb-24">
          <Eyebrow dark className="mb-5">Industries We Serve</Eyebrow>
          <TextReveal
            text="Built for every industry"
            as="h2"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white"
          />
          <p className="mt-6 text-lg text-white/55">
            Through outsourcing software development, buggcy serves numerous industrial
            sectors — offering a complete range of innovative web development solutions.
          </p>
        </div>

        {/* Clean 2-col list grid — no boxes */}
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
                className="group flex items-start gap-5 border-t border-white/10 py-8 transition-colors duration-300 hover:border-white/30"
              >
                <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-blue-200 transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white">
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl font-medium text-white transition-colors duration-300 group-hover:text-blue-200 sm:text-2xl">
                      {industry.title}
                    </h3>
                    <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/45">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
