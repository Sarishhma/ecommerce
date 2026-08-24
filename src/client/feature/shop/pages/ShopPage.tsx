import React, { useMemo, useState } from 'react';
import { X } from 'lucide-react';

import { useScrollReveal } from '../../home/hooks/use-scroll-reveal';
import { ProductCard } from '@/components/common/ProductCard';


import { CategoryFilterBar } from '../components/CategoryFilterBar';
import {
  SortControl,
  type SortOption,
} from '../components/SortControl';
import { EmptyState } from '../components/EmptyState';
import { useGetProducts } from '@/features/product/hook/useProduct';
import { useGetCategories } from '@/features/category/hooks/useCategories';

export const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    null
  );

  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Get products using React Query hook
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProducts();

  // Get categories
  const { data: categoryData } = useGetCategories();

  const products = productData?.results ?? [];
  const categories = categoryData?.results ?? [];

  const gridReveal = useScrollReveal();

 const filteredProducts = useMemo(() => {
  return products
    .filter(
      (product) =>
        selectedCategory === null ||
        product.category_id === selectedCategory
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }

      if (sortBy === 'price-high') {
        return b.price - a.price;
      }

      return 0;
    });
}, [products, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSortBy('featured');
  };

  return (
    <div className="pb-20 lg:pt-12 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Filter Bar */}
      <div className="mb-12 ">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200/60 pb-6">

          {/* Category Filter */}
          <CategoryFilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">

            {/* Sort */}
            <SortControl
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Desktop Results Count */}
            <div className="hidden sm:block text-xs text-stone-400">
              <span className="text-stone-600 font-medium">
                {filteredProducts.length}
              </span>{' '}
              items
            </div>

            {/* Clear Filters */}
            {(selectedCategory !== null || sortBy !== 'featured') && (
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

        {/* Mobile Results Count */}
        <div className="sm:hidden mt-4 text-xs text-stone-400">
          <span className="text-stone-600 font-medium">
            {filteredProducts.length}
          </span>{' '}
          items found
        </div>
      </div>

      {/* Product Grid */}
      <div ref={gridReveal.ref as React.RefObject<HTMLDivElement | null>}>

        {isLoading ? (
          <div className="text-center py-24 text-sm text-stone-400">
            Loading products…
          </div>
        ) : isError ? (
          <div className="text-center py-24 text-sm text-red-500">
            Failed to load products.
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState onReset={clearFilters} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};