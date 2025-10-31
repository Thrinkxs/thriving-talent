import { Footer } from "@/components/Footer/Footer";
import NavBar from "@/components/Navbar/NavBar";
import { CTASection } from "@/components/Section/CTASection/CTASection";
import { HeroSection } from "@/components/Section/HeroSection/HeroSection";
import { InternsSection } from "@/components/Section/InternSection/InternSection";
import { WhyChooseUs } from "@/components/Section/WhyChooseUs/WhyChooseUs";
import { TestimonialsSection } from "@/components/Testimonials/Testimonials";

export default function HomePage() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <WhyChooseUs />
      <InternsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
