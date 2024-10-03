import { baseApi } from '@/services/inctagram-api'
import { LoginArgs, LoginResponse, MeResponse } from '@/shared/types/ApiTypes/AuthApiTypes'
import { setToken } from '@/shared/utils/storage'

export const signInApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      googleSignIn: build.mutation({
        async onQueryStarted(_, { queryFulfilled }) {
          const { data } = await queryFulfilled

          setToken(data.accessToken)
        },
        query: body => {
          return {
            body,
            credentials: 'include',
            method: 'POST',
            url: '/api/v1/auth/google/login',
          }
        },
      }),
      me: build.query<MeResponse, void>({
        providesTags: ['Me'],
        query: () => {
          return {
            method: 'GET',
            url: '/api/v1/auth/me',
          }
        },
      }),
      signIn: build.mutation<LoginResponse, LoginArgs>({
        query: body => {
          return {
            body,
            credentials: 'include',
            method: 'POST',
            url: '/api/v1/auth/login',
          }
        },
      }),
    }
  },
})

export const { useGoogleSignInMutation, useLazyMeQuery, useMeQuery, useSignInMutation } = signInApi
