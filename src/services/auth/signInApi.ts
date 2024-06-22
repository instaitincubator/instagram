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
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/auth/google/login',
          }
        },
      }),
      signIn: build.mutation({
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

export const { useGitHubSignInQuery, useGoogleSignInMutation, useSignInMutation } = signInApi
