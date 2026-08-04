import type { Address, UserPreferences } from "../types/account.types"

export const mockAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Home Address",
    street: "123 Oak Street",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "United States",
    isDefault: true,
  },
]

export const mockPreferences: UserPreferences = {
  newsletterSubscribed: true,
  orderNotifications: true,
  marketingEmails: false,
}