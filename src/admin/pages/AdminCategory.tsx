import React, { useState } from 'react'
import { FolderTree, Plus, Edit2, Trash2, Search, X, RefreshCw } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import {
  useGetCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '@/features/category/hooks/useCategories'
import { CategoryFormModal } from '../components/adminCategory/CategoryFormModal'
import { CategoryDeleteDialog } from '../components/adminCategory/CategoryDeleteDialogue'
import type { Category, CreateCategoryPayload } from '@/features/category/types/category.types'

export const AdminCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)

  const { data, isLoading, isError } = useGetCategories({ search: searchTerm, page })
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory()
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory()
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory()

  const handleOpenAdd = () => {
    setEditingCategory(null)
    setIsFormOpen(true)
  }

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category)
    setIsFormOpen(true)
  }

  const handleFormSubmit = (payload: CreateCategoryPayload) => {
    if (editingCategory) {
      updateCategory(
        { id: editingCategory.id, payload },
        {
          onSuccess: () => {
            setIsFormOpen(false)
            setEditingCategory(null)
          },
        }
      )
    } else {
      createCategory(payload, {
        onSuccess: () => {
          setIsFormOpen(false)
        },
      })
    }
  }

  const handleConfirmDelete = (id: number) => {
    deleteCategory(id, {
      onSuccess: () => setDeletingCategory(null),
    })
  }

  if (isError) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-6 bg-white">
        <Card className="w-full max-w-md border-slate-200 bg-white text-center shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12 p-6">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20">
              <FolderTree className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">
              Failed to load categories
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              An error occurred while fetching category records.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="mt-6 gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" />
              Reload Categories
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-full w-full bg-white p-6 lg:p-8 space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
            <FolderTree className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Categories
            </h1>
            <p className="text-sm text-slate-500">
              Manage item classifications, hierarchies, and taxonomy rules
            </p>
          </div>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Main Table View */}
      <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 border-b border-slate-200 p-4 lg:p-5 bg-white">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FolderTree className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-slate-900">
              {data ? data.count : 0}
            </span>
            Total Categories
          </div>

          {/* Search Input with Clear Action */}
          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <Input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              placeholder="Search category title or slug..."
              className="h-10 w-full rounded-lg border-slate-200 bg-white pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500"
            />
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSearchTerm('')}
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>

          <div className="flex items-center justify-start md:justify-end gap-2 text-xs font-medium text-slate-500">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
            Taxonomy Active
          </div>
        </div>

        {/* Category Table Component */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
              <tr>
                <th className="py-3 pl-4 text-xs uppercase tracking-wider text-slate-700 w-20">ID</th>
                <th className="py-3 text-xs uppercase tracking-wider text-slate-700">Title</th>
                <th className="py-3 text-xs uppercase tracking-wider text-slate-700">Slug</th>
                <th className="py-3 text-xs uppercase tracking-wider text-slate-700">Description</th>
                <th className="py-3 pr-4 text-right text-xs uppercase tracking-wider text-slate-700 w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">Loading categories...</td>
                </tr>
              ) : data?.results.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">No categories found.</td>
                </tr>
              ) : (
                data?.results.map((category) => (
                  <tr key={category.id} className="group transition-colors hover:bg-slate-50/80">
                    <td className="pl-4 py-3 font-mono text-xs text-slate-400">{category.id}</td>
                    <td className="py-3 font-medium text-slate-900">{category.title}</td>
                    <td className="py-3 font-mono text-xs text-slate-500">{category.slug}</td>
                    <td className="py-3 text-slate-600 max-w-xs truncate">{category.description || '-'}</td>
                    <td className="pr-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(category)}
                          className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-slate-100"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit category</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletingCategory(category)}
                          className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete category</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CategoryFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editingCategory={editingCategory}
        isSubmitting={isCreating || isUpdating}
      />

      <CategoryDeleteDialog
        category={deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}