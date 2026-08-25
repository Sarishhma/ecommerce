import { galleryImages as mockImages } from "@/config/data";
import { useScrollReveal } from "../hooks/use-scroll-reveal";


// const images = [
  

export function LifestyleGallerySection({ images = mockImages }: { images?: any[] }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="lifestyle" ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left content block */}
          <div
            className={`lg:w-1/3 bg-forest text-ivory rounded-3xl p-10 lg:p-12 flex flex-col justify-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <p className="text-ivory/70 text-xs uppercase tracking-[0.25em] mb-6">
              #Bijeshwori mala Traders
            </p>
            <h2 className="font-display text-4xl lg:text-5xl leading-tight text-balance">
              Craft that lives with you
            </h2>
            <p className="text-ivory/80 leading-relaxed mt-6 mb-8">
              From quiet mornings to gatherings with friends, our pieces are made
              to be used, loved, and passed on. Share how you style yours.
            </p>
            <button
              type="button"
              className="self-start border border-ivory/40 px-6 py-3 rounded-full text-sm hover:bg-ivory hover:text-forest transition-all duration-300"
            >
              Explore the Lookbook
            </button>
          </div>

          {/* Images grid */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {images.map((image, index) => (
              <div
                key={image.caption}
                className={`relative overflow-hidden rounded-2xl bg-sand group transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${(index + 1) * 150}ms`,
                  aspectRatio: "3/4",
                }}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display text-ivory text-2xl md:text-3xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {image.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
