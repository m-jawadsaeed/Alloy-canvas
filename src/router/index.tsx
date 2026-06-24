import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const Industries = lazy(() => import("../pages/Industries"));
const WhyBuggcy = lazy(() => import("../pages/WhyBuggcy"));
const Portfolio = lazy(() => import("../pages/Portfolio"));
const Blog = lazy(() => import("../pages/Blog"));
const Careers = lazy(() => import("../pages/Careers"));
const Contact = lazy(() => import("../pages/Contact"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
    </div>
  );
}

export function AppRouter() {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/industries" element={<PageTransition><Industries /></PageTransition>} />
          <Route path="/why-buggcy" element={<PageTransition><WhyBuggcy /></PageTransition>} />
          <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><Home /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
