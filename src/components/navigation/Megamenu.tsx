
import type { Category } from '@/config/navigation';
import type { RefObject } from 'react';
import { Link } from 'react-router-dom';


export interface MegaMenuProps {
  activeCategoryData: Category;
  dropdownTimeout: RefObject<ReturnType<typeof setTimeout> | null>;
  onClose: () => void;
  onLeave: () => void;
}

export const MegaMenu = ({
  activeCategoryData,
  dropdownTimeout,
  onClose,
  onLeave,
}: MegaMenuProps) => {
  return (
    <div
      className="absolute left-0 top-full w-full bg-white shadow-xl border-t border-[#f0ebe5] animate-slide-down z-50"
      onMouseEnter={() => {
        if (dropdownTimeout.current) {
          clearTimeout(dropdownTimeout.current);
          dropdownTimeout.current = null;
        }
      }}
      onMouseLeave={onLeave}
    >
      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1 border-r border-[#f0ebe5] pr-6">
            <h3 className="text-xl font-serif text-[#1a1a1a] mb-2">
              {activeCategoryData.name}
            </h3>
            <p className="text-xs text-[#1a1a1a]/60 mb-4">
              Explore our handcrafted collection of authentic {activeCategoryData.name.toLowerCase()}.
            </p>
            <Link
              to={activeCategoryData.href}
              className="inline-flex items-center text-xs font-medium text-[#b8860b] hover:underline uppercase tracking-wider"
              onClick={onClose}
            >
              View All {activeCategoryData.name} →
            </Link>
          </div>

          <div className="col-span-3 grid grid-cols-3 gap-3">
            {activeCategoryData.subcategories?.map((sub) => (
              <Link
                key={sub.name}
                to={sub.href}
                className="px-4 py-3 text-sm text-[#1a1a1a] hover:bg-[#f8f6f4] hover:text-[#b8860b] rounded-md transition-colors duration-150 flex items-center justify-between group"
                onClick={onClose}
              >
                <span>{sub.name}</span>
                <span className="text-[#b8860b] opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};