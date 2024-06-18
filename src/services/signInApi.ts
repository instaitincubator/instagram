import { baseApi } from '@/app/inctagram-api'

const signInApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      signIn: build.mutation({
        query: arg => {
          return {
            arg,
            method: 'POST',
            url: '/api/v1/auth/login',
          }
        },
      }),
    }
  },
})

export const { useSignInMutation } = signInApi
