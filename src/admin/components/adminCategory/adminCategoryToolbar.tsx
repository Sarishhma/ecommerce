import {
  Search,
  X,
} from "lucide-react";

interface AdminCategoryToolbarProps {
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
}

export const AdminCategoryToolbar = ({
  total,
  search,
  onSearchChange,
}: AdminCategoryToolbarProps) => {
  return (
    <div className="px-6 py-5 border-b border-border/60 bg-sand/10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="font-display text-lg text-charcoal">
            All Categories
          </h2>
          <p className="text-xs text-stone mt-0.5">
            Showing {total}{" "}
            {total === 1 ? "category" : "categories"}
          </p>
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search categories..."
            className="w-full h-10 pl-9 pr-9 rounded-xl border border-border bg-white/60 text-sm text-charcoal placeholder:text-stone outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 transition-all"
          />

          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg text-stone hover:bg-sand/60 hover:text-charcoal transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};