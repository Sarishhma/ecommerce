import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';

import { getProductImage } from '@/lib/product-image';
import { useGetProducts } from '@/features/product/hook/useProduct';
import { useGetCategories } from '@/features/category/hooks/useCategories';


interface SearchBarProps {
  isHomePage?: boolean;
  isScrolled?: boolean;
  className?: string;
  inputClassName?: string;
  autoFocus?: boolean;
  onClose?: () => void;
}

export const SearchBar = ({
  isHomePage = false,
  isScrolled = false,
  className = '',
  inputClassName = '',
  autoFocus = false,
  onClose,
}: SearchBarProps) => {
  const isTransparent = isHomePage && !isScrolled;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') ?? '');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // 1. Normal text search — matches title/description on the backend
  const { data: textResults, isFetching: isFetchingText } = useGetProducts(
    debouncedQuery ? { search: debouncedQuery } : undefined
  );

  // 2. Check if the query matches a category name
  const { data: categoriesResponse } = useGetCategories();
  const categories = categoriesResponse?.results ?? [];

  const matchedCategory = debouncedQuery
    ? categories.find((c) =>
        c.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : undefined;

  // 3. If it matched a category, pull products from that category too
  const { data: categoryResults, isFetching: isFetchingCategory } = useGetProducts(
    matchedCategory ? { category: matchedCategory.id } : undefined
  );

  const isFetching = isFetchingText || (!!matchedCategory && isFetchingCategory);

  // Merge + dedupe: category matches shown first, then text matches, capped at 6 total
  const suggestions = (() => {
    if (!debouncedQuery) return [];

    const fromCategory = matchedCategory ? categoryResults?.results ?? [] : [];
    const fromText = textResults?.results ?? [];

    const seen = new Set<number>();
    const merged = [...fromCategory, ...fromText].filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });

    return merged.slice(0, 6);
  })();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goToFullResults = () => {
    const trimmed = query.trim();
    if (trimmed) {
      setIsOpen(false);
      onClose?.();
      navigate(`/search?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToFullResults();
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          autoFocus={autoFocus}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="Search crystals, jewelry, collections..."
          className={`w-full py-2 pl-10 pr-4 text-xs font-light tracking-wide rounded-full transition-all duration-300 outline-none ${
            isTransparent
              ? 'bg-white/10 text-white placeholder-white/70 border border-white/20 focus:bg-white/20 focus:border-white/40'
              : 'bg-white text-[#1a1a1a] placeholder-[#1a1a1a]/50 border border-black/10 focus:border-[#b8860b]'
          } ${inputClassName}`}
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute left-3.5 top-1/2 -translate-y-1/2"
        >
          {isFetching ? (
            <Loader2
              className={`w-4 h-4 animate-spin ${isTransparent ? 'text-white/80' : 'text-[#1a1a1a]/50'}`}
            />
          ) : (
            <Search
              className={`w-4 h-4 transition-colors duration-300 ${
                isTransparent ? 'text-white/80' : 'text-[#1a1a1a]/50'
              }`}
            />
          )}
        </button>
      </form>

      {isOpen && debouncedQuery && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden z-50">
          {matchedCategory && (
            <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#b8860b]">
              In {matchedCategory.title}
            </p>
          )}

          {suggestions.length > 0 ? (
            <>
              <ul>
                {suggestions.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setQuery(product.title);
                        onClose?.();
                        navigate(`/product/${product.id}`);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 transition-colors text-left"
                    >
                      <img
                        src={getProductImage(product)}
                        alt={product.title}
                        className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm text-[#1a1a1a] truncate">{product.title}</p>
                        <p className="text-xs text-[#1a1a1a]/50">Rs. {product.price.toFixed(2)}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={goToFullResults}
                className="w-full px-4 py-2.5 text-xs font-medium text-[#b8860b] hover:bg-neutral-50 border-t border-black/5 transition-colors"
              >
                See all results for "{debouncedQuery}"
              </button>
            </>
          ) : !isFetching ? (
            <p className="px-4 py-3 text-sm text-[#1a1a1a]/50">No products found</p>
          ) : (
            <p className="px-4 py-3 text-sm text-[#1a1a1a]/50">Searching...</p>
          )}
        </div>
      )}
    </div>
  );
};