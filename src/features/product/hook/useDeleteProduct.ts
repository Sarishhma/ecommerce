// features/product/hook/useDeleteProduct.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '../services/product.service' // adjust path to where your deleteProduct API method lives

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: () => {
      // Invalidate products query to trigger an immediate background refresh
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}