import { FeaturedProductsSection } from "../feature/home/components/featured-products-section";
import { HeroSection } from "../feature/home/components/hero-section";
import { LifestyleGallerySection } from "../feature/home/components/lifestyle-gallery-section";
import { MarqueeSection } from "../feature/home/components/marquee-section";
import { TestimonialsSection } from "../feature/home/components/testimonials-section";
import { WholesaleSection } from "../feature/home/components/wholesale-section";

export const HomePage = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <MarqueeSection />

      <FeaturedProductsSection />
    
      <LifestyleGallerySection />
      <TestimonialsSection />
      <WholesaleSection />
    </div>
  );
};
