import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '../types/product.types'
import { getProductImage } from '@/lib/product-image'

export const RelatedProducts = ({ products }: { products: Product[] }) => {
  if (products.length === 0) return null

  return (
    <section className="pt-16 border-t border-neutral-200/60 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-10 text-center space-y-1">
        <span className="text-xs font-bold tracking-widest uppercase text-amber-700/90">
          Curated Suggestions
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-neutral-900">
          You May Also Like
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-200/60 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
              <Link to={`/product/${p.id}`} className="block h-full w-full">
                <img
                  src={getProductImage(p)}
                  alt={p.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>

              {/* Quick View Link Indicator */}
              <Link
                to={`/product/${p.id}`}
                aria-label={`View ${p.title}`}
                className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-neutral-800 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 shadow-sm"
              >
                <ArrowUpRight className="h-4 w-4 stroke-[2]" />
              </Link>
            </div>

            {/* Product Metadata */}
            <div className="p-5 flex flex-col flex-grow justify-between bg-white">
              <div>
                <Link to={`/product/${p.id}`}>
                  <h3 className="text-base font-medium text-neutral-900 group-hover:text-amber-700 transition-colors line-clamp-1 mb-1">
                    {p.title}
                  </h3>
                </Link>
                <p className="text-sm text-neutral-500 line-clamp-1 font-normal mb-3">
                  {p.description || 'Exclusive item from our collection'}
                </p>
              </div>

              {/* Price & Action Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                <span className="text-lg font-semibold tracking-tight text-neutral-900">
                  ${p.price.toFixed(2)}
                </span>
                <Link
                  to={`/product/${p.id}`}
                  className="text-xs font-semibold uppercase tracking-wider text-amber-700 hover:text-amber-800 transition-colors"
                >
                  View Item
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}