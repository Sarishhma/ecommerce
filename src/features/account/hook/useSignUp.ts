// src/auth/hooks/useSignup.ts
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/redux/hooks'
import { setCredentials } from '@/redux/slices/authSlice'

import type { SignupFormValues } from '../types/auth.types'
import { authService } from '../service/auth.service'

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const signup = async (data: SignupFormValues): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      // Step 1: create the account (no tokens returned)
      await authService.createUser({
        username: data.username,
        email: data.email,
        full_name: `${data.firstName} ${data.lastName}`.trim(),
        phone_number: data.phoneNumber,
        password: data.password,
        role: 'customer',
      })

      // Step 2: immediately log in with the same credentials to get real tokens
      const loginResponse = await authService.login({
        username: data.username,
        password: data.password,
      })

      authService.setTokens(loginResponse.access, loginResponse.refresh)
      authService.setUser(loginResponse.user)

      dispatch(
        setCredentials({
          user: loginResponse.user,
          accessToken: loginResponse.access,
          refreshToken: loginResponse.refresh,
        })
      )

      navigate('/account', { replace: true })
      return true
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data?.detail || err.response?.data?.message
        setError(serverMessage || 'Something went wrong. Please try again.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}