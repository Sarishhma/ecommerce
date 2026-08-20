import { Search } from "lucide-react";

interface OrderSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const OrderSearch = ({
  value,
  onChange,
  onSearch,
}: OrderSearchProps) => {
  return (
    <div className="bg-[#F8F5F0] rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />

          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            placeholder="Search by order number..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200 rounded-xl text-sm outline-none focus:border-terracotta transition"
          />
        </div>

        <button
          onClick={onSearch}
          className="px-7 py-3.5 bg-[#1A1A1A] text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition"
        >
         Search Order
        </button>
      </div>
    </div>
  );
};