import type { UserRole } from "@/auth/types/auth.types"

export type Address = {
  id: string
  label: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}

// export type UserPreferences = {
//   newsletterSubscribed: boolean
//   orderNotifications: boolean
//   marketingEmails: boolean
// }

export type ProfileUpdatePayload = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type PasswordChangePayload = {
  currentPassword: string
  newPassword: string
}

export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;  // ← not firstName/lastName
  phone_number: string;
  address: string;
  organization: number;
  roles: UserRole[];
}