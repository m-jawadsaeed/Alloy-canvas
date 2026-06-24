import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Magnetic } from "./Magnetic";

/* ---------- Section label (small eyebrow) ---------- */
export function Eyebrow({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em]",
        dark ? "text-blue-200/70" : "text-blue-700/70",
        className
      )}
    >
      <span className={cn("h-px w-6", dark ? "bg-blue-300/40" : "bg-blue-400/50")} />
      {children}
    </span>
  );
}

/* ---------- Reveal wrapper ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Text line reveal (word mask) ---------- */
export function TextReveal({
  text,
  className,
  delay = 0,
  as = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");
  const Tag = motion[as];
  return (
    <Tag
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i} className="reveal-mask mr-[0.22em] mb-[0.05em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------- Button ---------- */
type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline" | "light";
  className?: string;
  type?: "button" | "submit";
};

export function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30",
    light: "bg-white text-blue-900 hover:bg-blue-50 hover:shadow-xl hover:shadow-blue-900/20",
    outline:
      "border border-blue-200 text-blue-900 hover:border-blue-600 hover:bg-blue-50",
    ghost: "text-blue-900 hover:bg-blue-50",
  };

  const inner = (
    <Magnetic strength={0.3}>
      <span className={cn(base, variants[variant], className)}>{children}</span>
    </Magnetic>
  );

  if (to) {
    return (
      <a onClick={onClick} className="inline-block">
        {inner}
      </a>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className="inline-block">
      {inner}
    </button>
  );
}

/* ---------- Big link arrow ---------- */
export function ArrowLink({
  children,
  href = "#",
  dark = false,
}: {
  children: ReactNode;
  href?: string;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-lg font-medium transition-colors",
        dark ? "text-white hover:text-blue-300" : "text-blue-900 hover:text-blue-600"
      )}
    >
      <span className="link-underline">{children}</span>
      <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-current/30">
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-5 group-hover:-translate-y-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg
          className="absolute h-4 w-4 -translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
