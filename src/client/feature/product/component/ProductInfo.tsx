import { Heart, Star, Check } from 'lucide-react'
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
    <h1 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">{product.name}</h1>

    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center space-x-1 text-copper">
        {[...Array(4)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-current" />
        ))}
        <Star className="w-5 h-5 fill-current opacity-50" />
      </div>
      <span className="text-sm text-stone">{product.rating} (24 Reviews)</span>
    </div>

    <div className="flex items-end space-x-4 mb-8">
      <span className="font-display text-3xl font-bold text-terracotta">${product.price.toFixed(2)}</span>
    </div>

    <p className="text-stone leading-relaxed mb-8">{product.description}</p>

    <div className="grid grid-cols-2 gap-6 py-6 border-y border-sand mb-8 text-sm">
      {product.artisan && (
        <div>
          <span className="block text-stone mb-1">Artisan</span>
          <span className="font-medium text-charcoal">{product.artisan}</span>
        </div>
      )}
      {product.origin && (
        <div>
          <span className="block text-stone mb-1">Origin</span>
          <span className="font-medium text-charcoal">{product.origin}</span>
        </div>
      )}
      {product.materials && (
        <div className="col-span-2">
          <span className="block text-stone mb-1">Materials</span>
          <span className="font-medium text-charcoal">{product.materials.join(', ')}</span>
        </div>
      )}
    </div>

    {product.features && product.features.length > 0 && (
      <div className="mb-8">
        <h3 className="font-display text-lg font-bold text-charcoal mb-4">Key Features</h3>
        <ul className="space-y-3">
          {product.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-stone">
              <Check className="w-5 h-5 text-terracotta mr-3 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

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