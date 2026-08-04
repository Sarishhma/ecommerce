import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { accountService } from "../service/account.service"


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

export function useUpdateProfile() {
  return useMutation({ mutationFn: accountService.updateProfile })
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