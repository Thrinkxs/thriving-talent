import { CTASection } from "./cta-section";
import { Footer } from "./footer";
import { HeroSection } from "./hero-section";
import { InternsSection } from "./interns-section";
import { TestimonialsSection } from "./testimonials-section";
import { WhyChooseUs } from "./why-choose-us";

export default function HomePageOverview() {
  return (
    <div>
      <HeroSection />
      <WhyChooseUs />
      <InternsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
