import { baseApi } from '@/services/inctagram-api'
import { LoginArgs, LoginResponse, MeResponse } from '@/shared/types/ApiTypes/AuthApiTypes'
import { deleteToken, setToken } from '@/shared/utils/storage'

const signInApi = baseApi.injectEndpoints({
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
            method: 'POST',
            url: '/api/v1/auth/google/login',
          }
        },
      }),
      logOut: build.mutation<void, void>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled
          deleteToken()
          dispatch(signInApi.util.invalidateTags(['Me']))
          dispatch(signInApi.util.resetApiState())
        },
        query: () => {
          return {
            credentials: 'include',
            method: 'POST',
            url: '/api/v1/auth/logout',
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
        invalidatesTags: ['Me'],
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

export const {
  useGoogleSignInMutation,
  useLazyMeQuery,
  useLogOutMutation,
  useMeQuery,
  useSignInMutation,
} = signInApi
