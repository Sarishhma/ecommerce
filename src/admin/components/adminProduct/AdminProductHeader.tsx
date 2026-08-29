import { Package, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminProductHeaderProps {
  onAddProduct: () => void
}

export const AdminProductHeader = ({
  onAddProduct,
}: AdminProductHeaderProps) => {
  return (
    <div className="
      flex
      flex-col
      sm:flex-row
      sm:items-end
      sm:justify-between
      gap-4
    ">
      <div>
        <p className="
          text-xs
          uppercase
          tracking-[0.2em]
          text-slate-400
          font-medium
        ">
          Administration
        </p>

        <div className="flex items-center gap-3 mt-1">
          <div className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-blue-600
          ">
            <Package className="h-5 w-5" />
          </div>

          <h1 className="
            text-3xl
            sm:text-4xl
            font-bold
            text-slate-900
          ">
            Products
          </h1>
        </div>

        <p className="text-sm text-slate-500 mt-2">
          Manage inventory, pricing, and stock details.
        </p>
      </div>

      <Button
        onClick={onAddProduct}
        className="
          h-10
          rounded-lg
          bg-blue-600
          px-5
          text-sm
          font-medium
          text-white
          shadow-sm
          hover:bg-blue-700
        "
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Product
      </Button>
    </div>
  )
}