import type { Category } from '@/config/navigation';
import { Link } from 'react-router-dom';


interface MobileMenuProps {
  primaryItems: { name: string; href: string }[];
  categories: Category[];
  onClose: () => void;
}

export const MobileMenu = ({ primaryItems, categories, onClose }: MobileMenuProps) => (
  <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-[#f0ebe5] max-h-[80vh] overflow-y-auto">
    <div className="px-6 py-6 space-y-6">
      <div className="space-y-3">
        {primaryItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="block text-sm font-medium uppercase tracking-[0.15em] text-[#1a1a1a] hover:text-[#b8860b] transition-colors"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="border-t border-[#f0ebe5]" />

      <div className="space-y-4">
        <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40">
          Shop Categories
        </h4>
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <Link
              to={category.href}
              className="block text-sm font-medium text-[#1a1a1a] hover:text-[#b8860b] transition-colors"
              onClick={onClose}
            >
              {category.name}
            </Link>
            {category.subcategories && (
              <div className="pl-4 space-y-1.5">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.name}
                    to={sub.href}
                    className="block text-sm text-[#1a1a1a]/60 hover:text-[#b8860b] transition-colors"
                    onClick={onClose}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-[#f0ebe5]" />
    </div>
  </div>
);