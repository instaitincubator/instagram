import { authActions } from '@/app/authSlice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import config from '../../config'

function checkTokenExpiration(headers: Headers) {
  function extractTokenExpirationTime(accessToken: string) {
    const tokenData = JSON.parse(atob(accessToken.split('.')[1]))

    return tokenData.exp * 1000
  }

  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
    if (extractTokenExpirationTime(accessToken) < Date.now()) {
      debugger
    }
  }

  return headers
}

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl,
    credentials: 'include',
    prepareHeaders: headers => checkTokenExpiration(headers),
  }),
  endpoints: build => ({
    updateToken: build.mutation({
      invalidatesTags: ['Me'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled

        localStorage.setItem('accessToken', data.accessToken)
        dispatch(authActions.setIsAuth(true))
      },
      query: () => {
        return {
          method: 'POST',
          url: '/api/v1/auth/update-tokens',
        }
      },
    }),
  }),
  reducerPath: 'inctagram-api',
  tagTypes: ['Me'],
})

export const { useUpdateTokenMutation } = baseApi
