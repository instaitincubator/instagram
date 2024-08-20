import { authActions } from '@/app/authSlice'
import { baseApi } from '@/app/inctagram-api'

export const signInApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      googleSignIn: build.mutation({
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled

          dispatch(authActions.setIsAuth(true))

          localStorage.setItem('accessToken', data.accessToken)
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
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          queryFulfilled.then(() => {})
        },
        query: () => {
          return {
            method: 'POST',
            url: '/api/v1/auth/logout',
          }
        },
      }),
      me: build.query({
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled

          dispatch(authActions.setIsAuth(true))
        },
        providesTags: ['Me'],
        query: () => {
          return {
            method: 'GET',
            url: '/api/v1/auth/me',
          }
        },
      }),
      signIn: build.mutation({
        invalidatesTags: ['Me'],
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled

          dispatch(authActions.setIsAuth(true))

          localStorage.setItem('accessToken', data.accessToken)
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

export const { useGoogleSignInMutation, useLogOutMutation, useMeQuery, useSignInMutation } =
  signInApi
