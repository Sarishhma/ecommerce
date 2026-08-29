import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'featured' | 'price-low' | 'price-high';

interface SortControlProps {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

export const SortControl: React.FC<SortControlProps> = ({
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-3.5 h-3.5 text-stone-300" />

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="bg-transparent border-none text-xs font-light text-stone-600 outline-none cursor-pointer py-1 px-1"
      >
        <option value="featured">Featured</option>
        <option value="price-low">Price: Low → High</option>
        <option value="price-high">Price: High → Low</option>
      </select>
    </div>
  );
};