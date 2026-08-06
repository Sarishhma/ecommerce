import { useQuery } from '@tanstack/react-query'
import { shopService } from '../services/shop.service'
import type { ProductQuery } from '../types/shop.types'

export const useProducts = (query: ProductQuery) => {
  return useQuery({
    queryKey: ['products', query.category, query.sortBy],
    queryFn: () => shopService.getProducts(query),
  })
}