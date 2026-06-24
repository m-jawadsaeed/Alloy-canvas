import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { LightBackground } from "../animations/Background";
import { Magnetic } from "../shared/Magnetic";
import { SITE_CONTENT } from "../../data/content";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const line = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: 0,
      transition: { duration: 1, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-white">
      <LightBackground variant="centered" />

      <motion.div
        style={{ y: smoothY, opacity }}
        className="container-x relative z-10 pt-28 pb-16"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
          </span>
          <span className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.3em] text-blue-700/80">
            Custom Software Development · est. {SITE_CONTENT.company.founded}
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="display-xl text-center text-blue-950 text-[clamp(2.5rem,10.5vw,9.5rem)]">
          <span className="block overflow-hidden">
            <motion.span custom={0} variants={line} initial="hidden" animate="visible" className="inline-block">
              Turning your
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span custom={1} variants={line} initial="hidden" animate="visible" className="inline-block">
              digital <span className="blue-text italic">dreams</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span custom={2} variants={line} initial="hidden" animate="visible" className="inline-block">
              into reality.
            </motion.span>
          </span>
        </h1>

        {/* Intro + CTA */}
        <div className="mt-12 flex flex-col items-center gap-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="max-w-xl text-center text-base sm:text-lg leading-relaxed text-blue-950/55"
          >
            We design and develop custom software solutions for businesses of all
            types — committed to delivering innovative, high-quality products that
            meet our clients' unique needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Magnetic strength={0.4}>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40"
              >
                Let's Talk
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.4}>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 px-8 py-4 text-sm font-semibold text-blue-950 transition-all duration-300 hover:border-blue-600 hover:bg-blue-50"
              >
                View Our Work
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-blue-700/50">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-[1px] bg-gradient-to-b from-blue-500 to-transparent"
        />
      </motion.div> */}
    </section>
  );
}
