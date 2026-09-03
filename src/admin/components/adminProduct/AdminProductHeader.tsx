import { Package, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminProductHeaderProps {
  onAddProduct: () => void
}

export const AdminProductHeader = ({
  onAddProduct,
}: AdminProductHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-stone font-semibold mb-1">
          Administration
        </p>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta border border-terracotta/20">
            <Package className="h-5 w-5" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-display text-charcoal tracking-wide">
            Products
          </h1>
        </div>

        <p className="text-sm text-stone mt-2">
          Manage inventory, pricing, and stock details.
        </p>
      </div>

      <Button
        onClick={onAddProduct}
        className="h-10 rounded-xl bg-terracotta px-5 text-sm font-medium text-ivory shadow-md shadow-terracotta/20 hover:bg-copper transition-colors border-none"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Product
      </Button>
    </div>
  )
}