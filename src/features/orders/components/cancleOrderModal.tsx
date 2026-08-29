import { XCircle } from "lucide-react";

interface CancelOrderModalProps {
  open: boolean;
  orderId: number | null;
  isCancelling?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const CancelOrderModal = ({
  open,
  orderId,
  isCancelling = false,
  onCancel,
  onConfirm,
}: CancelOrderModalProps) => {
  if (!open || orderId === null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={isCancelling ? undefined : onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-7">

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
          <XCircle className="w-5 h-5 text-amber-600" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900">
          Cancel order?
        </h2>

        {/* Message */}
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Are you sure you want to cancel order{" "}
          <span className="font-medium text-gray-800">
            #{orderId}
          </span>
          ?
        </p>

        <p className="text-xs text-gray-400 mt-2">
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-7">

          {/* Keep Order */}
          <button
            type="button"
            onClick={onCancel}
            disabled={isCancelling}
            className="
              px-4 py-2.5
              rounded-lg
              text-sm font-medium
              text-gray-700
              hover:bg-gray-100
              transition
              disabled:opacity-50
            "
          >
            Keep Order
          </button>

          {/* Confirm Cancel */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={isCancelling}
            className="
              px-4 py-2.5
              rounded-lg
              text-sm font-medium
              text-white
              bg-amber-600
              hover:bg-amber-700
              transition
              disabled:opacity-50
            "
          >
            {isCancelling ? "Cancelling..." : "Cancel Order"}
          </button>

        </div>

      </div>
    </div>
  );
};