import { getToken } from '@/shared/utils/storage'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram.work',
    prepareHeaders: headers => {
      const token = getToken()

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: build => ({}),
  reducerPath: 'inctagram-api',
  tagTypes: ['Me'],
})
