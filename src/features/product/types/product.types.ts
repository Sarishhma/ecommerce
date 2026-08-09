// 1. Base Product interface representing a fetched product object
export interface Product {
  id: number
  title: string
  slug: string
  description: string
  image: string | null
  price: number
  is_taxable: boolean
  product_id: number | null
  unit: string
  category: number | null
  barcode: string | null
  reconcile: boolean
  is_billing_item: boolean
  ledger: number | null
  ledger_name: string | null
  opening_count: number
  is_produced: boolean
  cost_price: number
  discount_exempt: boolean
  minimum_stock: number
  excise_duty_applicable: boolean
  importtax_percent: string
}

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
  page?: number
  search?: string
}