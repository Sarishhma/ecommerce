export interface Category {
  id: number
  title: string
  slug: string
  description: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type CategoryListResponse = PaginatedResponse<Category>