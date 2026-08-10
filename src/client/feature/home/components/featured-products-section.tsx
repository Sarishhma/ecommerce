import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { ShopPage } from "@/client/pages/ShopPage";

export function FeaturedProductsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="shop" ref={ref} className="py-12 lg:py-20 bg-secondary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <div
          className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-terracotta text-xs uppercase tracking-[0.25em] mb-4">
            Featured Products
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal text-balance">
            Handmade favorites, ready to gift
          </h2>
        </div>

        {/* 
          Targeting ShopPage wrapper without changing ShopPage.tsx itself:
          - [&>div]:!pt-4 overrides ShopPage's pt-28/lg:pt-36 top padding
          - [&>div]:!px-0 removes duplicate horizontal padding inside this section
        */}
        <div className="[&>div]:!pt-4 [&>div]:!px-0">
          <ShopPage />
        </div>
      </div>
    </section>
  );
}