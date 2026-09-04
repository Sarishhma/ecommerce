import {
  Heart,
  ShoppingBag,
  Zap,
  ShieldCheck,
  RefreshCw,
  Award,
  Loader2,
  ShoppingCart,

} from 'lucide-react'

import type { Product } from '../types/product.types'
import { QuantitySelector } from './QuantitySelector'

interface ProductInfoProps {
  product: Product
  quantity: number
  onQuantityChange: (quantity: number) => void
  onAddToCart: () => void
  onBuyNow?: () => void
  isWishlisted: boolean
  onToggleWishlist: () => void
  isAddingToCart: boolean
  isAddedToCart: boolean
}

export const ProductInfo = ({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  isAddingToCart,
  isAddedToCart,
}: ProductInfoProps) => {
  return (
    <div className="flex flex-col space-y-6 w-full">

      {/* Category & Title */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold tracking-widest uppercase text-amber-700/90">
          {product.category || 'Exclusive Collection'}
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-neutral-900 leading-tight">
          {product.title}
        </h1>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold tracking-tight text-neutral-900">
          ${product.price.toFixed(2)}
        </span>
      </div>

      <div className="h-px w-full bg-neutral-200/60" />

      {/* Description */}
      {product.description && (
        <div className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Description
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
            {product.description}
          </p>
        </div>
      )}

      {/* Quantity & Wishlist */}
      <div className="flex items-end justify-between gap-4">

        {/* Quantity Selector */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Select Quantity
          </h2>

          <QuantitySelector
            quantity={quantity}
            onChange={onQuantityChange}
          />
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={onToggleWishlist}
          aria-label={
            isWishlisted
              ? 'Remove from wishlist'
              : 'Add to wishlist'
          }
          className="h-10 w-10 rounded-xl border border-neutral-200
            hover:bg-neutral-50 active:scale-[0.97]
            transition-all duration-200
            flex items-center justify-center shrink-0"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isWishlisted
                ? 'fill-amber-700 text-amber-700'
                : 'text-neutral-700'
            }`}
          />
        </button>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-2">

        <div className="flex items-center gap-3">

          {/* Buy Now */}
          <button
            type="button"
            onClick={onBuyNow}
            className="flex-1 h-12 bg-amber-700 text-white
              rounded-xl font-medium tracking-wide
              hover:bg-amber-800
              active:scale-[0.99]
              transition-all duration-200
              flex items-center justify-center gap-2.5
              shadow-md shadow-amber-700/15"
          >
            <Zap className="w-4 h-4 fill-current" />

            <span>Buy Now</span>
          </button>

          {/* Add to Cart */}
          {/* Add to Cart */}
<button
  type="button"
  onClick={onAddToCart}
  disabled={isAddingToCart}
  aria-label={isAddedToCart ? 'View cart' : 'Add to cart'}
  className={`h-12 w-12 rounded-xl
    transition-all duration-200
    flex items-center justify-center
    shrink-0 shadow-sm
    ${
      isAddedToCart
        ? 'bg-neutral-900 text-white hover:bg-neutral-800'
        : 'bg-amber-700 text-white hover:bg-amber-800'
    }
    disabled:opacity-70`}
>
  {isAddingToCart ? (
    <Loader2 className="w-5 h-5 animate-spin" />
  ) : isAddedToCart ? (
    <ShoppingCart className="w-5 h-5" />
  ) : (
    <ShoppingBag className="w-5 h-5" />
  )}
</button>
        </div>


      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 pt-6 border-t border-neutral-200/60 text-center">

        <div className="flex flex-col items-center gap-1 p-1">
          <ShieldCheck className="w-4 h-4 text-neutral-500" />

          <span className="text-[11px] font-medium text-neutral-500">
            Secure Checkout
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 p-1">
          <RefreshCw className="w-4 h-4 text-neutral-500" />

          <span className="text-[11px] font-medium text-neutral-500">
            Free Returns
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 p-1">
          <Award className="w-4 h-4 text-neutral-500" />

          <span className="text-[11px] font-medium text-neutral-500">
            Quality Guaranteed
          </span>
        </div>

      </div>
    </div>
  )
}