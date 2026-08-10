import { useEffect, useMemo, useState } from 'react'
import { Package, Plus, Search, RefreshCw, Layers, X } from 'lucide-react'

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
import { useUpdateProduct } from '@/features/product/hook/useUpdateProduct'
import { useDeleteProduct } from '@/features/product/hook/useDeleteProduct'

export const AdminProducts = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

  // Debounce search input and reset page to 1 on new query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(searchInput.trim())
      setPage(1)
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchInput])

  const { data, isLoading, isError } = useGetProducts({
    search: searchTerm || undefined,
    page,
  })

  const { mutate: createProduct, isPending: isCreating } = useCreateProduct()
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct()
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct()

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
    setDeletingProduct(product)
  }

  const handleConfirmDelete = (id: number) => {
    deleteProduct(id, {
      onSuccess: () => {
        setDeletingProduct(null)
      },
    })
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  const handleFormSubmit = (payload: CreateProductPayload) => {
    if (editingProduct) {
      updateProduct(
        { id: editingProduct.id, payload },
        {
          onSuccess: () => {
            handleFormClose()
          },
        }
      )
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
      <div className="flex min-h-[80vh] items-center justify-center p-6 bg-white">
        <Card className="w-full max-w-md border-border bg-card text-center shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12 p-6">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400">
              <Package className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Failed to load inventory
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              An error occurred while fetching your records.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="mt-6 gap-2 border-border bg-white text-foreground hover:bg-muted"
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
    <div className="min-h-full w-full bg-white p-6 lg:p-8 space-y-6 text-foreground">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Products Overview
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage inventory, pricing parameters, and stock details
            </p>
          </div>
        </div>

        <Button
          onClick={handleAddProduct}
          className="h-10 rounded-lg bg-blue-500 px-5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Main Table View */}
      <div className="w-full rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 border-b border-border p-4 lg:p-5 bg-white">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Layers className="h-4 w-4 text-primary" />
            <span className="font-semibold text-foreground">
              {data ? data.count : 0}
            </span>
            Total Products
          </div>

          {/* Search Input with Clear Action */}
          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products by title or SKU..."
              className="h-10 w-full rounded-lg border-border bg-white pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
            {searchInput && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSearchInput('')}
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>

          <div className="flex items-center justify-start md:justify-end gap-2 text-xs font-medium text-muted-foreground">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
            Catalog Active
          </div>
        </div>

        {/* Product Table Component */}
        <AdminProductTable
          products={products}
          isLoading={isLoading}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />

        {/* Pagination Footer */}
        {data && data.count > 0 && (
          <div className="border-t border-border bg-white p-4">
            <ProductPagination
              data={data}
              page={page}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <AdminProductForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={editingProduct}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        isSubmitting={isCreating || isUpdating}
      />

      <ProductDeleteDialog
        product={deletingProduct}
        open={!!deletingProduct}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeletingProduct(null)
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}