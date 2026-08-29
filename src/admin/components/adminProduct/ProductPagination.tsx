import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ProductListResponse } from '@/features/product/types/product.types'

interface ProductPaginationProps {
  data: ProductListResponse
  page: number
  onPageChange: (page: number) => void
}

export const ProductPagination = ({
  data,
  page,
  onPageChange,
}: ProductPaginationProps) => {
  return (
    <div className="flex items-center justify-center border-t border-border/40 px-6 py-3.5">
  

      <div className="flex items-center justify-center gap-1">
        <Button
          variant="outline"
          size="sm"
          aria-label="Previous page"
          className="h-8 w-8 rounded-lg p-0 disabled:opacity-40"
          disabled={!data.previous}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>

        <span className="min-w-[3rem] text-center text-xs font-medium tabular-nums text-foreground">
          Page {page} 
        </span>

        <Button
          variant="outline"
          size="sm"
          aria-label="Next page"
          className="h-8 w-8 rounded-lg p-0 disabled:opacity-40"
          disabled={!data.next}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}