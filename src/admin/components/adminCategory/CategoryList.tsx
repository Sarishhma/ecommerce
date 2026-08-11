import { useGetCategories } from '@/features/category/hooks/useCategories'
import React, { useState } from 'react'

export const CategoryList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, error } = useGetCategories({
    search: searchTerm,
    page,
  })

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {/* Search Input Bar */}
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setPage(1) // Reset to first page on search
          }}
          className="w-full max-w-xs border border-slate-200 px-3 py-2 text-sm rounded-md bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
        />
        {data && (
          <span className="text-xs text-slate-500 font-medium">
            Total: {data.count}
          </span>
        )}
      </div>

      {/* Table State Handling */}
      {isLoading ? (
        <div className="p-8 text-center text-sm text-slate-500">
          Loading categories...
        </div>
      ) : isError ? (
        <div className="p-4 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
          Failed to load categories: {(error as Error).message}
        </div>
      ) : data?.results.length === 0 ? (
        <div className="p-8 text-center text-sm text-slate-500 border border-slate-200 rounded-md">
          No categories found.
        </div>
      ) : (
        /* Categories Table */
        <div className="overflow-hidden border border-slate-200 rounded-md shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 uppercase tracking-wider text-[11px] font-bold text-slate-500">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {data?.results.map((category) => (
                <tr key={category.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* ID: Muted, tabular numbers for alignment */}
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs tabular-nums select-all">
                    #{category.id}
                  </td>
                  
                  {/* Title: Emphasized, crisp dark text */}
                  <td className="px-4 py-3 font-semibold text-slate-900 tracking-tight">
                    {category.title}
                  </td>
                  
                  {/* Slug: Rendered as a clean inline code badge */}
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 font-mono text-[11px] font-medium bg-slate-100 text-slate-600 rounded border border-slate-200/60">
                      {category.slug}
                    </span>
                  </td>
                  
                  {/* Description: Truncated to single line if too long, muted color */}
                  <td className="px-4 py-3 text-slate-500 max-w-xs truncate text-xs leading-relaxed">
                    {category.description || <span className="text-slate-300 italic">No description</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}