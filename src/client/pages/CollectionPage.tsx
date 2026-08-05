import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { products, collections } from '@/config/data';
import { useScrollReveal } from '@/features/home/hooks/use-scroll-reveal';
import { ProductCard } from '@/components/common/ProductCard';

export const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const collection = collections.find((c) => c.slug === slug);

  const headerReveal = useScrollReveal();
  const gridReveal = useScrollReveal();

  if (!collection) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 pt-24 text-center">
        <h2 className="text-2xl font-light text-[#1A1A1A] mb-2">Collection Not Found</h2>
        <Link
          to="/shop"
          className="mt-4 px-6 py-2 bg-black text-white text-xs font-medium rounded hover:bg-neutral-800 transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const collectionProducts = products.filter((p) => p.categorySlug === collection.slug);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div
        ref={headerReveal.ref as React.RefObject<HTMLDivElement | null>}
        className="mb-12 text-center border-b border-neutral-200 pb-10"
      >
        <Link
          to="/shop"
          className="inline-flex items-center text-xs text-neutral-400 hover:text-black mb-4 uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Shop
        </Link>
        <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#1A1A1A] mb-3">
          {collection.name}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto font-normal leading-relaxed">
          {collection.blurb}
        </p>
      </div>

      {/* Grid */}
      <div ref={gridReveal.ref as React.RefObject<HTMLDivElement | null>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};