import { Link, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'

import {
  useAppDispatch,
  useAppSelector,
  toggleWishlistItem,
  selectWishlistIds,
} from '@/redux'

import { selectIsAuthenticated } from '@/redux/slices/authSlice'

import type { Product } from '@/types'
import type { Category } from '@/features/category/types/category.types'

import { useAddToCart } from '@/features/product'

interface ProductCardProps {
  product: Product
  categories?: Category[]
}

export const ProductCard = ({
  product,
  categories,
}: ProductCardProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const wishlistIds = useAppSelector(selectWishlistIds)

  const isWishlisted = wishlistIds.some(
    (id) => String(id) === String(product.id)
  )

  const { mutate: handleAddToCart, isPending } = useAddToCart()

  const getCategoryName = (
    categoryId: number | string | null | undefined
  ) => {
    if (categoryId == null || !categories) return null

    const category = categories.find(
      (cat) => String(cat.id) === String(categoryId)
    )

    return category?.title ?? null
  }

  const categoryName = getCategoryName(product.category)

  const handleBuyNow = () => {
    const checkoutData = {
      type: 'buyNow' as const,
      product,
      quantity: 1,
    }

    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: '/checkout',
          checkoutData,
        },
      })

      return
    }

    navigate('/checkout', {
      state: {
        checkoutData,
      },
    })
  }

  const handleWishlist = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    e.stopPropagation()

    dispatch(toggleWishlistItem(Number(product.id)))
  }

  return (
    <article
      className="
        group
        flex
        flex-col
        overflow-hidden
        bg-white
        border
        border-neutral-200
        rounded-2xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-[#F7F5F0]">

        <Link
          to={`/product/${product.id}`}
          className="block h-full w-full"
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="
                h-full
                w-full
                object-cover
                object-center
                transition-transform
                duration-500
                group-hover:scale-[1.04]
              "
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
              No image
            </div>
          )}
        </Link>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
          className="
            absolute
            right-3
            top-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white/95
            shadow-sm
            transition-all
            duration-200
            hover:scale-105
          "
        >
          <Heart
            className={`h-[17px] w-[17px] ${
              isWishlisted
                ? 'fill-amber-700 text-amber-700'
                : 'text-neutral-700'
            }`}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4 pt-4">

        {/* Category */}
        {categoryName && (
          <p className="mb-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
            {categoryName}
          </p>
        )}

        {/* Product Name */}
        <Link
          to={`/product/${product.id}`}
          className="
            block
            text-center
            font-serif
            text-[17px]
            font-medium
            leading-6
            text-neutral-900
            transition-colors
            hover:text-amber-700
          "
        >
          {product.title}
        </Link>

        {/* Price */}
       <div className="mt-2 flex items-baseline justify-center gap-2">
  <span className="text-[11px] uppercase tracking-widest text-neutral-400">
    Price
  </span>

  <span className="font-serif text-lg font-semibold text-neutral-900">
    Rs. {product.price.toFixed(2)}
  </span>
</div>


        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">

          <button
            type="button"
            disabled={isPending}
            onClick={() =>
              handleAddToCart({
                product,
                quantity: 1,
              })
            }
            className="
              h-10
              rounded-lg
              border
              border-neutral-200
              bg-white
              px-2
              text-[11px]
              font-semibold
              tracking-wide
              text-neutral-800
              transition-colors
              hover:border-neutral-900
              hover:bg-neutral-900
              hover:text-white
              disabled:opacity-50
            "
          >
            {isPending ? 'Adding...' : 'Add to Cart'}
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={handleBuyNow}
            className="
              h-10
              rounded-lg
              bg-amber-700
              px-2
              text-[11px]
              font-semibold
              tracking-wide
              text-white
              transition-colors
              hover:bg-amber-800
              disabled:opacity-50
            "
          >
            Buy Now
          </button>

        </div>
      </div>
    </article>
  )
}
