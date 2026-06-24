import { motion } from "framer-motion";
import {
  Globe, Smartphone, Shield, Database, BarChart3, Cloud, Building2, Layers,
} from "lucide-react";
import { SITE_CONTENT } from "../../data/content";
import { Eyebrow, TextReveal } from "../shared/Primitives";

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Globe, Smartphone, Shield, Database, BarChart3, Cloud, Building2, Layers,
};

export function ServicesPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-28 sm:py-40">
      <div className="container-x">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-6 sm:mb-24 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow className="mb-5">What We Do</Eyebrow>
            <TextReveal
              text="Expertise & services"
              as="h2"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-blue-950"
            />
          </div>
          <p className="max-w-sm text-blue-950/55">
            From Big Data to DevOps to a simple app for your phone — our focus areas
            cover a wide range in software and web development. buggcy has you covered.
          </p>
        </div>

        {/* Minimal list — no boxes */}
        <div className="border-t border-blue-100">
          {SITE_CONTENT.services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <motion.a
                href="#work"
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-blue-100 py-7 transition-colors duration-300 sm:gap-10 sm:py-9"
              >
                {/* index */}
                <span className="font-mono text-xs text-blue-400 transition-colors duration-300 group-hover:text-blue-600 sm:text-sm">
                  0{i + 1}
                </span>

                {/* title */}
                <div className="flex items-center gap-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-display text-2xl font-medium text-blue-950 transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
                    {service.title}
                  </h3>
                </div>

                {/* hover description + arrow */}
                <div className="flex items-center gap-6">
                  <p className="hidden max-w-xs text-sm leading-relaxed text-blue-950/50 lg:block">
                    {service.description}
                  </p>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 text-blue-950 transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                {/* slide-in hover bg */}
                <span className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-blue-50/60 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
