import { baseQueryWithReauth } from '@/app/baseApiWithReauth'
import { createApi } from '@reduxjs/toolkit/query/react'
export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({}),
  reducerPath: 'inctagram-api',
  tagTypes: ['Me'],
})
