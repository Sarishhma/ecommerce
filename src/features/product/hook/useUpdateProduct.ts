// src/hooks/useUpdateProduct.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '../services/product.service'
import type { Product, CreateProductPayload, ProductListResponse } from '../types/product.types'

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation<Product, Error, { id: number; payload: Partial<CreateProductPayload> }>({
    mutationFn: ({ id, payload }) => productService.updateProduct(id, payload),

    onSuccess: (updatedProduct, { id }) => {
      // 1. Invalidate product list queries (triggers refetch in background)
      queryClient.invalidateQueries({ queryKey: ['products'] })

      // 2. Invalidate single product detail query if open
      queryClient.invalidateQueries({ queryKey: ['product', id] })

      // 3. Update query cache directly so UI updates with zero delay
      queryClient.setQueriesData<ProductListResponse>(
        { queryKey: ['products'] },
        (oldData) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            results: oldData.results.map((item) =>
              item.id === updatedProduct.id ? updatedProduct : item
            ),
          }
        }
      )
    },
  })
}