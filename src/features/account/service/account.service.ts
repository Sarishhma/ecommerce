
import api from "@/lib/api"

import type { ProfileFormValues } from "../schema/account.schema"
import type {
  Address,
  PasswordChangePayload,
  User,
} from "../types/account.types"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const accountService = {

    updateProfile: async (userId: number, data: ProfileFormValues): Promise<User> => {
    const response = await api.patch<User>(`/users/${userId}/`, data)
    return response.data
  },  

  addAddress: async (address: Omit<Address, "id">): Promise<Address> => {
    // TODO: const { data } = await api.post('/account/addresses', address); return data;
    await delay(300)
    return { ...address, id: crypto.randomUUID() }
  },

  changePassword: async (payload: PasswordChangePayload): Promise<{ success: boolean }> => {
    // TODO: const { data } = await api.post('/account/change-password', payload); return data;
    await delay(400)
    if (payload.currentPassword.length < 1) {
      throw new Error("Current password is incorrect")
    }
    return { success: true }
  },


}