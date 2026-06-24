import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../../lib/utils";
import { SITE_CONTENT } from "../../data/content";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="buggcy home">
      <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition-transform duration-300 group-hover:scale-105">
        <span className="font-display text-lg font-bold">b</span>
        <span className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </span>
      <span
        className={cn(
          "font-display text-2xl font-semibold tracking-tight transition-colors",
          dark ? "text-white" : "text-blue-950"
        )}
      >
        buggcy
      </span>
    </Link>
  );
}

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 30);
    if (latest > prev && latest > 240 && !menuOpen) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const mainLinks = SITE_CONTENT.nav.links.filter((l) => l.label !== "Home");

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-blue-100/60"
            : "bg-transparent"
        )}
        animate={{ y: hidden && !menuOpen ? "-120%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          <Logo />

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainLinks.slice(0, 5).map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                    active ? "text-blue-600" : "text-blue-950/60 hover:text-blue-950"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-blue-950 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Let's Talk
              <span className="text-blue-300 transition-colors group-hover:text-white">↗</span>
            </Link>

            {/* Menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-blue-200 bg-white/60 backdrop-blur transition-colors hover:border-blue-500"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-5 bg-blue-950"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-[1.5px] w-5 bg-blue-950"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-5 bg-blue-950"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-blue-950 text-white"
          >
            <div className="noise-overlay opacity-[0.04]" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(circle at 80% 20%, rgba(47,107,255,0.35) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(91,141,255,0.2) 0%, transparent 50%)",
              }}
            />
            <div className="container-x relative flex h-full flex-col pt-28 pb-12">
              <div className="flex flex-1 flex-col justify-center gap-1">
                {mainLinks.map((link, i) => {
                  const active = location.pathname === link.href;
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-baseline gap-4 py-2"
                      >
                        <span className="font-mono text-xs text-blue-300/60">
                          0{i + 1}
                        </span>
                        <span
                          className={cn(
                            "font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight transition-colors duration-300 group-hover:text-blue-300",
                            active ? "text-blue-300" : "text-white"
                          )}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-start justify-between gap-6 border-t border-white/10 pt-8"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-blue-300/60 mb-2">
                    Get in touch
                  </p>
                  <a href={`mailto:${SITE_CONTENT.contact.email}`} className="text-lg text-white/90 hover:text-blue-300">
                    {SITE_CONTENT.contact.email}
                  </a>
                </div>
                <p className="text-sm text-white/40 sm:text-right">
                  {SITE_CONTENT.company.location}
                  <br />
                  Founded {SITE_CONTENT.company.founded}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
