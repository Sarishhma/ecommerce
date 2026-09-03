import React from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Product } from "@/features/product/types/product.types";

interface ProductDeleteDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: number) => void;
  isDeleting?: boolean;
}

export const ProductDeleteDialog: React.FC<ProductDeleteDialogProps> = ({
  product,
  open,
  onOpenChange,
  onConfirm,
  isDeleting = false,
}) => {
  if (!product) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-2xl border border-border bg-ivory p-6 shadow-xl">
        <AlertDialogHeader className="space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 border border-red-100 text-red-500">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <AlertDialogTitle className="font-display text-xl text-charcoal">
            Delete Product
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-stone">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-charcoal">"{product.title}"</span>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 gap-3 sm:gap-3">
          <AlertDialogCancel
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
            className="h-10 rounded-xl border border-border bg-transparent text-charcoal hover:bg-sand/60 transition-colors"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm(product.id);
            }}
            disabled={isDeleting}
            className="h-10 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
