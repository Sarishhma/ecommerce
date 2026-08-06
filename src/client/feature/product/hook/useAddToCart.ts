import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAppDispatch, addToCart } from '@/redux'
import type { Product } from '../types/product.types'

export const useAddToCart = () => {
  const dispatch = useAppDispatch()
  const idempotencyKey = useRef(crypto.randomUUID())

  return useMutation({
    mutationFn: async ({ product, quantity }: { product: Product; quantity: number }) => {
      dispatch(
        addToCart({
          productId: String(product.id),
          slug: product.slug,
          name: product.name,
          image: product.image, 
          price: product.price,
          maxQuantity: product.maxQuantity,
          quantity,
        })
      )
    },
    onSettled: () => {
      idempotencyKey.current = crypto.randomUUID()
    },
  })
}