import { SlidersHorizontal } from 'lucide-react'

export const EmptyState = ({ onClear }: { onClear: () => void }) => (
  <div className="text-center py-24">
    <div className="inline-block p-6 rounded-full bg-stone-50 mb-6">
      <SlidersHorizontal className="w-6 h-6 text-stone-300" />
    </div>
    <p className="text-sm text-stone-400 mb-4">No products match your selection</p>
    <button
      onClick={onClear}
      className="px-6 py-2 text-xs tracking-wider text-stone-600 border border-stone-200 rounded-full hover:border-stone-400 hover:text-stone-800 transition-all duration-300"
    >
      Reset Filters
    </button>
  </div>
)