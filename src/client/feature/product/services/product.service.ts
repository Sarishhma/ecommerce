import api from '@/lib/api'
import type { GetProductsParams, Product, ProductListResponse } from '../types/product.types'
import { handleApiError } from '@/lib/handleApiError'

export const productService = {
  getProducts: async (params?: GetProductsParams): Promise<ProductListResponse> => {
    const response = await api.get<ProductListResponse>('/product-list/', { params })
    return response.data
  },

  getProductById: async (id: number): Promise<Product> => {
    try{
  const response = await api.get<Product>(`/product-list/${id}/`)
    return response.data
    }catch(error){
      handleApiError(error)
      throw(error)
    }
  
  },

  getRelated: async (product: Product, limit = 4): Promise<Product[]> => {
    // Derived client-side from the full product list for now.
    // Swap for a real endpoint once/if the backend adds one:
    // const res = await api.get<Product[]>(`/product/${product.id}/related/`, { params: { limit } })
    // return res.data

    const { results } = await productService.getProducts()

    return results
      .filter((p) => p.category !== null && p.category === product.category && p.id !== product.id)
      .slice(0, limit)
  },
}