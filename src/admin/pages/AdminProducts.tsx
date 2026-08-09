import { useEffect, useMemo, useState } from 'react'
import { Package, Plus, Search, RefreshCw, Layers } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import type { Product, CreateProductPayload } from '@/features/product/types/product.types'
import { useGetProducts } from '@/features/product/hook/useProduct'

import { ProductDeleteDialog } from '../components/adminProduct/ProductDeleteDialog'
import { AdminProductForm } from '../components/adminProduct/AdminProductForm'
import { AdminProductTable } from '../components/adminProduct/AdminProductTable'
import { ProductPagination } from '../components/adminProduct/ProductPagination'
import { useCreateProduct } from '@/features/product/hook/useCreateProduct'

export const AdminProducts = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(searchInput)
      setPage(1)
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchInput])

  const { data, isLoading, isError } = useGetProducts({
    search: searchTerm || undefined,
    page,
  })

  // Hook instantiation
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct()

  const products = useMemo(() => data?.results ?? [], [data])

  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsFormOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleDeleteProduct = (product: Product) => {
    setDeleteProduct(product)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  const handleFormSubmit = (payload: CreateProductPayload) => {
    if (editingProduct) {
      // Execute update mutation here when implemented
    } else {
      createProduct(payload, {
        onSuccess: () => {
          handleFormClose()
        },
      })
    }
  }

  if (isError) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-6 bg-[#FAF7F2]">
        <Card className="w-full max-w-md border-[#E6D5C3] bg-[#FFFDF9] text-center shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12 p-6">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100/60 text-[#5C3D2E] ring-1 ring-[#D8C4B6]">
              <Package className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-semibold text-[#3C2A21]">
              Failed to load inventory
            </h2>
            <p className="mt-1 text-sm text-[#7F6656]">
              An error occurred while fetching your records.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="mt-6 gap-2 border-[#D8C4B6] bg-white text-[#5C3D2E] hover:bg-[#F5EBE0]"
            >
              <RefreshCw className="h-4 w-4" />
              Reload Catalog
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-full w-full bg-[#FAF7F2] p-6 lg:p-8 space-y-6 text-[#3C2A21]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E6D5C3] pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5C3D2E]/10 text-[#5C3D2E] ring-1 ring-[#5C3D2E]/20">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#2A1810]">
              Products Overview
            </h1>
            <p className="text-sm text-[#7F6656]">
              Manage inventory, pricing parameters, and stock details
            </p>
          </div>
        </div>

        <Button
          onClick={handleAddProduct}
          className="h-10 rounded-lg bg-[#5C3D2E] px-5 text-sm font-medium text-[#FFFDF9] shadow-sm hover:bg-[#422A1D]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="w-full rounded-xl border border-[#E6D5C3] bg-[#FFFDF9] shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 border-b border-[#E6D5C3] p-4 lg:p-5 bg-[#F5EBE0]/40">
          <div className="flex items-center gap-2 text-sm text-[#7F6656]">
            <Layers className="h-4 w-4 text-[#5C3D2E]" />
            <span className="font-semibold text-[#2A1810]">
              {data ? data.count : 0}
            </span> 
            Total Products
          </div>

          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A89280]" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products by title or SKU..."
              className="h-10 w-full rounded-lg border-[#D8C4B6] bg-white pl-10 pr-4 text-sm text-[#2A1810] placeholder:text-[#A89280] focus-visible:ring-2 focus-visible:ring-[#5C3D2E]"
            />
          </div>

          <div className="flex items-center justify-start md:justify-end gap-2 text-xs font-medium text-[#7F6656]">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#5C3D2E] ring-2 ring-[#D8C4B6]" />
            Catalog Active
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <AdminProductTable
            products={products}
            isLoading={isLoading}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </div>

        {data && data.count > 0 && (
          <div className="border-t border-[#E6D5C3] bg-[#F5EBE0]/30 p-4">
            <ProductPagination
              data={data}
              page={page}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      <AdminProductForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={editingProduct}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        isSubmitting={isCreating}
      />

      <ProductDeleteDialog
        product={deleteProduct}
        open={!!deleteProduct}
        onOpenChange={(open) => {
          if (!open) setDeleteProduct(null)
        }}
      />
    </div>
  )
}