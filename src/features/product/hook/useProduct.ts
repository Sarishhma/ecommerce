import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/product.service'
import type { GetProductsParams, ProductListResponse } from '../types/product.types'

export const useProduct = (id: number | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id as number),
    enabled: id !== undefined && !Number.isNaN(id),
  })
}

export const useGetProducts = (params?: GetProductsParams) => {
  return useQuery<ProductListResponse>({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes - data is considered fresh
    gcTime: 10 * 60 * 1000, // 10 minutes - cache garbage collection time
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnReconnect: false, // Don't refetch on reconnection
  })
}