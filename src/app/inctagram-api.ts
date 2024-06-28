import { RootState } from '@/app/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import config from '../../config'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'inctagram-api',
  tagTypes: ['Me'],
})
