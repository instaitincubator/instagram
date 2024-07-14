import { authActions } from '@/app/authSlice'
import { baseApi } from '@/app/inctagram-api'

const signInApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      gitHubSignIn: build.query({
        query: () => {
          return {
            method: 'GET',
            url: '/api/v1/auth/github/login',
          }
        },
      }),
      googleSignIn: build.mutation({
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled

          dispatch(authActions.setAccessToken(data.accessToken))
        },
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/auth/google/login',
          }
        },
      }),
      logOut: build.mutation({
        invalidatesTags: ['Me'],
        query: () => {
          return {
            method: 'POST',
            url: '/api/v1/auth/logout',
          }
        },
      }),
      me: build.query({
        providesTags: ['Me'],
        query: () => {
          return {
            method: 'GET',
            url: '/api/v1/auth/me',
          }
        },
      }),
      signIn: build.mutation({
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            dispatch(authActions.setAccessToken(data.accessToken))
          } catch (error) {
            throw new Error('Login failed')
          }
        },
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/auth/login',
          }
        },
      }),
    }
  },
})

export const {
  useGitHubSignInQuery,
  useGoogleSignInMutation,
  useLogOutMutation,
  useMeQuery,
  useSignInMutation,
} = signInApi
