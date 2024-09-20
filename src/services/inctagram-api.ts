import { baseQueryWithReauth } from '@/services/incragram.base-query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({}),
  reducerPath: 'inctagram-api',
  tagTypes: ['Me', 'Posts'],
})
