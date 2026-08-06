
import { mockCategories, mockProducts } from '../data/mock-data'
import type { Product, ProductQuery } from '../types/shop.types'

const simulateDelay = <T>(value: T, ms = 200): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms))

export const shopService = {
  async getProducts(query: ProductQuery): Promise<Product[]> {
    const { category, sortBy } = query

    const filtered = mockProducts.filter((p) => {
      if (!category || category === 'All') return true
      return p.category === category
    })

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

    return simulateDelay(sorted)

    // Real API, later:
    // const res = await api.get('/products', { params: { category, sort: sortBy } })
    // return res.data
  },

  async getCategories(): Promise<readonly string[]> {
    return simulateDelay(mockCategories)

    // Real API, later:
    // const res = await api.get('/categories')
    // return res.data
  },
}