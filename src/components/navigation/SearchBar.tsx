import { Search } from 'lucide-react';

interface SearchBarProps {
  isHomePage?: boolean;
  isScrolled?: boolean;
}

export const SearchBar = ({ isHomePage = false, isScrolled = false }: SearchBarProps) => {
  const isTransparent = isHomePage && !isScrolled;

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search crystals, jewelry, collections..."
        className={`w-full py-2 pl-10 pr-4 text-xs font-light tracking-wide rounded-full transition-all duration-300 outline-none ${
          isTransparent
            ? 'bg-white/10 text-white placeholder-white/70 border border-white/20 focus:bg-white/20 focus:border-white/40'
            : 'bg-white text-[#1a1a1a] placeholder-[#1a1a1a]/50 border border-black/10 focus:border-[#b8860b]'
        }`}
      />
      <Search
        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
          isTransparent ? 'text-white/80' : 'text-[#1a1a1a]/50'
        }`}
      />
    </div>
  );
};