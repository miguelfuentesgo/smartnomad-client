import apiClient from './client'

export interface LoginPayload {
  email: string
  password: string
}

export interface User {
  pk: number,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
}

export interface LoginResponse {
  access: string,
  refresh: string,
  user: User,
}



export const login = (payload: LoginPayload) =>
  apiClient.post<LoginResponse>('/api/auth/login/', payload)

export const logout = () =>
  apiClient.post('/api/auth/logout/')
