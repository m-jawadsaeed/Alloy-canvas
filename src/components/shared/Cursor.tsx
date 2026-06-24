import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Custom blended cursor — a small dot + outline ring that
 * scales up on interactive elements. Desktop only.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor='hover'], input, textarea, select")
      );
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <AnimatePresence>
      {enabled && (
        <>
          {/* Outline ring */}
          <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
            animate={{
              x: pos.x - (hovering ? 24 : 16),
              y: pos.y - (hovering ? 24 : 16),
              width: hovering ? 48 : 32,
              height: hovering ? 48 : 32,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.4 }}
          >
            <div className="w-full h-full rounded-full border border-white/70" />
          </motion.div>
          {/* Center dot */}
          <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
            animate={{ x: pos.x - 3, y: pos.y - 3 }}
            transition={{ type: "spring", stiffness: 700, damping: 35 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
