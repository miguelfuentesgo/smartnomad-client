import { create } from 'zustand'
import { getPlaces as getPlacesRequest } from '../api/place'

interface Place {
  id: string
  name: string
  visit_time: string
  avg_price: string
  description: string
  latitude: number
  longitude: number
}


interface PlaceState {
  places: Place[],
  hasPlaces: boolean,
  isLoading: boolean,
  error: string | null,

  getPlaces: (options?: { limit?: number }) => Promise<void>
}

export const usePlaceStore = create<PlaceState>((set) => ({
  places: [],
  hasPlaces: false,
  isLoading: false,
  error: null,

  getPlaces: async (options) => {
    set({ isLoading: true, error: null })
    try {
      const response = await getPlacesRequest(
        options?.limit != null ? { limit: options.limit } : undefined,
      )
      const data = response.data
      set({
        places: data,
        hasPlaces: data.length > 0,
        isLoading: false,
        error: null,
      })
    } catch {
      set({
        places: [],
        hasPlaces: false,
        isLoading: false,
        error: 'Failed to load places',
      })
    }
  },


}))
