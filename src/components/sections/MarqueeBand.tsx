import { Marquee } from "../shared/Marquee";

/**
 * Big editorial marquee band — Dennis Snellenberg style text ticker.
 */
export function MarqueeBand({
  items,
  dark = false,
  className = "",
}: {
  items: string[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden border-y py-6 sm:py-8 ${
        dark
          ? "border-white/10 bg-blue-950"
          : "border-blue-100 bg-white"
      } ${className}`}
    >
      <Marquee duration={30}>
        {items.map((item, i) => (
          <span
            key={i}
            className="mx-8 flex items-center gap-8 font-display text-4xl font-medium tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className={dark ? "text-white/90" : "text-blue-950"}>{item}</span>
            <span className={dark ? "text-blue-400" : "text-blue-300"}>✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
