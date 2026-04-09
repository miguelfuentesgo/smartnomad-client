import apiClient from './client'

export type GetPlacesParams = {
  /** Max 50 on the server; omit for full list (newest first). */
  limit?: number
}

export const getPlaces = (params?: GetPlacesParams) =>
  apiClient.get('/api/core/places/', { params })