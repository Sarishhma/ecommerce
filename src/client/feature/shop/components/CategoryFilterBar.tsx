interface CategoryFilterBarProps {
  categories: readonly string[]
  selectedCategory: string | null
  onSelect: (category: string | null) => void
}

export const CategoryFilterBar = ({ categories, selectedCategory, onSelect }: CategoryFilterBarProps) => (
  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1">
    <button
      onClick={() => onSelect(null)}
      className={`px-4 py-1.5 text-xs tracking-wider transition-all duration-300 whitespace-nowrap ${
        selectedCategory === null
          ? 'text-amber-600 border-b-2 border-amber-600'
          : 'text-stone-400 hover:text-stone-600 border-b-2 border-transparent hover:border-stone-300'
      }`}
    >
      All
    </button>
    {categories
      .filter((c) => c !== 'All')
      .map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-1.5 text-xs tracking-wider transition-all duration-300 whitespace-nowrap ${
            selectedCategory === category
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-stone-400 hover:text-stone-600 border-b-2 border-transparent hover:border-stone-300'
          }`}
        >
          {category}
        </button>
      ))}
  </div>
)