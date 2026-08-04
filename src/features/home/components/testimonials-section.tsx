import { testimonials as mockTestimonials } from "@/config/data";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useScrollReveal } from "@/features/home/hooks/use-scroll-reveal";




export function TestimonialsSection({ testimonials = mockTestimonials }: { testimonials?: any[] }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () =>
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const prev = () =>
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section id="testimonials" ref={ref} className="py-20 lg:py-32 bg-secondary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-terracotta text-xs uppercase tracking-[0.25em] mb-4">
            Loved Worldwide
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-charcoal text-balance">
            Stories from our community
          </h2>
        </div>

        {/* Carousel */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative min-h-[340px] sm:min-h-[300px] flex items-center justify-center text-center px-4 lg:px-20">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                  activeIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-copper text-copper" />
                  ))}
                </div>
                <blockquote className="mb-8">
                  <p className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal leading-relaxed max-w-4xl text-balance">
                    {t.quote}
                  </p>
                </blockquote>
                <footer className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-border">
                    <img
                      src={t.avatar || "/placeholder.svg"}
                      alt={t.author}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-charcoal font-medium">{t.author}</p>
                    <p className="text-sm text-muted-foreground">{t.location}</p>
                  </div>
                </footer>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              type="button"
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border bg-ivory flex items-center justify-center hover:border-charcoal transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-terracotta w-6"
                      : "bg-stone hover:bg-muted-foreground w-2"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="w-12 h-12 rounded-full border border-border bg-ivory flex items-center justify-center hover:border-charcoal transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
