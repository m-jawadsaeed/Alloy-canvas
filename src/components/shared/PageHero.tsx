import { motion } from "framer-motion";
import { LightBackground } from "../animations/Background";

interface PageHeroProps {
  badge: string;
  title: string;
  accentText?: string;
  afterAccent?: string;
  description?: string;
}

export function PageHero({ badge, title, accentText, afterAccent, description }: PageHeroProps) {
  const line = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: 0,
      transition: { duration: 1, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-white pb-16 pt-32 sm:min-h-[80vh] sm:pb-24">
      <LightBackground variant="centered" />

      <div className="container-x relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-blue-400/60" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-blue-700/80">
            {badge}
          </span>
        </motion.div>

        <h1 className="display-xl text-blue-950 text-[clamp(2.5rem,11vw,8rem)]">
          <span className="block overflow-hidden">
            <motion.span custom={0} variants={line} initial="hidden" animate="visible" className="inline-block">
              {title}
            </motion.span>
          </span>
          {accentText && (
            <span className="block overflow-hidden">
              <motion.span custom={1} variants={line} initial="hidden" animate="visible" className="inline-block">
                <span className="blue-text italic">{accentText}</span>
                {afterAccent}
              </motion.span>
            </span>
          )}
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-blue-950/55"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
