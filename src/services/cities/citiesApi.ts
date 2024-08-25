import { baseCityApi } from '@/app/cities-api'

const getCitiesApi = baseCityApi.injectEndpoints({
  endpoints: build => {
    return {
      getCities: build.query({
        query: () => {
          return {
            method: 'GET',
            url: '/geo/places',
          }
        },
      }),
    }
  },
})

export const { useGetCitiesQuery } = getCitiesApi
