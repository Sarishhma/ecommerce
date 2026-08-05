import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { blogArticles } from '@/config/data';
import { useScrollReveal } from '../feature/home/hooks/use-scroll-reveal';

export const JournalPage = () => {
  const headerReveal = useScrollReveal();
  const gridReveal = useScrollReveal();

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div ref={headerReveal.ref as React.RefObject<HTMLDivElement | null>} className="text-center mb-16">
        <h1 className="font-display text-4xl lg:text-6xl font-bold text-charcoal mb-6">The Journal</h1>
        <p className="text-lg text-stone max-w-2xl mx-auto">Stories of craft, culture, and inspired living.</p>
      </div>

      <div ref={gridReveal.ref as React.RefObject<HTMLDivElement | null>} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogArticles.map((article) => (
          <article key={article.id} className="group flex flex-col">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-sand/30">
              <Link to={`/journal/${article.id}`}>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>
              <div className="absolute top-4 left-4">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-charcoal uppercase tracking-wider">
                  {article.category}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col flex-grow">
              <div className="flex items-center space-x-4 text-sm text-stone mb-3">
                <span>{article.date}</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {article.readTime}</span>
              </div>
              
              <Link to={`/journal/${article.id}`}>
                <h2 className="font-display text-2xl font-bold text-charcoal mb-3 group-hover:text-terracotta transition-colors leading-tight">
                  {article.title}
                </h2>
              </Link>
              
              <p className="text-stone mb-6 line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="mt-auto">
                <Link to={`/journal/${article.id}`} className="inline-flex items-center font-bold text-charcoal group-hover:text-terracotta transition-colors">
                  Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
