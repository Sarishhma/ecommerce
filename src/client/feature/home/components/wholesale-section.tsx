import { wholesalePartners as mockPartners, wholesaleBenefits as mockBenefits } from "@/config/data";

import { Check } from "lucide-react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";

// const partners = ["Boutiques", "Hotels & Resorts", "Spas & Studios", "Gift Shops", "Interior Designers", "Concept Stores"];

// const benefits = [
  

export function WholesaleSection({ partners = mockPartners, benefits = mockBenefits }: { partners?: string[], benefits?: string[] }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="wholesale" ref={ref} className="py-20 lg:py-32 bg-charcoal">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-copper text-xs uppercase tracking-[0.25em] mb-4">
              Wholesale Partnerships
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ivory text-balance mb-6">
              Bring handmade Nepal to your shelves
            </h2>
            <p className="text-ivory/70 leading-relaxed mb-8">
              We partner with retailers and hospitality brands around the world to
              share authentic, ethically made craft with their customers. Curated
              assortments, dependable supply, and a story worth telling.
            </p>

            {/* Partner types */}
            <div className="flex flex-wrap gap-2 mb-8">
              {partners.map((partner) => (
                <span
                  key={partner}
                  className="text-sm text-ivory/80 border border-ivory/20 rounded-full px-4 py-1.5"
                >
                  {partner}
                </span>
              ))}
            </div>

            {/* Benefits */}
            <ul className="space-y-3 mb-10">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-ivory/85">
                  <span className="w-5 h-5 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-copper" />
                  </span>
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="bg-ivory text-charcoal px-8 py-4 rounded-full text-sm font-medium hover:bg-terracotta hover:text-ivory transition-colors"
            >
              Become a Partner
            </button>
          </div>

          {/* Image */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="aspect-[4/5] relative overflow-hidden rounded-3xl">
              <img
                src="/images/cc-wholesale.png"
                alt="A curated boutique retail display of Nepalese handcrafted goods"
                
                className="object-cover absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
