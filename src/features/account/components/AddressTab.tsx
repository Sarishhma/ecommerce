import { MapPin, Plus } from "lucide-react";
import { useAppSelector } from "@/redux";
import { selectUser } from "@/redux/slices/authSlice";

export const AddressesTab = () => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-charcoal">
            My Addresses
          </h2>
          <p className="text-gray-500 mt-1">
            Manage your delivery addresses
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 bg-terracotta text-white rounded-lg font-medium hover:bg-opacity-90 transition"
        >
          <Plus className="w-5 h-5" />
          Add Address
        </button>
      </div>

      {/* Default Address */}
      <div className="border border-sand rounded-xl p-6 relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-sand/30 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-terracotta" />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-charcoal">
                  Default Address
                </h3>

                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                  Default
                </span>
              </div>

              <p className="text-gray-600">
                {user.address || "No address added yet"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add another address UI */}
      <div className="mt-6 border-2 border-dashed border-sand rounded-xl p-8 text-center">
        <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-3" />

        <h3 className="font-semibold text-charcoal mb-1">
          Add another address
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          Save another address for faster checkout.
        </p>

        <button
          type="button"
          className="px-5 py-2.5 border border-terracotta text-terracotta rounded-lg font-medium hover:bg-terracotta hover:text-white transition"
        >
          Add New Address
        </button>
      </div>
    </div>
  );
};