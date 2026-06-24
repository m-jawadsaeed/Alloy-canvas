import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Clock } from "lucide-react";
import { SITE_CONTENT } from "../data/content";
import { PageHero } from "../components/shared/PageHero";
import { CTASection } from "../components/sections/CTASection";

const categories = ["All", "Technology", "Business", "Security", "DevOps", "Analytics", "Design"];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = SITE_CONTENT.blog.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-white">
      <PageHero badge="Blog" title="Insights &" accentText="stories" />

      {/* Search + filters */}
      <section className="border-b border-blue-100 py-10">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-blue-100 bg-blue-50/40 py-3 pl-11 pr-4 text-sm text-blue-950 placeholder:text-blue-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-blue-950 text-white"
                      : "border border-blue-100 text-blue-950/55 hover:border-blue-400 hover:text-blue-950"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-blue-950/40">No articles found matching your search.</p>
          ) : (
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                  className="group cursor-pointer"
                >
                  {/* visual */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 to-blue-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-6xl font-medium text-blue-300/50">
                        {post.category[0]}
                      </span>
                    </div>
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-blue-700 backdrop-blur">
                      {post.category}
                    </div>
                  </div>
                  <h2 className="mt-5 font-display text-xl font-medium leading-snug text-blue-950 transition-colors duration-300 group-hover:text-blue-600">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-blue-950/55">{post.excerpt}</p>
                  <div className="mt-5 flex items-center gap-3 text-xs text-blue-950/40">
                    <span>{post.date}</span>
                    <span className="h-1 w-1 rounded-full bg-blue-300" />
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
