import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAppDispatch, addToCart } from '@/redux'

export const useAddToCart = () => {
  const dispatch = useAppDispatch()
  const idempotencyKey = useRef(crypto.randomUUID())

  return useMutation({
    mutationFn: async ({
      product,
      quantity,
    }: {
      product: any
      quantity: number
    }) => {
      dispatch(
        addToCart({
          productId: String(product.id || product.product_id),
          slug: product.slug || '',
          name: product.title || product.name || 'Product',
          image: product.image ?? '',
          price:
            typeof product.price === 'number'
              ? product.price
              : 0,
          quantity: quantity || 1,
          maxQuantity:
            product.opening_count ??
            product.maxQuantity ??
            99,
        })
      )

      return product
    },

    onSettled: () => {
      idempotencyKey.current = crypto.randomUUID()
    },
  })
}