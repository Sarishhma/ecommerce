import { useAddresses } from "../hook/useAccount.hook"

export function AddressesTab() {
  const { data: addresses, isLoading } = useAddresses()

  if (isLoading) {
    return <p className="text-stone text-sm">Loading addresses...</p>
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Saved Addresses</h2>

      <div className="grid grid-cols-1 gap-4">
        {addresses?.map((address) => (
          <div
            key={address.id}
            className={`p-6 border-2 rounded-xl ${
              address.isDefault ? "border-terracotta bg-terracotta/5" : "border-sand"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-charcoal">{address.label}</h3>
              {address.isDefault && (
                <span className="text-xs bg-terracotta text-white px-3 py-1 rounded-full">
                  Default
                </span>
              )}
            </div>
            <p className="text-stone text-sm">{address.street}</p>
            <p className="text-stone text-sm">
              {address.city}, {address.state} {address.zip}
            </p>
            <p className="text-stone text-sm">{address.country}</p>
          </div>
        ))}
      </div>

      <button className="px-8 py-3 border-2 border-terracotta text-terracotta rounded-lg font-medium hover:bg-terracotta hover:text-white transition-colors">
        Add New Address
      </button>
    </div>
  )
}