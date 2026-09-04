import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useScrollReveal } from '../../home/hooks/use-scroll-reveal';
import { ProductCard } from '@/components/common/ProductCard';

import {
  SortControl,
  type SortOption,
} from '../components/SortControl';

import { useGetProducts } from '@/features/product/hook/useProduct';

export const ShopPage = () => {
  const [searchParams] = useSearchParams();

  // Get category ID from URL
  const categoryId = searchParams.get('category');

  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Get products
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProducts();

  const products = productData?.results ?? [];

  const gridReveal = useScrollReveal();

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    const categoryFiltered = products.filter((product) => {
      // If no category is selected, show all products
      if (!categoryId) {
        return true;
      }

      return product.category_id === Number(categoryId);
    });

    // Sort products
    return [...categoryFiltered].sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }

      if (sortBy === 'price-high') {
        return b.price - a.price;
      }

      return 0;
    });
  }, [products, categoryId, sortBy]);

  return (
    <div className="pb-20 lg:pt-12 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Header / Sort */}
      <div className="mb-12">
        <div className="flex justify-end border-b border-stone-200/60 pb-6">
          <SortControl
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div
        ref={gridReveal.ref as React.RefObject<HTMLDivElement | null>}
      >
        {isLoading ? (
          <div className="text-center py-24 text-sm text-stone-400">
            Loading products…
          </div>
        ) : isError ? (
          <div className="text-center py-24 text-sm text-red-500">
            Failed to load products.
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24 text-sm text-stone-400">
            No products found in this category.
          </div>
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
