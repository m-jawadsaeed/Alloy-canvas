import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE_CONTENT } from "../../data/content";
import { Eyebrow, TextReveal, ArrowLink } from "../shared/Primitives";

export function PortfolioWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const panels = SITE_CONTENT.portfolio;

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewport = window.innerWidth;
      setDistance(Math.max(0, trackWidth - viewport));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // section height scales with how far we need to scroll horizontally
  const sectionHeight = `${Math.max(panels.length, 3) * 55}vh`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    // re-measure once images/fonts settle
    const t = setTimeout(() => {
      if (trackRef.current) {
        setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="container-x mb-8 flex items-end justify-between">
          <div>
            <Eyebrow className="mb-4">Selected Work</Eyebrow>
            <TextReveal
              text="Recent projects"
              as="h2"
              className="font-display text-4xl font-medium tracking-tight text-blue-950 sm:text-5xl lg:text-6xl"
            />
          </div>
          <div className="hidden sm:block">
            <ArrowLink href="/portfolio">All projects</ArrowLink>
          </div>
        </div>

        {/* Horizontal track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 pl-[max(1.5rem,calc((100vw-1500px)/2+1.5rem))] sm:pl-[max(2.5rem,calc((100vw-1500px)/2+2.5rem))] pr-6"
        >
          {panels.map((project, i) => (
            <article
              key={project.id}
              className="group relative w-[80vw] shrink-0 sm:w-[58vw] lg:w-[40vw]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-blue-50">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-blue-950 backdrop-blur">
                  0{i + 1}
                </div>
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-medium text-blue-950">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-blue-950/50">{project.category}</p>
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs text-blue-700/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        {/* progress bar */}
        <div className="container-x mt-10">
          <div className="relative h-px w-full overflow-hidden bg-blue-100">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute left-0 top-0 h-full w-full origin-left bg-blue-600"
            />
          </div>
        </div>

        {/* mobile CTA */}
        <div className="container-x mt-6 sm:hidden">
          <ArrowLink href="/portfolio">All projects</ArrowLink>
        </div>
      </div>
    </section>
  );
}
