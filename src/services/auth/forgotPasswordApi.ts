import { baseApi } from '@/app/inctagram-api'

const forgotPasswordApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      forgotPassword: build.mutation({
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/auth/password-recovery',
          }
        },
      }),
    }
  },
})

export const { useForgotPasswordMutation } = forgotPasswordApi
