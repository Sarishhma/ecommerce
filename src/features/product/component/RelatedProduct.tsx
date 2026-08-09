import { Link } from 'react-router-dom'
import type { Product } from '../types/product.types'
import { getProductImage } from '@/lib/product-image'

export const RelatedProducts = ({ products }: { products: Product[] }) => {
  if (products.length === 0) return null

  return (
    <div className="pt-16 border-t border-sand">
      <h2 className="font-display text-3xl font-bold text-charcoal mb-10 text-center">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-square overflow-hidden bg-sand/30">
              <Link to={`/product/${p.id}`}>
                <img
                  src={getProductImage(p)}
                  alt={p.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <Link to={`/product/${p.id}`}>
                <h3 className="font-display text-lg font-bold text-charcoal hover:text-terracotta transition-colors truncate mb-1">
                  {p.title}
                </h3>
              </Link>
              <span className="font-body font-semibold text-terracotta">${p.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}