import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONTENT } from "../data/content";
import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/sections/CTASection";

const categories = [
  "All", "Travel & Tourism", "Grocery & Retail", "Finance",
  "Education", "Healthcare", "E-commerce",
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? SITE_CONTENT.portfolio
      : SITE_CONTENT.portfolio.filter((p) => p.category === activeFilter);

  return (
    <main className="bg-white">
      <PageHero badge="Our Work" title="Selected" accentText="projects" />

      {/* Filters */}
      <section className="sticky top-[72px] z-30 border-y border-blue-100 bg-white/80 backdrop-blur-xl">
        <div className="container-x flex flex-wrap gap-2 py-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-blue-950 text-white"
                  : "text-blue-950/55 hover:bg-blue-50 hover:text-blue-950"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 sm:py-20">
        <div className="container-x">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid gap-x-6 gap-y-12 md:grid-cols-2"
            >
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`group ${i % 3 === 0 ? "md:mt-16" : ""}`}
                >
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] bg-blue-50">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-blue-950 backdrop-blur">
                      0{i + 1}
                    </div>
                    <div className="absolute bottom-5 right-5 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-blue-600 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-medium text-blue-950">{project.title}</h3>
                      <p className="mt-1 text-sm text-blue-950/50">{project.category}</p>
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded-full border border-blue-100 px-3 py-1 text-xs text-blue-700/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
