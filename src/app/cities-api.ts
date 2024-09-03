import { baseCitiesApi } from '@/app/baseCitiesApi'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseCityApi = createApi({
  baseQuery: baseCitiesApi,
  endpoints: build => ({
    getCities: build.query({
      query: () => {
        return {
          method: 'GET',
          url: '/geo/countries',
        }
      },
    }),
  }),
  reducerPath: 'city-api',
  tagTypes: ['Cities'],
})
