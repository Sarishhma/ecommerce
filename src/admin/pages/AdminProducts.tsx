import { useEffect, useMemo, useState } from 'react'
import { Package, RefreshCw } from 'lucide-react'

import {
  Card,
  CardContent,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

import type {
  Product,
  CreateProductPayload,
} from '@/features/product/types/product.types'

import { useGetProducts } from '@/features/product/hook/useProduct'
import { useCreateProduct } from '@/features/product/hook/useCreateProduct'
import { useUpdateProduct } from '@/features/product/hook/useUpdateProduct'
import { useDeleteProduct } from '@/features/product/hook/useDeleteProduct'

import { useGetCategories } from '@/features/category/hooks/useCategories'

import { AdminProductHeader } from '../components/adminProduct/AdminProductHeader'
import { AdminProductToolbar } from '../components/adminProduct/AdminProductToolbar'
import { AdminProductTable } from '../components/adminProduct/AdminProductTable'

import { AdminProductForm } from '../components/adminProduct/AdminProductForm'
import { ProductDeleteDialog } from '../components/adminProduct/ProductDeleteDialog'
import { ProductPagination } from '../components/adminProduct/ProductPagination'


export const AdminProducts = () => {

  /* ===============================
     STATE
  =============================== */

  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  const [isFormOpen, setIsFormOpen] =
    useState(false)

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null)

  const [deletingProduct, setDeletingProduct] =
    useState<Product | null>(null)


  /* ===============================
     SEARCH
  =============================== */

  useEffect(() => {

    const timeout = setTimeout(() => {

      setSearchTerm(
        searchInput.trim()
      )

      setPage(1)

    }, 300)

    return () => clearTimeout(timeout)

  }, [searchInput])


  /* ===============================
     PRODUCTS
  =============================== */

  const {
    data,
    isLoading,
    isError,
  } = useGetProducts({
    search: searchTerm || undefined,
    page,
  })


  const products = useMemo(
    () => data?.results ?? [],
    [data]
  )


  /* ===============================
     CATEGORIES
  =============================== */

  const {
    data: categoryData,
  } = useGetCategories({
    page: 1,
  })

  const categories =
    categoryData?.results ?? []


  /* ===============================
     MUTATIONS
  =============================== */

  const {
    mutate: createProduct,
    isPending: isCreating,
  } = useCreateProduct()

  const {
    mutate: updateProduct,
    isPending: isUpdating,
  } = useUpdateProduct()

  const {
    mutate: deleteProduct,
    isPending: isDeleting,
  } = useDeleteProduct()


  /* ===============================
     HANDLERS
  =============================== */

  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsFormOpen(true)
  }


  const handleEditProduct = (
    product: Product
  ) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }


  const handleDeleteProduct = (
    product: Product
  ) => {
    setDeletingProduct(product)
  }


  const handleConfirmDelete = (
    id: number
  ) => {

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


  const handleFormSubmit = (
    payload: CreateProductPayload
  ) => {

    if (editingProduct) {

      updateProduct(
        {
          id: editingProduct.id,
          payload,
        },
        {
          onSuccess: handleFormClose,
        }
      )

    } else {

      createProduct(
        payload,
        {
          onSuccess: handleFormClose,
        }
      )

    }
  }


  /* ===============================
     ERROR
  =============================== */

  if (isError) {

    return (
      <div className="p-6 lg:p-8">

        <div className="
          flex
          min-h-[60vh]
          items-center
          justify-center
        ">

          <Card className="
            w-full
            max-w-md
            border-slate-200
            bg-white
            text-center
          ">

            <CardContent className="
              flex
              flex-col
              items-center
              justify-center
              p-8
            ">

              <div className="
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-red-50
                text-red-500
              ">
                <Package className="h-7 w-7" />
              </div>

              <h2 className="
                text-lg
                font-semibold
                text-slate-900
              ">
                Unable to load products
              </h2>

              <p className="
                mt-1
                text-sm
                text-slate-500
              ">
                Something went wrong while
                loading the product catalog.
              </p>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-6 gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reload Products
              </Button>

            </CardContent>

          </Card>

        </div>

      </div>
    )
  }


  /* ===============================
     PAGE
  =============================== */

  return (
    <div className="
      min-h-full
      bg-white
      
      space-y-8
    ">

      {/* Header */}

      <AdminProductHeader
        onAddProduct={handleAddProduct}
      />


      {/* Main Card */}

      <div className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      ">

        {/* Toolbar */}

        <AdminProductToolbar
          totalProducts={data?.count ?? 0}
          searchInput={searchInput}
          onSearchChange={setSearchInput}
          onClearSearch={() =>
            setSearchInput('')
          }
        />


        {/* Table */}

        <AdminProductTable
          products={products}
          isLoading={isLoading}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />


        {/* Pagination */}

        {data && data.count > 0 && (
          <div className="
            border-t
            border-slate-100
            bg-slate-50/50
            p-4
          ">
            <ProductPagination
              data={data}
              page={page}
              onPageChange={setPage}
            />
          </div>
        )}

      </div>


      {/* Product Form */}

      <AdminProductForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={editingProduct}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        isSubmitting={
          isCreating || isUpdating
        }
        categories={categories}
      />


      {/* Delete Dialog */}

      <ProductDeleteDialog
        product={deletingProduct}
        open={!!deletingProduct}
        onOpenChange={(open) => {

          if (!open && !isDeleting) {
            setDeletingProduct(null)
          }

        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

    </div>
  )
}