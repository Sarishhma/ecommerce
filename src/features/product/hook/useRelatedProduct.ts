import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/product.service'
import type { Product } from '../types/product.types'

export const useRelatedProducts = (product: Product | null | undefined) => {
  return useQuery({
    queryKey: ['product', product?.id, 'related'],
    queryFn: () => productService.getRelated(product!),
    enabled: !!product,
  })
}