import apiClient from './client'

export type GetPlacesParams = {
  /** Max 50 on the server; omit for full list (newest first). */
  limit?: number
}

/** Campos que el backend acepta en POST (id y profile los pone el servidor). */
export type CreatePlacePayload = {
  name: string
  visit_time: string
  avg_price: string
  description: string
  latitude: number
  longitude: number
}

export const getPlaces = (params?: GetPlacesParams) =>
  apiClient.get('/api/core/places/', { params })

export const createPlace = (payload: CreatePlacePayload) =>
  apiClient.post('/api/core/places/', payload)