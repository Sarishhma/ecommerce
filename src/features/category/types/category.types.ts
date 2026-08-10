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
export interface GetCategoriesParams {
  search?: string;
  page?: number;
}
export interface CreateCategoryPayload {
  title: string
  description?: string
}

export interface UpdateCategoryPayload {
  title?: string
  description?: string
}
export type CategoryListResponse = PaginatedResponse<Category>