import { baseApi } from '@/app/inctagram-api'

const googleSignInApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      signIn: build.mutation({
        query: body => {
          debugger

          return {
            body,
            method: 'POST',
            url: '/api/v1/auth/google/login',
          }
        },
      }),
    }
  },
})

export const { useSignInMutation } = googleSignInApi
