    import { useQuery } from '@tanstack/react-query'
    import { categoryService } from '../services/category.service'
    import type { CategoryListResponse } from '../types/category.types'

    export const useCategories = () => {
    return useQuery<CategoryListResponse>({
        queryKey: ['categories'],
        queryFn: () => categoryService.getCategories(),
    })
    }