import {
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";

interface SettingsToastProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export const SettingsToast = ({
  type,
  message,
  onClose,
}: SettingsToastProps) => {
  const isSuccess = type === "success";

  return (
    <div className="fixed top-6 right-6 z-50 w-[calc(100%-3rem)] max-w-sm animate-fade-in">

      <div
        className={`
          flex items-start gap-3 p-4 rounded-2xl
          bg-white/95 backdrop-blur-md
          border shadow-lg
          ${
            isSuccess
              ? "border-emerald-200"
              : "border-red-200"
          }
        `}
      >

        {/* Icon */}
        <div className="shrink-0">

          {isSuccess ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500" />
          )}

        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">

          <p className="font-semibold text-sm text-charcoal">
            {isSuccess
              ? "Changes Saved"
              : "Something went wrong"}
          </p>

          <p className="text-xs text-stone mt-1 leading-relaxed">
            {message}
          </p>

        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="shrink-0 text-stone hover:text-charcoal transition"
        >
          <X className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
