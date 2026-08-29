import type { User } from "@/auth/types/auth.types";


interface DeliveryInformationProps {
  user: User | null;
  shippingAddress: string;
  phoneNumber: string;
  onShippingAddressChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
}

export const DeliveryInformation = ({
  user,
  shippingAddress,
  phoneNumber,
  onShippingAddressChange,
  onPhoneNumberChange,
}: DeliveryInformationProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sand/50 p-6 lg:p-8">

      <h2 className="text-xl font-semibold text-charcoal mb-6">
        Delivery Information
      </h2>

      <div className="space-y-6">

        {/* ADDRESS */}
        <div>
          <label
            htmlFor="shippingAddress"
            className="block text-sm font-medium text-charcoal mb-2"
          >
            Shipping Address
          </label>

          <textarea
            id="shippingAddress"
            value={shippingAddress}
            onChange={(e) =>
              onShippingAddressChange(e.target.value)
            }
            rows={4}
            placeholder="Enter your shipping address"
            className="w-full border border-sand rounded-lg px-4 py-3 text-sm outline-none focus:border-terracotta resize-none transition-colors"
          />
        </div>

        {/* PHONE */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-charcoal mb-2"
          >
            Phone Number
          </label>

          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) =>
              onPhoneNumberChange(e.target.value)
            }
            placeholder="Enter your phone number"
            className="w-full border border-sand rounded-lg px-4 py-3 text-sm outline-none focus:border-terracotta transition-colors"
          />
        </div>

        {/* SAVED INFO */}
        {user?.address && (
          <p className="text-xs text-stone">
            Your saved profile address has been added
            automatically. You can change it for this
            order.
          </p>
        )}

      </div>
    </div>
  );
};