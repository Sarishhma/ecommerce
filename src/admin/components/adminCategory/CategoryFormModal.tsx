import React, { useEffect, useState } from 'react'

import { FolderTree, X } from 'lucide-react'
import type { Category, CreateCategoryPayload } from '@/features/category/types/category.types'


interface CategoryFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: CreateCategoryPayload) => void
  editingCategory: Category | null
  isSubmitting: boolean
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingCategory,
  isSubmitting,
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (editingCategory) {
      setTitle(editingCategory.title)
      setDescription(editingCategory.description || '')
    } else {
      setTitle('')
      setDescription('')
    }
  }, [editingCategory, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ title: title.trim(), description: description.trim() })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-ivory border border-border shadow-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sand pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-terracotta/10 flex items-center justify-center">
              <FolderTree className="h-4 w-4 text-terracotta" />
            </div>
            <h2 className="font-display text-xl text-charcoal">
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone hover:bg-sand/60 hover:text-charcoal transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone mb-1.5">
              Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Clothes"
              className="w-full rounded-xl border border-border bg-white/60 px-4 py-2.5 text-sm text-charcoal outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description..."
              className="w-full rounded-xl border border-border bg-white/60 px-4 py-2.5 text-sm text-charcoal outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-charcoal hover:bg-sand/60 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-terracotta px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-copper transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}