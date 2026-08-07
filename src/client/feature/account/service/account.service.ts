
import api from "@/lib/api"
import { mockAddresses, mockPreferences } from "../mock/account.mook"
import type { ProfileFormValues } from "../schema/account.schema"
import type {
  Address,
  UserPreferences,
  PasswordChangePayload,
  User,
} from "../types/account.types"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const accountService = {

    updateProfile: async (userId: number, data: ProfileFormValues): Promise<User> => {
    const response = await api.patch<User>(`/users/${userId}/`, data)
    return response.data
  },  
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