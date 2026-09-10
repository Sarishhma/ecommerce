import { useMutation } from "@tanstack/react-query"
import { accountService } from "../service/account.service"
import { useAppDispatch } from "@/redux"
import type { UpdateProfileData } from "../schema/account.schema"

import { setUser } from "@/redux/slices/authSlice"
import { authService } from "@/auth/services/auth.service"





export const useUpdateProfile = (userId: number) => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: (data: UpdateProfileData) => accountService.updateProfile(userId, data),
    onSuccess: (updatedUser) => {
      const currentUser = authService.getUser()
      const mergedUser = {
        ...currentUser,
        ...updatedUser,
        id: updatedUser?.id || (updatedUser as any)?.user_id || (updatedUser as any)?.pk || currentUser?.id || userId,
      }
      authService.setUser(mergedUser as any)
      dispatch(setUser(mergedUser as any))
    },
  })
}

