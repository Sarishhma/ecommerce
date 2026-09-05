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
    <div className="bg-white rounded-2xl shadow-sm border border-sand/50 p-6">
      <h2 className="font-display text-xl font-semibold text-charcoal mb-6 pb-4 border-b border-sand/50">
        Delivery Information
      </h2>

      <div className="space-y-5">
        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Shipping Address <span className="text-terracotta">*</span>
          </label>
          <textarea
            value={shippingAddress}
            onChange={(e) => onShippingAddressChange(e.target.value)}
            rows={3}
            placeholder="Enter your shipping address"
            className="w-full border border-sand rounded-xl px-4 py-3 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all resize-none bg-ivory/30"
          />
          {user?.address && (
            <p className="text-xs text-stone mt-2 flex items-center gap-1.5">
              <span className="text-terracotta">✓</span>
              Using your saved profile address
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Phone Number <span className="text-terracotta">*</span>
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full border border-sand rounded-xl px-4 py-3 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all bg-ivory/30"
          />
          {user?.phone_number && (
            <p className="text-xs text-stone mt-2 flex items-center gap-1.5">
              <span className="text-terracotta">✓</span>
              Using your saved phone number
            </p>
          )}
        </div>


      </div>
    </div>
  );
};