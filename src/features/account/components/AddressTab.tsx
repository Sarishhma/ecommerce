import { MapPin, Plus, Check, Edit2, History } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "@/redux";
import { selectUser } from "@/redux/slices/authSlice";
import { useUpdateProfile } from "../hook/useAccount.hook";
import { getUserId } from "@/auth/services/auth.service";

export const AddressesTab = () => {
  const user = useAppSelector(selectUser);

  const userId = getUserId(user);
  const { mutate, isPending } = useUpdateProfile(userId);

  // Current active address
  const [currentAddress, setCurrentAddress] = useState(user?.address || "");

  // Frontend state to track recently entered addresses locally
  const [recentAddresses, setRecentAddresses] = useState<string[]>(() => {
    return user?.address ? [user.address] : [];
  });

  // UI state for adding/selecting new address
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [inputAddress, setInputAddress] = useState("");

  if (!user) {
    return null;
  }

  // Handle selecting an address and submitting to profile hook
  const handleSelectAndUpdate = (targetAddress: string) => {
    if (!targetAddress.trim()) return;

    mutate(
      { address: targetAddress },
      {
        onSuccess: () => {
          setCurrentAddress(targetAddress);
          
          // Store locally if it's a new unique address
          if (!recentAddresses.includes(targetAddress)) {
            setRecentAddresses((prev) => [targetAddress, ...prev]);
          }

          setIsFormOpen(false);
          setInputAddress("");
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-charcoal">My Addresses</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and update your active delivery address
          </p>
        </div>

      </div>

      {/* Active Default Address Card */}
      <div className="border border-sand bg-white rounded-xl p-6 shadow-sm relative">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-sand/30 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-terracotta" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-charcoal">Active Delivery Address</h3>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-700">
                  Current
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setInputAddress(currentAddress);
                  setIsFormOpen(true);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-terracotta hover:underline"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Change
              </button>
            </div>

            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              {currentAddress || (
                <span className="italic text-gray-400">
                  No address saved yet. Click below to add one.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Add / Select Address Input Panel */}
      {isFormOpen ? (
        <div className="border-2 border-terracotta/30 bg-sand/10 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-charcoal text-sm">
            Enter New Address
          </h3>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
              placeholder="Enter full street address, city, zip..."
              className="flex-1 border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:border-terracotta bg-white"
              autoFocus
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleSelectAndUpdate(inputAddress)}
                disabled={isPending || !inputAddress.trim()}
                className="px-5 py-2.5 bg-terracotta text-white text-sm font-medium rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition shrink-0"
              >
                {isPending ? "Updating..." : "Set as Active"}
              </button>

              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Quick Select from Recent Entries */}
          {recentAddresses.length > 0 && (
            <div className="pt-2">
              <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                <History className="w-3.5 h-3.5" /> Select from recent entries:
              </p>
              <div className="space-y-2">
                {recentAddresses.map((addr, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectAndUpdate(addr)}
                    disabled={isPending}
                    className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition ${
                      currentAddress === addr
                        ? "border-terracotta bg-terracotta/5 font-medium text-charcoal"
                        : "border-gray-200 bg-white hover:border-terracotta/50 text-gray-600"
                    }`}
                  >
                    <span className="truncate pr-2">{addr}</span>
                    {currentAddress === addr && (
                      <Check className="w-4 h-4 text-terracotta shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Dotted "Add New Address" Trigger Box */
        <div className="border-2 border-dashed border-sand rounded-xl p-8 text-center bg-white/50 hover:bg-white transition">
          <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-3" />

          <h3 className="font-semibold text-charcoal mb-1">
            Add or Switch Address
          </h3>

          <p className="text-xs text-gray-500 mb-4">
            Type a new delivery address or choose a recently used one.
          </p>

          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="px-5 py-2.5 border border-terracotta text-terracotta rounded-lg text-sm font-medium hover:bg-terracotta hover:text-white transition inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Address
          </button>
        </div>
      )}
    </div>
  );
};