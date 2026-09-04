
import { ProductCard } from '@/components/common/ProductCard'
import type { Product } from '../types/product.types'


export const RelatedProducts = ({ products }: { products: Product[] }) => {
  if (products.length === 0) return null

  return (
    <section className="pt-16 border-t border-neutral-200/60 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-10 text-center space-y-1">
        <span className="text-xs font-bold tracking-widest uppercase text-amber-700/90">
          Curated Suggestions
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-neutral-900">
          You May Also Like
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}