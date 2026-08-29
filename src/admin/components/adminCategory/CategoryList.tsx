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
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/70">

            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Category
            </th>

            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Slug
            </th>

            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Description
            </th>

            <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>

          {isLoading ? (
            <tr>
              <td
                colSpan={4}
                className="py-16 text-center"
              >
                <div className="w-7 h-7 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto" />

                <p className="text-sm text-gray-400 mt-3">
                  Loading categories...
                </p>
              </td>
            </tr>
          ) : categories.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-16 text-center"
              >
                <FolderTree className="w-9 h-9 text-gray-300 mx-auto" />

                <h3 className="font-semibold text-gray-800 mt-3">
                  No categories found
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Try changing your search.
                </p>
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr
                key={category.id}
                className="
                  border-b
                  border-gray-50
                  last:border-0
                  hover:bg-gray-50/70
                  transition
                "
              >

                {/* Category */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FolderTree className="w-4 h-4 text-gray-500" />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        {category.title}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        #{category.id}
                      </p>
                    </div>

                  </div>

                </td>

                {/* Slug */}

                <td className="px-6 py-5">

                  <span className="
                    inline-flex
                    px-2.5
                    py-1
                    rounded-lg
                    bg-gray-100
                    text-gray-600
                    text-xs
                    font-mono
                  ">
                    {category.slug}
                  </span>

                </td>

                {/* Description */}

                <td className="px-6 py-5">

                  <p className="text-sm text-gray-600 max-w-md truncate">
                    {category.description || (
                      <span className="text-gray-300 italic">
                        No description
                      </span>
                    )}
                  </p>

                </td>

                {/* Actions */}

                <td className="px-6 py-5 text-right">

                  <div className="flex items-center justify-end gap-1">

                    <button
                      onClick={() => onEdit(category)}
                      className="
                        p-2
                        rounded-lg
                        text-gray-500
                        hover:bg-gray-100
                        hover:text-gray-900
                        transition
                      "
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDelete(category)}
                      className="
                        p-2
                        rounded-lg
                        text-gray-500
                        hover:bg-red-50
                        hover:text-red-600
                        transition
                      "
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