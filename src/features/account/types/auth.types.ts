import type { UserRole } from "@/auth/types/auth.types"

export type SignupPayload = {
  username: string
  email: string
  full_name: string
  phone_number: string
  password: string
  role: UserRole
}

export type SignupFormValues = {
  firstName: string
  lastName: string
  username: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}
export type User = {
  id: number
  username?: string
  email: string
  full_name: string
  phone_number: string
  address: string | null
  image: string | null
  organization: number
  is_active?: boolean
  roles: UserRole[]
}