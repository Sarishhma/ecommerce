import React from 'react';

interface Category {
  id: number;
  title: string;
}

interface CategoryFilterBarProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-1.5 text-xs tracking-wider transition-all duration-300 whitespace-nowrap ${
          selectedCategory === null
            ? 'text-amber-600 border-b-2 border-amber-600'
            : 'text-stone-400 hover:text-stone-600 border-b-2 border-transparent hover:border-stone-300'
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-1.5 text-xs tracking-wider transition-all duration-300 whitespace-nowrap ${
            selectedCategory === category.id
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-stone-400 hover:text-stone-600 border-b-2 border-transparent hover:border-stone-300'
          }`}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
};