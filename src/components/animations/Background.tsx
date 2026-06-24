import { motion } from "framer-motion";

/**
 * Subtle blue ambient background for light sections.
 * Aurora blobs + faint grid + noise — non-boxy, atmospheric.
 */
export function LightBackground({ variant = "default" }: { variant?: "default" | "centered" | "bottom" }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* faint grid */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* aurora blobs */}
      {variant === "centered" && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] max-w-[1400px] aspect-square rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(47,107,255,0.14) 0%, rgba(47,107,255,0.05) 35%, transparent 65%)",
            filter: "blur(20px)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {variant === "bottom" && (
        <div
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[120vw] max-w-[1600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(47,107,255,0.16) 0%, rgba(47,107,255,0.04) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      )}

      {variant === "default" && (
        <>
          <motion.div
            className="absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(47,107,255,0.16) 0%, transparent 65%)",
              filter: "blur(30px)",
            }}
            animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(91,141,255,0.13) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
            animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}

      <div className="noise-overlay" />
    </div>
  );
}

/** Deep navy section background with subtle blue glow */
export function DarkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(47,107,255,0.30) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="noise-overlay" />
    </div>
  );
}
