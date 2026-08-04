import { mockAddresses, mockPreferences } from "../mock/account.mook"
import type {
  Address,
  UserPreferences,
  ProfileUpdatePayload,
  PasswordChangePayload,
} from "../types/account.types"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const accountService = {
  getAddresses: async (): Promise<Address[]> => {
    // TODO: const { data } = await api.get('/account/addresses'); return data;
    await delay(300)
    return mockAddresses
  },

  addAddress: async (address: Omit<Address, "id">): Promise<Address> => {
    // TODO: const { data } = await api.post('/account/addresses', address); return data;
    await delay(300)
    return { ...address, id: crypto.randomUUID() }
  },

  getPreferences: async (): Promise<UserPreferences> => {
    // TODO: const { data } = await api.get('/account/preferences'); return data;
    await delay(200)
    return mockPreferences
  },

  updateProfile: async (payload: ProfileUpdatePayload): Promise<ProfileUpdatePayload> => {
    // TODO: const { data } = await api.patch('/account/profile', payload); return data;
    await delay(400)
    return payload
  },

  changePassword: async (payload: PasswordChangePayload): Promise<{ success: boolean }> => {
    // TODO: const { data } = await api.post('/account/change-password', payload); return data;
    await delay(400)
    if (payload.currentPassword.length < 1) {
      throw new Error("Current password is incorrect")
    }
    return { success: true }
  },

  updatePreferences: async (payload: UserPreferences): Promise<UserPreferences> => {
    // TODO: const { data } = await api.patch('/account/preferences', payload); return data;
    await delay(300)
    return payload
  },
}