import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 origin-left z-[100]"
      style={{ scaleX, background: "linear-gradient(90deg, #2f6bff, #1d4ed8)" }}
      data-cursor="default"
    />
  );
}
