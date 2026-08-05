import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { products, categories } from '@/config/data';
import { useScrollReveal } from '../feature/home/hooks/use-scroll-reveal';
import { ProductCard } from '@/components/common/ProductCard';

export const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const gridReveal = useScrollReveal();

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          !selectedCategory || selectedCategory === 'All' || p.category === selectedCategory;
        return matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [selectedCategory, sortBy]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSortBy('featured');
  };

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">


      {/* Filter Bar */}
      <div className="mb-12 mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200/60 pb-6">
          {/* Category filters - horizontal scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-1.5 text-xs tracking-wider transition-all duration-300 whitespace-nowrap ${
                selectedCategory === null
                  ? 'text-amber-600 border-b-2 border-amber-600'
                  : 'text-stone-400 hover:text-stone-600 border-b-2 border-transparent hover:border-stone-300'
              }`}
            >
              All
            </button>
            {categories.filter((c) => c !== 'All').map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 text-xs tracking-wider transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-stone-400 hover:text-stone-600 border-b-2 border-transparent hover:border-stone-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-300" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border-none text-xs font-light text-stone-600 outline-none cursor-pointer py-1 px-1"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            
            <div className="hidden sm:block text-xs text-stone-400">
              <span className="text-stone-600 font-medium">{filteredProducts.length}</span> items
            </div>

            {(selectedCategory || sortBy !== 'featured') && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Mobile results count */}
        <div className="sm:hidden mt-4 text-xs text-stone-400">
          <span className="text-stone-600 font-medium">{filteredProducts.length}</span> items found
        </div>
      </div>

      {/* Product Grid */}
      <div ref={gridReveal.ref as React.RefObject<HTMLDivElement | null>}>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-block p-6 rounded-full bg-stone-50 mb-6">
              <SlidersHorizontal className="w-6 h-6 text-stone-300" />
            </div>
            <p className="text-sm text-stone-400 mb-4">No products match your selection</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 text-xs tracking-wider text-stone-600 border border-stone-200 rounded-full hover:border-stone-400 hover:text-stone-800 transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};