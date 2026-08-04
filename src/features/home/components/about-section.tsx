import { stats as mockStats } from "@/config/data";

import { useScrollReveal } from "@/features/home/hooks/use-scroll-reveal";

// const stats = [
  

export function AboutSection({ stats = mockStats }: { stats?: any[] }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="about" ref={ref} className="py-20 lg:py-32 bg-secondary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`order-2 lg:order-1 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="aspect-[4/5] relative overflow-hidden rounded-3xl">
              <img
                src="/images/cc-gallery-2.png"
                alt="Nepalese artisan weaving wool on a traditional loom"
                
                className="object-cover absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div
            className={`order-1 lg:order-2 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-terracotta text-xs uppercase tracking-[0.25em] mb-4">
              Empowering Makers
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal text-balance mb-6">
              Every purchase supports a livelihood
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you choose Crystal Clan, you invest directly in the hands that
              made your piece. Fair wages, safe workshops and long-term
              relationships mean artisans can keep practicing—and teaching—crafts
              that might otherwise be lost.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              We reinvest a portion of every sale into training, tools and the
              communities we work alongside, so heritage and opportunity grow
              together.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <p className="font-display text-4xl text-terracotta">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
