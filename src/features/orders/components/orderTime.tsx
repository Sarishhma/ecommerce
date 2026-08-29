import {
  CheckCircle,
  Clock,
  Package,
  Truck,
} from "lucide-react";

import type { OrderStatus } from "../types/order.types";

interface OrderTimelineProps {
  status: OrderStatus;
}

const steps = [
  {
    key: "pending",
    label: "Order Placed",
    icon: Clock,
  },
  {
    key: "confirmed",
    label: "Confirmed",
    icon: CheckCircle,
  },
  {
    key: "processing",
    label: "Processing",
    icon: Package,
  },
  {
    key: "shipped",
    label: "Shipped",
    icon: Truck,
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: CheckCircle,
  },
] as const;

const statusOrder: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

export const OrderTimeline = ({
  status,
}: OrderTimelineProps) => {
  if (status === "cancelled") {
    return (
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 font-bold">!</span>
          </div>

          <div>
            <h3 className="font-semibold text-red-800">
              Order Cancelled
            </h3>

            <p className="text-sm text-red-600 mt-1">
              This order is no longer being processed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentIndex = statusOrder.indexOf(status);

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-charcoal mb-8">
        Order Progress
      </h3>

      <div className="relative">
        {steps.map((step, index) => {
          const stepIndex = statusOrder.indexOf(step.key);

          const completed = stepIndex <= currentIndex;
          const current = stepIndex === currentIndex;

          const Icon = step.icon;

          return (
            <div
              key={step.key}
              className="relative flex items-start gap-4"
            >
              {/* Vertical line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-5 top-10 w-0.5 h-12 ${
                    stepIndex < currentIndex
                      ? "bg-charcoal"
                      : "bg-stone-200"
                  }`}
                />
              )}

              <div
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  completed
                    ? "bg-charcoal text-white"
                    : "bg-stone-100 text-stone-400"
                } ${
                  current
                    ? "ring-4 ring-stone-100"
                    : ""
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="pb-8">
                <h4
                  className={`font-medium ${
                    completed
                      ? "text-charcoal"
                      : "text-stone-400"
                  }`}
                >
                  {step.label}
                </h4>

                <p className="text-xs text-stone-400 mt-1">
                  {current
                    ? "Current status"
                    : completed
                    ? "Completed"
                    : "Upcoming"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};