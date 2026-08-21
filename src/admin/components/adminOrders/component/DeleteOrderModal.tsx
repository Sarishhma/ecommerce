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
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-7">

        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5">
          <Trash2 className="w-5 h-5 text-red-500" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900">
          Delete order?
        </h2>

        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Are you sure you want to permanently delete order{" "}
          <span className="font-medium text-gray-800">
            #{orderId}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-7">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="
              px-4 py-2.5
              rounded-lg
              text-sm font-medium
              text-gray-700
              hover:bg-gray-100
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="
              px-4 py-2.5
              rounded-lg
              text-sm font-medium
              text-white
              bg-red-600
              hover:bg-red-700
              transition
              disabled:opacity-50
            "
          >
            {isDeleting ? "Deleting..." : "Delete Order"}
          </button>
        </div>

      </div>
    </div>
  );
};