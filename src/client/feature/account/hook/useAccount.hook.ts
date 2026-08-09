import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { accountService } from "../service/account.service"
import { useAppDispatch } from "@/redux"
import type { ProfileFormValues } from "../schema/account.schema"

import {  setUser } from "@/redux/slices/authSlice"
import { authService } from "@/auth/services/auth.service"


export function useAddresses() {
  return useQuery({
    queryKey: ["account", "addresses"],
    queryFn: accountService.getAddresses,
  })
}

export function useAddAddress() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: accountService.addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", "addresses"] })
    },
  })
}

export function usePreferences() {
  return useQuery({
    queryKey: ["account", "preferences"],
    queryFn: accountService.getPreferences,
  })
}


export const useUpdateProfile = (userId: number) => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: (data: ProfileFormValues) => accountService.updateProfile(userId, data),
    onSuccess: (updatedUser) => {
      authService.setUser(updatedUser)
      dispatch(setUser(updatedUser))
    },
  })
}

export function useChangePassword() {
  return useMutation({ mutationFn: accountService.changePassword })
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: accountService.updatePreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", "preferences"] })
    },
  })
}