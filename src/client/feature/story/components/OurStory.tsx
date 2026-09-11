

import React from 'react';
import { useScrollReveal } from '../../home/hooks/use-scroll-reveal';

export const StoryPage = () => {
  const heroReveal = useScrollReveal();
  const textReveal = useScrollReveal();
  const statsReveal = useScrollReveal();

  return (
    <div className="bg-[#FAF9F6] text-stone-900 antialiased selection:bg-stone-900 selection:text-white">
      {/* Narrative Section */}
      <section className="py-24 sm:py-32 lg:py-10 px-6 sm:px-8 max-w-3xl mx-auto">
        <div 
          ref={textReveal.ref as React.RefObject<HTMLDivElement>}
          className="space-y-16"
        >
    
          {/* Featured Quote */}
          <div className="text-center">
            <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-light leading-relaxed tracking-tight italic">
              "Bijeshwori Mala Traders "
            </p>
          </div>

    
          {/* High-Readability Narrative Body */}
          <div className="space-y-8 text-base sm:text-lg font-normal leading-loose text-stone-700 tracking-normal">
            <p className="first-letter:float-left first-letter:text-6xl first-letter:pr-4 first-letter:font-display first-letter:font-light first-letter:text-stone-900 first-letter:leading-none">
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
      </section>

      {/* Impact Stats Section */}
      <section className="border-t border-stone-200/60  py-12 sm:py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          
    

          <div 
            ref={statsReveal.ref as React.RefObject<HTMLDivElement>} 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12"
          >
            {/* Stat Box 1 */}
            <div className="flex flex-col items-center text-center p-8 sm:p-10 bg-white rounded-xl border border-stone-200/50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.05)] transition-all duration-300">
              <span className="font-display text-5xl sm:text-6xl font-light text-stone-900 tracking-tight mb-4">
                50+
              </span>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-3">
                Artisan Families
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed max-w-xs font-light">
                Providing sustainable income and preserving traditional techniques.
              </p>
            </div>

            {/* Stat Box 2 */}
            <div className="flex flex-col items-center text-center p-8 sm:p-10 bg-white rounded-xl border border-stone-200/50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.05)] transition-all duration-300">
              <span className="font-display text-5xl sm:text-6xl font-light text-stone-900 tracking-tight mb-4">
                100%
              </span>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-3">
                Natural Materials
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed max-w-xs font-light">
                Sourced responsibly to minimize environmental impact.
              </p>
            </div>

            {/* Stat Box 3 */}
            <div className="flex flex-col items-center text-center p-8 sm:p-10 bg-white rounded-xl border border-stone-200/50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.05)] transition-all duration-300">
              <span className="font-display text-5xl sm:text-6xl font-light text-stone-900 tracking-tight mb-4">
                3rd
              </span>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-3">
                Generations of Skill
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed max-w-xs font-light">
                Heritage craftsmanship passed down through families.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};