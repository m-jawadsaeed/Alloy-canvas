import { motion } from "framer-motion";
import { Magnetic } from "../shared/Magnetic";
import { SITE_CONTENT } from "../../data/content";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-blue-950 py-32 sm:py-48">
      {/* ambient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(47,107,255,0.45) 0%, transparent 60%)", filter: "blur(60px)" }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="noise-overlay opacity-[0.04]" />
      </div>

      <div className="container-x relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-blue-200/70">
            Let's build together
          </span>
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mx-auto max-w-4xl font-display text-4xl font-medium leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Have an idea? Let's turn it into{" "}
          <span className="blue-text italic">reality.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-8 max-w-xl text-lg text-white/55"
        >
          We'd love to hear about your project. Let's talk about how we can help turn
          your digital dreams into reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.4}>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-blue-950 transition-all duration-300 hover:bg-blue-100 hover:shadow-xl hover:shadow-blue-900/30"
            >
              Let's Talk
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${SITE_CONTENT.contact.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              {SITE_CONTENT.contact.email}
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
