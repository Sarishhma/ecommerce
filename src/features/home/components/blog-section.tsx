import { blogArticles as mockArticles } from "@/config/data";

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/features/home/hooks/use-scroll-reveal";




export function BlogSection({ articles = mockArticles }: { articles?: any[] }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="journal" ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-terracotta text-xs uppercase tracking-[0.25em] mb-4">
              Journal & Inspiration
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal text-balance">
              Stories from the workshop
            </h2>
          </div>
          <Link
            to="/journal"
            className={`inline-flex items-center gap-2 text-sm text-charcoal hover:text-terracotta transition-all duration-700 underline underline-offset-4 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Read the journal
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Link
              key={article.title}
              to="/journal"
              className={`group transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${150 + index * 120}ms` }}
            >
              <div className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-sand mb-5">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  
                  className="object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-ivory/90 backdrop-blur-sm text-charcoal text-xs px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                {article.readTime}
              </p>
              <h3 className="font-display text-2xl text-charcoal group-hover:text-terracotta transition-colors text-balance">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
