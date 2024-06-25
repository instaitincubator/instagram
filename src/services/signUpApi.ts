import { baseApi } from '@/app/inctagram-api'

const signUpApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      SignUp: build.mutation({
        query: arg => {
          return {
            arg,
            method: 'POST',
            url: '/api/v1/auth/registration',
          }
        },
      }),
    }
  },
})

export const { useSignUpMutation } = signUpApi
