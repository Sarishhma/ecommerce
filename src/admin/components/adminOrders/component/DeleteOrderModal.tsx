import { Trash2 } from "lucide-react";

interface DeleteOrderModalProps {
  open: boolean;
  orderId: number | null;
  isDeleting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteOrderModal = ({
  open,
  orderId,
  isDeleting = false,
  onCancel,
  onConfirm,
}: DeleteOrderModalProps) => {
  if (!open || orderId === null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-sm rounded-2xl bg-ivory border border-border shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-500" />
          </div>
          <h2 className="font-display text-xl text-charcoal">Delete order?</h2>
        </div>

        <p className="text-sm text-stone leading-relaxed">
          Are you sure you want to permanently delete order{" "}
          <span className="font-semibold text-charcoal">#{orderId}</span>? This
          action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-charcoal border border-border hover:bg-sand/60 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Order"}
          </button>
        </div>
      </div>
    </div>
  );
};
