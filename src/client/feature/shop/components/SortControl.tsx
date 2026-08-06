import { ArrowUpDown } from 'lucide-react'
import type { SortOption } from '../types/shop.types'

interface SortControlProps {
  sortBy: SortOption
  onChange: (sortBy: SortOption) => void
}

export const SortControl = ({ sortBy, onChange }: SortControlProps) => (
  <div className="flex items-center gap-2">
    <ArrowUpDown className="w-3.5 h-3.5 text-stone-300" />
    <select
      value={sortBy}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="bg-transparent border-none text-xs font-light text-stone-600 outline-none cursor-pointer py-1 px-1"
    >
      <option value="featured">Featured</option>
      <option value="price-low">Price: Low → High</option>
      <option value="price-high">Price: High → Low</option>
      <option value="rating">Highest Rated</option>
    </select>
  </div>
)