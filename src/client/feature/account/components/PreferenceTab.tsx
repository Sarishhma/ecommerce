import { useState, useEffect } from "react"

import type { UserPreferences } from "../types/account.types"
import { usePreferences, useUpdatePreferences } from "../hook/useAccount.hook"

export function PreferencesTab() {
  const { data: preferences, isLoading } = usePreferences()
  const { mutate, isPending } = useUpdatePreferences()
  const [localPrefs, setLocalPrefs] = useState<UserPreferences | null>(null)

  useEffect(() => {
    if (preferences) setLocalPrefs(preferences)
  }, [preferences])

  if (isLoading || !localPrefs) {
    return <p className="text-stone text-sm">Loading preferences...</p>
  }

  const toggle = (key: keyof UserPreferences) => {
    setLocalPrefs((prev) => (prev ? { ...prev, [key]: !prev[key] } : prev))
  }

  const items: { key: keyof UserPreferences; title: string; description: string }[] = [
    {
      key: "newsletterSubscribed",
      title: "Newsletter Subscription",
      description: "Receive updates about new products and sales",
    },
    {
      key: "orderNotifications",
      title: "Order Notifications",
      description: "Get notified about your order status",
    },
    {
      key: "marketingEmails",
      title: "Marketing Emails",
      description: "Exclusive offers and promotions",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Preferences</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 border border-sand rounded-lg"
          >
            <div>
              <h3 className="font-medium text-charcoal">{item.title}</h3>
              <p className="text-sm text-stone">{item.description}</p>
            </div>
            <input
              type="checkbox"
              checked={localPrefs[item.key]}
              onChange={() => toggle(item.key)}
              className="w-5 h-5"
            />
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-sand">
        <button
          onClick={() => localPrefs && mutate(localPrefs)}
          disabled={isPending}
          className="px-8 py-3 bg-terracotta text-white rounded-lg font-medium hover:bg-charcoal transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </div>
  )
}