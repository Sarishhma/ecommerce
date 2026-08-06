import { useQuery } from '@tanstack/react-query'
import { shopService } from '../services/shop.service'

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => shopService.getCategories(),
  })
}