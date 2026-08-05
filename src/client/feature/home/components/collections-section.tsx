import { collections as mockCollections } from "@/config/data";

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";




export function CollectionsSection({ collections = mockCollections }: { collections?: any[] }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="collections" ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-terracotta text-xs uppercase tracking-[0.25em] mb-4">
              Featured Collections
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal text-balance">
              Explore the craft, by category
            </h2>
          </div>
          <Link
            to={`/shop`}
            className={`inline-flex items-center gap-2 text-sm text-charcoal hover:text-terracotta transition-all duration-700 underline underline-offset-4 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Browse all collections
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.name}
              to={`/collections/${collection.slug}`}
              className={`group relative block overflow-hidden rounded-2xl transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-sand">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  
                  className="object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />

                {/* Count chip */}
                <span className="absolute top-4 left-4 bg-ivory/90 backdrop-blur-sm text-charcoal text-xs px-3 py-1 rounded-full">
                  {collection.count}
                </span>

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl lg:text-3xl text-ivory">
                      {collection.name}
                    </h3>
                    <p className="text-ivory/80 text-sm mt-1 max-w-[16rem] leading-relaxed">
                      {collection.blurb}
                    </p>
                  </div>
                  <span className="w-10 h-10 shrink-0 rounded-full bg-ivory text-charcoal flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
