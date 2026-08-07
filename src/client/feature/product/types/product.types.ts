
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