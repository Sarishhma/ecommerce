import { useState } from 'react'
import { ChevronLeft, PackageX, ShoppingCart } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import {
  useProduct,
  useRelatedProducts,
  useAddToCart,
  useWishlist,
  ProductGallery,
  ProductInfo,
  RelatedProducts,
} from '@/features/product'

import { useScrollReveal } from '../../../client/feature/home/hooks/use-scroll-reveal'
import { PLACEHOLDER_IMAGE } from '@/lib/product-image'

import { useAppSelector } from '@/redux'
import { selectIsAuthenticated } from '@/redux/slices/authSlice'
import { selectCartItems } from '@/redux/slices/cartSlice'

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const cartItems = useAppSelector(selectCartItems)

  const productId = id ? Number(id) : undefined

  const { data: product, isLoading } = useProduct(productId)
  const { data: relatedProducts = [] } = useRelatedProducts(product)

  const addToCartMutation = useAddToCart()

  const { isWishlisted, toggle: toggleWishlist } = useWishlist(
    productId ?? -1
  )

  const [quantity, setQuantity] = useState(1)

  const contentReveal = useScrollReveal()
  const relatedReveal = useScrollReveal()

  /*
   * Check the real Redux cart state.
   * This remains true when navigating away and coming back.
   */
  const isAddedToCart = cartItems.some(
    (item) => String(item.productId) === String(productId)
  )

  const handleAddToCart = () => {
    if (!product) return

    addToCartMutation.mutate(
      {
        product,
        quantity,
      },
      {
        onSuccess: () => {
          toast.success('Added to cart', {
            description: `${product.title} × ${quantity}`,
            icon: <ShoppingCart className="h-4 w-4" />,
            duration: 2500,
            position: 'top-center',
          })
        },
      }
    )
  }

  const handleBuyNow = () => {
    if (!product) return

    const checkoutData = {
      type: 'buyNow' as const,
      product,
      quantity,
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

  /* -------------------------------------------
     Loading
  ------------------------------------------- */

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="animate-pulse">
          <div className="mb-10 h-4 w-56 rounded bg-neutral-200" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <div className="aspect-[4/5] w-full rounded-3xl bg-neutral-200" />

              <div className="mt-4 flex gap-3">
                <div className="h-[76px] w-[76px] rounded-xl bg-neutral-200" />
                <div className="h-[76px] w-[76px] rounded-xl bg-neutral-200" />
                <div className="h-[76px] w-[76px] rounded-xl bg-neutral-200" />
              </div>
            </div>

            <div className="space-y-6 pt-2 lg:pt-8">
              <div className="h-4 w-32 rounded bg-neutral-200" />
              <div className="h-14 w-4/5 rounded-lg bg-neutral-200" />
              <div className="h-9 w-32 rounded bg-neutral-200" />
              <div className="h-px w-full bg-neutral-200" />

              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-neutral-200" />
                <div className="h-20 w-full rounded bg-neutral-200" />
              </div>

              <div className="h-12 w-32 rounded-xl bg-neutral-200" />
              <div className="h-14 w-full rounded-xl bg-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* -------------------------------------------
     Not found
  ------------------------------------------- */

  if (!product) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
            <PackageX className="h-8 w-8 stroke-[1.5]" />
          </div>

          <h2 className="mb-3 font-display text-3xl tracking-tight text-neutral-900 sm:text-4xl">
            Product Not Found
          </h2>

          <p className="mb-8 text-sm leading-relaxed text-neutral-500 sm:text-base">
            The product you're looking for might have been moved, sold out,
            or is no longer available.
          </p>

          <Link
            to="/shop"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-neutral-900 px-8 font-medium text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
            Return to Shop
          </Link>
        </div>
      </div>
    )
  }

  /* -------------------------------------------
     Product
  ------------------------------------------- */

  return (
    <div className="w-full bg-white">
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-28 lg:pt-12">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-1.5 text-sm text-stone sm:mb-10"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Shop
          </Link>

          <span className="text-neutral-300">/</span>

          <span className="max-w-[220px] truncate text-neutral-800">
            {product.title}
          </span>
        </nav>

        <div
          ref={contentReveal.ref as React.RefObject<HTMLDivElement | null>}
          className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"
        >
          {/* Product Image */}
          <div className="min-w-0">
            <ProductGallery
              images={
                product.image
                  ? [product.image]
                  : [PLACEHOLDER_IMAGE]
              }
              name={product.title}
            />
          </div>

          {/* Product Information */}
          <div className="min-w-0 lg:sticky lg:top-28">
            <ProductInfo
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              isAddingToCart={addToCartMutation.isPending}
              isAddedToCart={isAddedToCart}
              isWishlisted={isWishlisted}
              onToggleWishlist={toggleWishlist}
            />
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section
        ref={relatedReveal.ref as React.RefObject<HTMLElement | null>}
        className="border-t border-neutral-200/80 bg-white"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <RelatedProducts products={relatedProducts} />
        </div>
      </section>
    </div>
  )
}