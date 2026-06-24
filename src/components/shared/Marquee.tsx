import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Infinite horizontal marquee band — Dennis Snellenberg style.
 */
export function Marquee({
  children,
  duration = 32,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex overflow-hidden ${className}`}>
      <motion.div
        className="flex shrink-0"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
