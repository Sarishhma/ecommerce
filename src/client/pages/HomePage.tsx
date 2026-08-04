import { HeroSection } from "@/features/home/components/hero-section";
import { MarqueeSection } from "@/features/home/components/marquee-section";
import { CollectionsSection } from "@/features/home/components/collections-section";
import { FeaturedProductsSection } from "@/features/home/components/featured-products-section";
import { ScrollytellingSection } from "@/features/home/components/scrollytelling-section";
import { EditorialSection } from "@/features/home/components/editorial-section";
import { AboutSection } from "@/features/home/components/about-section";

import { LifestyleGallerySection } from "@/features/home/components/lifestyle-gallery-section";
import { TestimonialsSection } from "@/features/home/components/testimonials-section";
import { WholesaleSection } from "@/features/home/components/wholesale-section";
import { BlogSection } from "@/features/home/components/blog-section";
import { NewsletterSection } from "@/features/home/components/newsletter-section";

export const HomePage = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <MarqueeSection />
      {/* <CollectionsSection /> */}
      <FeaturedProductsSection />
      <ScrollytellingSection />
      <EditorialSection />
      <AboutSection />
      <LifestyleGallerySection />
      <TestimonialsSection />
      <WholesaleSection />
      <BlogSection />
      <NewsletterSection />
    </div>
  );
};
