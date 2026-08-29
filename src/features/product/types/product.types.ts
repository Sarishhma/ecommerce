import type { Product } from '@/types'
export type { Product }

// 2. Payload required to create or update a product (api/product-create/v2)
export interface CreateProductPayload {
  title: string
  description?: string
  price: number | string
  cost_price: number | string
  unit: string
  barcode?: string | null
  category?: number | null
  image?: File | string | null
  is_taxable?: boolean
  reconcile?: boolean
  is_produced?: boolean
  is_billing_item?: boolean
  discount_exempt?: boolean
  opening_count?: number
  minimum_stock?: number
  ledger?: number | null
  excise_duty_applicable?: boolean
  importtax_percent?: number | string
   
}

// 3. API Response for product creation/updates
export type CreateProductResponse = Product

// 4. Pagination & Query Parameters
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type ProductListResponse = PaginatedResponse<Product>

export interface GetProductsParams {
    category?: number | string
  page?: number
  search?: string
}