import api from '@/lib/api'
import type { Category, CategoryListResponse, CreateCategoryPayload, GetCategoriesParams, UpdateCategoryPayload } from '../types/category.types'

export const categoryService = {
  getCategories: async (params?: GetCategoriesParams): Promise<CategoryListResponse> => {
  const response = await api.get<CategoryListResponse>('/categories/', { params })
  return response.data
},

  getCategoryById: async (id: number): Promise<Category> => {
    const response = await api.get<Category>(`/categories/${id}/`)
    return response.data
  },
  createCategory: async (payload: CreateCategoryPayload): Promise<Category> => {
    const response = await api.post<Category>('/categories/', payload)
    return response.data
  },

  updateCategory: async (id: number, payload: UpdateCategoryPayload): Promise<Category> => {
    const response = await api.patch<Category>(`/categories/${id}/`, payload)
    return response.data
  },

  deleteCategory: async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}/`)
  },
}