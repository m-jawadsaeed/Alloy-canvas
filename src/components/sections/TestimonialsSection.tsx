import { SITE_CONTENT } from "../../data/content";
import { Eyebrow, TextReveal } from "../shared/Primitives";
import { Marquee } from "../shared/Marquee";

function QuoteCard({ quote, author, role }: {
  quote: string; author: string; role: string;
}) {
  return (
    <figure className="mx-3 flex w-[78vw] shrink-0 flex-col justify-between rounded-3xl border border-blue-100 bg-white p-8 sm:w-[440px]">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-blue-300">
        <path
          d="M9.5 7C6.5 8 5 10.5 5 14v3h5v-5H7.5c0-2 1-3.5 3-4L9.5 7zm9 0c-3 1-4.5 3.5-4.5 7v3h5v-5h-2.5c0-2 1-3.5 3-4L18.5 7z"
          fill="currentColor"
        />
      </svg>
      <blockquote className="mt-5 text-lg leading-relaxed text-blue-950/75">
        "{quote}"
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {author[0]}
        </span>
        <div>
          <div className="font-semibold text-blue-950">{author}</div>
          <div className="text-sm text-blue-950/50">{role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection() {
  const list = SITE_CONTENT.testimonials;
  return (
    <section className="relative overflow-hidden bg-blue-50/40 py-28 sm:py-40">
      <div className="container-x mb-16 text-center">
        <div className="flex justify-center">
          <Eyebrow className="mb-5">Client Stories</Eyebrow>
        </div>
        <TextReveal
          text="Trusted by businesses worldwide"
          as="h2"
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-blue-950"
        />
      </div>

      {/* top row */}
      <Marquee duration={42}>
        {list.map((t, i) => (
          <QuoteCard key={`a-${i}`} {...t} />
        ))}
      </Marquee>

      {/* bottom row reversed */}
      <div className="mt-6">
        <Marquee duration={48} reverse>
          {[...list].reverse().map((t, i) => (
            <QuoteCard key={`b-${i}`} {...t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
