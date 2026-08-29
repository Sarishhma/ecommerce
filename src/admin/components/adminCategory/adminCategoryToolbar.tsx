import {
  Search,
  X,
  FolderTree,
} from "lucide-react";

interface AdminCategoryToolbarProps {
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
}

export const AdminCategoryToolbar = ({
  total,
  search,
  onSearchChange,
}: AdminCategoryToolbarProps) => {
  return (
    <div className="px-6 py-5 border-b border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <div className="flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-gray-500" />

            <h2 className="font-semibold text-gray-900">
              All Categories
            </h2>
          </div>

          <p className="text-xs text-gray-400 mt-1">
            {total}{" "}
            {total === 1 ? "category" : "categories"}
          </p>
        </div>

        <div className="relative w-full lg:w-80">
          <Search
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              w-4
              h-4
              text-gray-400
            "
          />

          <input
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search categories..."
            className="
              w-full
              h-10
              pl-9
              pr-9
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              text-sm
              text-gray-800
              placeholder:text-gray-400
              outline-none
              focus:bg-white
              focus:border-gray-300
              transition
            "
          />

          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="
                absolute
                right-2
                top-1/2
                -translate-y-1/2
                w-7
                h-7
                flex
                items-center
                justify-center
                rounded-lg
                text-gray-400
                hover:bg-gray-200
                hover:text-gray-700
              "
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};