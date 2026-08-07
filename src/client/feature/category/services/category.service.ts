import api from '@/lib/api'
import type { Category, CategoryListResponse } from '../types/category.types'

export const categoryService = {
  getCategories: async (): Promise<CategoryListResponse> => {
    const response = await api.get<CategoryListResponse>('/categories/')
    return response.data
  },

  getCategoryById: async (id: number): Promise<Category> => {
    const response = await api.get<Category>(`/categories/${id}/`)
    return response.data
  },
}