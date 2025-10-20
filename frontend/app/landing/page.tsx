import { HeroSection } from "@/components/hero-section"
import { WhyChooseUs } from "@/components/why-choose-us"
import { InternsSection } from "@/components/interns-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <InternsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  )
}
