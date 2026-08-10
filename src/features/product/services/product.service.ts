import api from "@/lib/api"
import type {
  Product,
  CreateProductPayload,
  ProductListResponse,
  GetProductsParams,
} from "../types/product.types.ts" // Adjust path if needed

// Helper function declared FIRST so productService can use it safely
export function payloadToFormData(payload: Partial<CreateProductPayload>): FormData {
  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    if (key === "image") {
      // Only append image if it is an actual File object
      if (value instanceof File) {
        formData.append("image", value)
      }
    } else {
      formData.append(key, String(value))
    }
  })

  return formData
}

export const productService = {
  // GET: Paginated list
  getProducts: async (params?: GetProductsParams): Promise<ProductListResponse> => {
    const response = await api.get<ProductListResponse>("/product-list/", { params })
    return response.data
  },

  // GET: Single product detail
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/product-list/v2/${id}/`)
    return response.data
  },

  // POST: Create product
  createProduct: async (payload: CreateProductPayload): Promise<Product> => {
    const formData = payloadToFormData(payload)
    const response = await api.post<Product>("/product-create/v2/", formData)
    return response.data
  },

  // PATCH: Update product
  updateProduct: async (id: number, payload: Partial<CreateProductPayload>): Promise<Product> => {
    const formData = payloadToFormData(payload)
    const response = await api.patch<Product>(`/product-update/v2/${id}/`, formData)
    return response.data
  },

  // DELETE: Delete product
  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/product-delete/v2/${id}/`)
  },
}