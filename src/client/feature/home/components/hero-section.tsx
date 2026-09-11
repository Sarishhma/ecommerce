import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 500, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Subtle scroll animation
  const imageScale = 1 + scrollProgress * 0.06;
  const imageTranslateY = scrollProgress * -20;
  const contentTranslateY = scrollProgress * -15;
  const contentOpacity = 1 - scrollProgress * 0.35;

  return (
<section className="relative min-h-[100svh] bg-[#1a1a1a] -mt-24 sm:-mt-28">
<div className="relative h-[100svh] overflow-hidden">        
        {/* Hero Image */}
        <img
          src="/images/cc-hero.png"
          alt="Handcrafted Nepalese artisan goods including a brass singing bowl, felt objects and beaded jewelry on warm linen"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `
              scale(${imageScale})
              translateY(${imageTranslateY}px)
            `,
            transition:
              "opacity 1000ms ease-out, transform 100ms linear",
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/40 to-[#1a1a1a]/10" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/60 via-transparent to-transparent" />

        {/* Content */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12"
          style={{
            transform: `translateY(${contentTranslateY}px)`,
            opacity: contentOpacity,
          }}
        >
          <div className="max-w-4xl">

            <h1
              className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="font-light">Timeless craft,</span>
              <br />

              <span className="italic text-amber-100/70 font-light">
                carried by hand
              </span>

              <br />

              <span className="font-light">
                across the Himalayas.
              </span>
            </h1>

            <p
              className={`mt-4 text-white/50 text-sm sm:text-base max-w-xl leading-relaxed font-light transition-all duration-700 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Every piece is shaped by the hands of Nepalese artisans—
              honoring traditions passed through generations and the
              communities that keep them alive.
            </p>

            <div
              className={`mt-6 flex flex-wrap items-center gap-3 transition-all duration-700 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2 rounded-full text-xs uppercase tracking-wider font-light hover:bg-white/20 transition-all duration-300 border border-white/10"
              >
                Shop the Collection

                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
