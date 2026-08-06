
import { mockProducts } from '../data/mook-product'
import type { Product } from '../types/product.types'

// Simulated latency so loading states behave the same way they will
// once this hits a real network call.
const simulateDelay = <T>(value: T, ms = 300): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms))

export const productService = {
  async getById(id: number): Promise<Product | null> {
    const product = mockProducts.find((p) => p.id === id) ?? null
    return simulateDelay(product)

    // Real API, later:
    // const res = await api.get(`/products/${id}`)
    // return res.data
  },

  async getRelated(product: Product, limit = 4): Promise<Product[]> {
    const related = mockProducts
      .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
      .slice(0, limit)
    return simulateDelay(related)

    // Real API, later:
    // const res = await api.get(`/products/${product.id}/related`, { params: { limit } })
    // return res.data
  },
}