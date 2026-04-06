import { create } from 'zustand'
import { login as loginRequest, logout as logoutRequest } from '../api/auth'
import type { LoginPayload, User } from '../api/auth'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  user: User | null

  login: (payload: LoginPayload) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initial state — read token from localStorage so session persists on refresh
  token: localStorage.getItem('access_token'),
  isAuthenticated: !!localStorage.getItem('access_token'),
  isLoading: false,
  error: null,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,

  login: async (payload) => {
    set({ isLoading: true, error: null })
    try {
      const response = await loginRequest(payload)
      const token = response.data.access
      const refreshToken = response.data.refresh
      const user = response.data.user

      localStorage.setItem('access_token', token)
      localStorage.setItem('refresh_token', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
      set({ token, isAuthenticated: true, isLoading: false, user })
    } catch {
      set({ error: 'Invalid email or password', isLoading: false })
    }
  },

  logout: async () => {
    try {
      await logoutRequest()
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
      set({ token: null, isAuthenticated: false })
    }
  },
}))
