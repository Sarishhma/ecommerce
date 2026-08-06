import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/product.service'

export const useProduct = (id: number | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id as number),
    enabled: id !== undefined && !Number.isNaN(id),
  })
}