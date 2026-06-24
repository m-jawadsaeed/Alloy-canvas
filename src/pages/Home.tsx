import { HeroSection } from "../components/sections/HeroSection";
import { AboutPreview } from "../components/sections/AboutPreview";
import { ServicesPreview } from "../components/sections/ServicesPreview";
import { PortfolioWork } from "../components/sections/PortfolioWork";
import { IndustriesSection } from "../components/sections/IndustriesSection";
import { WhyBuggcySection } from "../components/sections/WhyBuggcySection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { CTASection } from "../components/sections/CTASection";
import { MarqueeBand } from "../components/sections/MarqueeBand";

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <MarqueeBand
        items={[
          "Turning dreams into reality",
          "Custom software",
          "Web & mobile",
          "Built to scale",
        ]}
      />
      <AboutPreview />
      <ServicesPreview />
      <PortfolioWork />
      <IndustriesSection />
      <WhyBuggcySection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
