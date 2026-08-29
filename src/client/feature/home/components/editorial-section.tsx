
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";

export function EditorialSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scale, setScale] = useState(0.85);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startScroll = windowHeight;
      const endScroll = windowHeight / 2;

      if (rect.top <= startScroll && rect.top >= endScroll) {
        const progress = (startScroll - rect.top) / (startScroll - endScroll);
        setScale(0.85 + progress * 0.15);
      } else if (rect.top < endScroll) {
        setScale(1);
      } else {
        setScale(0.85);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="story"
      ref={(node) => {
        if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        sectionRef.current = node;
      }}
      className="relative bg-background"
    >
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `scale(${scale})` }}
        >
          <img
            src="/images/cc-story.png"
            alt="A Nepalese artisan hammering a brass singing bowl in a sunlit workshop"
            
            className="object-cover absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/30" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end px-6 lg:px-12 pb-16 lg:pb-24">
          <div className="max-w-[1400px] mx-auto w-full">
            <p
              className={`text-copper text-xs uppercase tracking-[0.25em] mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Our Story
            </p>

            <h2
              className={`font-display text-3xl sm:text-4xl lg:text-6xl text-ivory mb-6 max-w-3xl text-balance transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Born in the foothills of the Himalayas, kept alive by the people who
              craft here.
            </h2>

            <p
              className={`text-ivory/85 leading-relaxed max-w-2xl mb-8 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Bijeshwori Mala Traders began with a simple promise—to carry the work of
              Nepalese makers to the world without losing what makes it special.
              We partner with family workshops and cooperatives, honoring
              time-worn techniques while helping artisans build sustainable
              livelihoods for the next generation.
            </p>

            <Link
              to="/journal"
              className={`group inline-flex items-center gap-2 bg-ivory text-charcoal pl-6 pr-2 py-2 rounded-full text-sm font-medium hover:bg-terracotta hover:text-ivory transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Read our journal
              <span className="w-9 h-9 bg-charcoal text-ivory rounded-full flex items-center justify-center group-hover:bg-ivory group-hover:text-terracotta transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
