// import { Link, useNavigate } from 'react-router-dom'
// import { Heart, ArrowUpRight } from 'lucide-react'
// import {
//   useAppDispatch,
//   useAppSelector,
//   toggleWishlistItem,
//   selectWishlistIds,
// } from '@/redux'
// import { selectIsAuthenticated } from '@/redux/slices/authSlice'
// import type { Product } from '@/types'
// import type { Category } from '@/features/category/types/category.types'
// import { useAddToCart } from '@/features/product'

// function formatPrice(price: number | string): string {
//   const value = typeof price === 'string' ? parseFloat(price) : price
//   return Number.isNaN(value) ? '—' : value.toFixed(2)
// }

// interface ProductCardProps {
//   product: Product
//   categories?: Category[]
// }

// export const ProductCard = ({ product, categories }: ProductCardProps) => {
//   const dispatch = useAppDispatch()
//   const navigate = useNavigate()

//   const isAuthenticated = useAppSelector(selectIsAuthenticated)
//   const wishlistIds = useAppSelector(selectWishlistIds)
//   const isWishlisted = wishlistIds.some((id) => String(id) === String(product.id))

//   const { mutate: handleAddToCart, isPending } = useAddToCart()

//   const getCategoryName = (categoryId: number | string | null | undefined) => {
//     if (categoryId == null || !categories) return null
//     const category = categories.find((cat) => String(cat.id) === String(categoryId))
//     return category?.title ?? null
//   }

//   const categoryName = getCategoryName(product.category)

//   const handleBuyNow = () => {
//     const checkoutData = { type: 'buyNow' as const, product, quantity: 1 }

//     if (!isAuthenticated) {
//       navigate('/login', { state: { from: '/checkout', checkoutData } })
//       return
//     }

//     navigate('/checkout', { state: { checkoutData } })
//   }

//   const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault()
//     e.stopPropagation()
//     dispatch(toggleWishlistItem(Number(product.id)))
//   }

//   return (
//     <article className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-200/60 shadow-sm hover:shadow-xl transition-all duration-500">
//       {/* Image */}
//       <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
//         <Link to={`/product/${product.id}`} className="block h-full w-full">
//           {product.image ? (
//             <img
//               src={product.image}
//               alt={product.title}
//               loading="lazy"
//               className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
//             />
//           ) : (
//             <div className="flex h-full items-center justify-center text-sm text-neutral-400">
//               No image
//             </div>
//           )}
//         </Link>

//         {/* Wishlist toggle */}
//         <button
//           type="button"
//           onClick={handleWishlist}
//           aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
//           className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-110"
//         >
//           <Heart
//             className={`h-[17px] w-[17px] ${
//               isWishlisted ? 'fill-amber-700 text-amber-700' : 'text-neutral-700'
//             }`}
//           />
//         </button>

//         {/* Quick view indicator */}
//         <Link
//           to={`/product/${product.id}`}
//           aria-label={`View ${product.title}`}
//           className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-neutral-800 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 shadow-sm"
//         >
//           <ArrowUpRight className="h-4 w-4 stroke-[2]" />
//         </Link>
//       </div>

//       {/* Content */}
//       <div className="p-5 flex flex-col flex-grow justify-between bg-white">
//         <div>
//           {categoryName && (
//             <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
//               {categoryName}
//             </p>
//           )}
//           <Link to={`/product/${product.id}`}>
//             <h3 className="text-base font-medium text-neutral-900 group-hover:text-amber-700 transition-colors line-clamp-1 mb-1">
//               {product.title}
//             </h3>
//           </Link>
//         </div>

//         <div className="pt-2 border-t border-neutral-100">
//           <span className="text-lg font-semibold tracking-tight text-neutral-900 block mb-3">
//             Rs. {formatPrice(product.price)}
//           </span>

//           <div className="grid grid-cols-2 gap-2">
//             <button
//               type="button"
//               disabled={isPending}
//               onClick={() => handleAddToCart({ product, quantity: 1 })}
//               className="h-10 rounded-lg border border-neutral-200 bg-white px-2 text-[11px] font-semibold tracking-wide text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white disabled:opacity-50"
//             >
//               {isPending ? 'Adding...' : 'Add to Cart'}
//             </button>

//             <button
//               type="button"
//               disabled={isPending}
//               onClick={handleBuyNow}
//               className="h-10 rounded-lg bg-amber-700 px-2 text-[11px] font-semibold tracking-wide text-white transition-colors hover:bg-amber-800 disabled:opacity-50"
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </article>
//   )
// }

import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart } from 'lucide-react'
import { useAppDispatch, useAppSelector, toggleWishlistItem, selectWishlistIds } from '@/redux'
import type { Product } from '@/types'
import type { Category } from '@/features/category/types/category.types'

function formatPrice(price: number | string): string {
  const value = typeof price === 'string' ? parseFloat(price) : price
  return Number.isNaN(value) ? '—' : value.toFixed(2)
}

interface ProductCardProps {
  product: Product
  categories?: Category[]
}

export const ProductCard = ({ product, categories }: ProductCardProps) => {
  const dispatch = useAppDispatch()
  const wishlistIds = useAppSelector(selectWishlistIds)
  const isWishlisted = wishlistIds.some((id) => String(id) === String(product.id))

  const getCategoryName = (categoryId: number | string | null | undefined) => {
    if (categoryId == null || !categories) return null
    const category = categories.find((cat) => String(cat.id) === String(categoryId))
    return category?.title ?? null
  }

  const categoryName = getCategoryName(product.category)

  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleWishlistItem(Number(product.id)))
  }

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-200/60 shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
              No image
            </div>
          )}
        </Link>

        {/* Wishlist toggle */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-110"
        >
          <Heart
            className={`h-[17px] w-[17px] ${
              isWishlisted ? 'fill-amber-700 text-amber-700' : 'text-neutral-700'
            }`}
          />
        </button>

        {/* Quick view indicator */}
        <Link
          to={`/product/${product.id}`}
          aria-label={`View ${product.title}`}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-neutral-800 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 shadow-sm"
        >
          <ArrowUpRight className="h-4 w-4 stroke-[2]" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {categoryName && (
            <span className="text-xs font-bold tracking-widest uppercase text-amber-700/90 mb-1 block">
              {categoryName}
            </span>
          )}
          <Link to={`/product/${product.id}`}>
            <h3 className="text-base font-medium text-neutral-900 group-hover:text-amber-700 transition-colors line-clamp-1 mb-1">
              {product.title}
            </h3>
          </Link>
          <p className="text-sm text-neutral-500 line-clamp-1 font-normal mb-3">
            {product.description || 'Exclusive item from our collection'}
          </p>
        </div>

        {/* Price & Action Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <span className="text-lg font-semibold tracking-tight text-neutral-900">
            Rs. {formatPrice(product.price)}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="text-xs font-semibold uppercase tracking-wider text-amber-700 hover:text-amber-800 transition-colors"
          >
            View Item
          </Link>
        </div>
      </div>
    </div>
  )
}