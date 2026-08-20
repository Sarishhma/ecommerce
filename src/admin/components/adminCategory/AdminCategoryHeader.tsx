import { FolderTree, Plus } from "lucide-react";

interface AdminCategoryHeaderProps {
  onAdd: () => void;
}

export const AdminCategoryHeader = ({
  onAdd,
}: AdminCategoryHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">
          Administration
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
          Categories
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Manage and organize your product categories.
        </p>
      </div>

      <button
        onClick={onAdd}
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          px-4
          py-2.5
          rounded-xl
          bg-gray-900
          text-white
          text-sm
          font-medium
          hover:bg-gray-800
          transition
        "
      >
        <Plus className="w-4 h-4" />
        Add Category
      </button>
    </div>
  );
};