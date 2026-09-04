import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import type { Category } from "@/features/category/types/category.types";

interface MegaMenuProps {
  activeCategoryData: Category;
  dropdownTimeout: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
  onClose: () => void;
  onLeave: () => void;
}

export const MegaMenu = ({
  activeCategoryData,
  dropdownTimeout,
  onClose,
  onLeave,
}: MegaMenuProps) => {
  const category = activeCategoryData;

  return (
    <div
      className="absolute left-0 right-0 top-full z-50 bg-white border-t border-gray-100 shadow-xl"
      onMouseEnter={() => {
        if (dropdownTimeout.current) {
          clearTimeout(dropdownTimeout.current);
        }
      }}
      onMouseLeave={onLeave}
    >
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              {category.title}
            </h2>

            {category.description && (
              <p className="mt-2 max-w-2xl text-sm text-gray-500">
                {category.description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Category content */}
        <div className="border-t border-gray-100 pt-6">
          <Link
            to={`/shop?category=${category.id}`}
            onClick={onClose}
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] transition hover:text-[#8b6f47]"
          >
            View all {category.title}

            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

      </div>
    </div>
  );
};
