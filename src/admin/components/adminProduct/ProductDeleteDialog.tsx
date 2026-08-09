import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Product } from '@/features/product'

interface ProductDeleteDialogProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ProductDeleteDialog = ({
  product,
  open,
  onOpenChange,
}: ProductDeleteDialogProps) => {
  const handleDelete = () => {
    if (!product) return
    console.log('Delete product:', product.id)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] rounded-xl border-border/50 bg-card p-6 shadow-2xl">
        <DialogHeader className="space-y-3 text-left">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-8 ring-destructive/5">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div>
            <DialogTitle className="text-lg font-bold text-foreground">
              Delete Product?
            </DialogTitle>

            <DialogDescription className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to remove{' '}
              <span className="font-semibold text-foreground">
                "{product?.title}"
              </span>{' '}
              from your catalog? This action can't be undone.
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-4 gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl h-9 text-sm flex-1"
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            className="rounded-xl h-9 text-sm flex-1 shadow-sm"
          >
            Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}