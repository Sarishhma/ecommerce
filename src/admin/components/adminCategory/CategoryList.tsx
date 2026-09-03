import {
  Edit2,
  Trash2,
  FolderTree,
} from "lucide-react";

import type { Category } from "@/features/category/types/category.types";

interface AdminCategoryTableProps {
  categories: Category[];
  isLoading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export const AdminCategoryTable = ({
  categories,
  isLoading,
  onEdit,
  onDelete,
}: AdminCategoryTableProps) => {
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-sm min-w-[650px]">
        <thead>
          <tr className="border-b border-border/60 bg-sand/30">
            <th className="text-left px-6 py-3.5 text-[10px] font-semibold text-stone uppercase tracking-wider">
              Category
            </th>
            <th className="text-left px-6 py-3.5 text-[10px] font-semibold text-stone uppercase tracking-wider">
              Slug
            </th>
            <th className="text-left px-6 py-3.5 text-[10px] font-semibold text-stone uppercase tracking-wider">
              Description
            </th>
            <th className="text-right px-6 py-3.5 text-[10px] font-semibold text-stone uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border/40">
          {isLoading ? (
            <tr>
              <td colSpan={4} className="py-16 text-center">
                <div className="w-8 h-8 border-2 border-sand border-t-terracotta rounded-full animate-spin mx-auto" />
                <p className="text-sm text-stone mt-3">
                  Loading categories...
                </p>
              </td>
            </tr>
          ) : categories.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-16 text-center">
                <FolderTree className="w-10 h-10 text-stone/40 mx-auto" />
                <h3 className="font-display text-lg text-charcoal mt-3">
                  No categories found
                </h3>
                <p className="text-sm text-stone mt-1">
                  Try changing your search criteria.
                </p>
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr
                key={category.id}
                className="hover:bg-sand/20 transition-colors group"
              >
                {/* Category */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sand/40 border border-border/50 flex items-center justify-center text-stone">
                      <FolderTree className="w-4 h-4" />
                    </div>

                    <div>
                      <p className="font-semibold text-charcoal group-hover:text-terracotta transition-colors">
                        {category.title}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-stone mt-0.5">
                        #{category.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Slug */}
                <td className="px-6 py-4">
                  <span className="inline-flex px-2.5 py-1 rounded-lg bg-sand/30 border border-border/50 text-charcoal/80 text-xs font-mono">
                    {category.slug}
                  </span>
                </td>

                {/* Description */}
                <td className="px-6 py-4">
                  <p className="text-sm text-charcoal/80 max-w-md truncate">
                    {category.description || (
                      <span className="text-stone italic text-xs">
                        No description provided
                      </span>
                    )}
                  </p>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(category)}
                      className="p-2 rounded-lg text-stone hover:bg-sand/60 hover:text-charcoal transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDelete(category)}
                      className="p-2 rounded-lg text-stone hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};