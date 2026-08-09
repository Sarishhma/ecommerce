import api from '@/lib/api'
import type { CreateProductPayload, GetProductsParams, Product, ProductListResponse } from '../types/product.types'
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
// /api/product-create/v2
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
export const createProduct = async (
  payload: CreateProductPayload
): Promise<Product> => {
  const isMultipart = payload.image instanceof File

  if (isMultipart) {
    const formData = new FormData()

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value)
        } else {
          formData.append(key, String(value))
        }
      }
    })

    const response = await api.post<Product>(
      '/product-create/v2/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  }

  const response = await api.post<Product>(
    '/product-create/v2/',
    payload
  )
  return response.data
}