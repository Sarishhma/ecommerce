import React from 'react';
import { useScrollReveal } from '@/features/home/hooks/use-scroll-reveal';

export const StoryPage = () => {
  const heroReveal = useScrollReveal();
  const textReveal = useScrollReveal();
  const statsReveal = useScrollReveal();
  const stepsReveal = useScrollReveal();

  return (
    <div className="pt-20 bg-ivory">
      {/* Hero Section */}
      <div ref={heroReveal.ref as React.RefObject<HTMLDivElement | null>} className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-charcoal overflow-hidden">
        <img 
          src="/cc-story.png" 
          alt="Artisans at work" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          onError={(e) => {
            // Fallback if image not found
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1610486676150-13e51a660d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-6 animate-reveal-up">Our Story</h1>
          <p className="text-xl text-white/90 font-body max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Empowering artisans, preserving traditions, and bringing authentic craftsmanship to your home.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div ref={textReveal.ref as React.RefObject<HTMLDivElement | null>} className="prose prose-lg lg:prose-xl prose-stone mx-auto">
          <p className="font-display text-2xl lg:text-3xl text-charcoal leading-relaxed text-center mb-12">
            "Crystal Clan was born from a deep appreciation for the hands that mold the earth and the stories woven into every thread."
          </p>
          <p>
            Our journey began in the vibrant markets of Southeast Asia, where centuries-old techniques are passed down through generations. We saw incredible talent, but also the struggles of rural artisans trying to reach a wider audience in a rapidly changing world.
          </p>
          <p>
            We decided to bridge that gap. By partnering directly with master craftspeople, we eliminate the middlemen, ensuring fair compensation that respects the time, skill, and heritage embedded in their work.
          </p>
          <p>
            Every piece in our collection is a testament to sustainable practices and ethical production. We use locally sourced, natural materials—from rich clay and bamboo to organic cotton and natural dyes. 
          </p>
        </div>
      </div>

      {/* Stats / Impact Section */}
      <div className="bg-sand/30 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsReveal.ref as React.RefObject<HTMLDivElement | null>} className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-6">
              <span className="block font-display text-5xl lg:text-6xl font-bold text-terracotta mb-4">50+</span>
              <h3 className="font-bold text-xl text-charcoal mb-2">Artisan Families Supported</h3>
              <p className="text-stone">Providing sustainable income and preserving traditional techniques.</p>
            </div>
            <div className="p-6">
              <span className="block font-display text-5xl lg:text-6xl font-bold text-terracotta mb-4">100%</span>
              <h3 className="font-bold text-xl text-charcoal mb-2">Natural Materials</h3>
              <p className="text-stone">Sourced responsibly to minimize environmental impact.</p>
            </div>
            <div className="p-6">
              <span className="block font-display text-5xl lg:text-6xl font-bold text-terracotta mb-4">4</span>
              <h3 className="font-bold text-xl text-charcoal mb-2">Generations of Skill</h3>
              <p className="text-stone">Heritage craftsmanship passed down through families.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Craftsmanship Journey */}
      <div className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-6">The Journey of Creation</h2>
          <p className="text-lg text-stone max-w-2xl mx-auto">Discover the meticulous process behind every Crystal Clan piece.</p>
        </div>

        <div ref={stepsReveal.ref as React.RefObject<HTMLDivElement | null>} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Sourcing', desc: 'We carefully select sustainable, local materials that respect the earth.' },
            { step: '02', title: 'Preparation', desc: 'Materials are prepared using time-honored traditional methods.' },
            { step: '03', title: 'Crafting', desc: 'Artisans shape, weave, or mold each piece entirely by hand.' },
            { step: '04', title: 'Finishing', desc: 'Meticulous details and natural finishes complete the masterpiece.' }
          ].map((item) => (
            <div key={item.step} className="bg-white p-8 rounded-3xl shadow-sm border border-sand hover:shadow-md transition-shadow">
              <span className="font-display text-3xl font-bold text-copper/30 mb-4 block">{item.step}</span>
              <h3 className="font-display text-2xl font-bold text-charcoal mb-3">{item.title}</h3>
              <p className="text-stone">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
