import {
  Layers,
  Search,
  X,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface AdminProductToolbarProps {
  totalProducts: number
  searchInput: string
  onSearchChange: (value: string) => void
  onClearSearch: () => void
}

export const AdminProductToolbar = ({
  totalProducts,
  searchInput,
  onSearchChange,
  onClearSearch,
}: AdminProductToolbarProps) => {
  return (
    <div className="
      flex
      flex-col
      gap-4
      border-b
      border-slate-100
      p-5
      lg:flex-row
      lg:items-center
      lg:justify-between
    ">

      {/* Total */}

      <div className="
        flex
        items-center
        gap-2
        text-sm
        text-slate-500
      ">
        <Layers className="h-4 w-4 text-blue-600" />

        <span className="
          font-semibold
          text-slate-900
        ">
          {totalProducts}
        </span>

        <span>
          total products
        </span>
      </div>


      {/* Search */}

      <div className="
        relative
        w-full
        lg:max-w-md
      ">
        <Search className="
          absolute
          left-3.5
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-slate-400
          pointer-events-none
        " />

        <Input
          value={searchInput}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search products by title or SKU..."
          className="
            h-10
            w-full
            rounded-lg
            border-slate-200
            bg-slate-50/50
            pl-10
            pr-9
            text-sm
            focus-visible:bg-white
            focus-visible:ring-2
            focus-visible:ring-blue-500
          "
        />

        {searchInput && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClearSearch}
            className="
              absolute
              right-1
              top-1/2
              h-8
              w-8
              -translate-y-1/2
              text-slate-400
              hover:text-slate-700
            "
          >
            <X className="h-4 w-4" />

            <span className="sr-only">
              Clear search
            </span>
          </Button>
        )}
      </div>


      {/* Status */}

      <div className="
        flex
        items-center
        justify-end
        gap-2
        text-xs
        font-medium
        text-slate-500
      ">
        <span className="
          h-2.5
          w-2.5
          rounded-full
          bg-emerald-500
          ring-2
          ring-emerald-500/20
        " />

        Catalog Active
      </div>

    </div>
  )
}