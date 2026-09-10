
import api from "@/lib/api"

import type { UpdateProfileData } from "../schema/account.schema"
import type {

  User,
} from "../types/account.types"

export const accountService = {

    updateProfile: async (userId: number, data: UpdateProfileData): Promise<User> => {
    const response = await api.patch<User>(`/users/${userId}/`, data)
    return response.data
  },  

}