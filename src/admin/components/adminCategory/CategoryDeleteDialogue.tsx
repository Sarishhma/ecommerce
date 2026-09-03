import React from 'react'

import { AlertTriangle } from 'lucide-react'
import type { Category } from '@/features/category/types/category.types'

interface CategoryDeleteDialogProps {
  category: Category | null
  onClose: () => void
  onConfirm: (id: number) => void
  isDeleting: boolean
}

export const CategoryDeleteDialog: React.FC<CategoryDeleteDialogProps> = ({
  category,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  if (!category) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-ivory border border-border shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 border border-amber-100">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="font-display text-xl text-charcoal">
            Delete Category
          </h3>
        </div>

        <p className="text-sm text-stone">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-charcoal">"{category.title}"</span>?
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-charcoal hover:bg-sand/60 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => onConfirm(category.id)}
            className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors shadow-sm disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}