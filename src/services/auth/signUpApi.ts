import { baseApi } from '@/app/inctagram-api'

const signUpApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      ConfirmCode: build.mutation({
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/auth/registration-confirmation',
          }
        },
      }),
      SignUp: build.mutation({
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/auth/registration',
          }
        },
      }),
    }
  },
})

export const { useConfirmCodeMutation, useSignUpMutation } = signUpApi
