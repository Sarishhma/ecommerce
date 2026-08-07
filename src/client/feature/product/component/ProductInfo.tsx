import { Heart } from 'lucide-react'
import { QuantitySelector } from './QuantitySelector'
import type { Product } from '../types/product.types'

interface ProductInfoProps {
  product: Product
  quantity: number
  onQuantityChange: (quantity: number) => void
  onAddToCart: () => void
  isWishlisted: boolean
  onToggleWishlist: () => void
  isAddingToCart: boolean
}

export const ProductInfo = ({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  isAddingToCart,
}: ProductInfoProps) => (
  <div className="flex flex-col">
    <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">{product.title}</h1>

    <div className="flex items-end space-x-4 mb-8">
      <span className="font-display text-3xl font-bold text-terracotta">${product.price.toFixed(2)}</span>
    </div>

    <p className="text-stone leading-relaxed mb-8">{product.description}</p>

    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8 mt-auto">
      <QuantitySelector quantity={quantity} onChange={onQuantityChange} />

      <button
        onClick={onAddToCart}
        disabled={isAddingToCart}
        className="flex-1 py-3 px-8 bg-charcoal text-white rounded-xl font-medium hover:bg-terracotta transition-colors flex items-center justify-center shadow-lg disabled:opacity-60"
      >
        {isAddingToCart ? 'Adding…' : 'Add to Cart'}
      </button>

      <button
        onClick={onToggleWishlist}
        className="p-3 border border-sand bg-white rounded-xl text-charcoal hover:border-terracotta hover:text-terracotta transition-all flex-shrink-0"
      >
        <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-terracotta text-terracotta' : ''}`} />
      </button>
    </div>
  </div>
)