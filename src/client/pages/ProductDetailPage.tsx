import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  useProduct,
  useRelatedProducts,
  useAddToCart,
  useWishlist,
  ProductBreadcrumbs,
  ProductGallery,
  ProductInfo,
  RelatedProducts,
} from '../feature/product'
import { useScrollReveal } from '../feature/home/hooks/use-scroll-reveal'


export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const productId = id ? Number(id) : undefined

  const { data: product, isLoading } = useProduct(productId)
  const { data: relatedProducts = [] } = useRelatedProducts(product)
  const addToCartMutation = useAddToCart()
  const { isWishlisted, toggle: toggleWishlist } = useWishlist(productId ?? -1)

  const [quantity, setQuantity] = useState(1)
  const contentReveal = useScrollReveal()
  const relatedReveal = useScrollReveal()

  if (isLoading) {
    return <div className="min-h-[60vh] flex items-center justify-center pt-24">Loading…</div>
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-24">
        <h2 className="font-display text-4xl text-charcoal mb-4">Product Not Found</h2>
        <p className="text-stone mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="px-8 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-charcoal transition-colors">
          Return to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ProductBreadcrumbs productName={product.name} />

      <div ref={contentReveal.ref as React.RefObject<HTMLDivElement | null>} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo
          product={product}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onAddToCart={() => addToCartMutation.mutate({ product, quantity })}
          isAddingToCart={addToCartMutation.isPending}
          isWishlisted={isWishlisted}
          onToggleWishlist={toggleWishlist}
        />
      </div>

      <div ref={relatedReveal.ref as React.RefObject<HTMLDivElement | null>}>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  )
}