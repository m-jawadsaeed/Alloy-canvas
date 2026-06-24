import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { AppRouter } from "./router";
import { ScrollProgress } from "./components/shared/ScrollProgress";
import { Cursor } from "./components/shared/Cursor";

function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

/** Scroll to top smoothly whenever the route changes */
function ScrollToTopOnRouteChange() {
  useEffect(() => {
    const onPop = () => window.scrollTo({ top: 0 });
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <ScrollToTopOnRouteChange />
        <ScrollProgress />
        <Cursor />
        <div className="min-h-screen bg-white font-body text-blue-950 antialiased">
          <Navbar />
          <AppRouter />
          <Footer />
        </div>
      </LenisProvider>
    </BrowserRouter>
  );
}
