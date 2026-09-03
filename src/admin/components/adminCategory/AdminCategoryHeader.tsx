import { Plus } from "lucide-react";

interface AdminCategoryHeaderProps {
  onAdd: () => void;
}

export const AdminCategoryHeader = ({
  onAdd,
}: AdminCategoryHeaderProps) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-stone font-semibold mb-1">
          Management
        </p>
        <h1 className="text-3xl font-display text-charcoal">Categories</h1>
      </div>
      <button
        onClick={onAdd}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-terracotta text-ivory text-sm font-semibold hover:bg-copper transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Add Category
      </button>
    </div>
  );
};