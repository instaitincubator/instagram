import { baseApi } from '@/app/inctagram-api'

const forgotPasswordApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      forgotPassword: build.mutation({
        query: arg => {
          return {
            arg,
            method: 'POST',
            url: '/api/v1/auth/password-recovery',
          }
        },
      }),
    }
  },
})

export const { useForgotPasswordMutation } = forgotPasswordApi
export default forgotPasswordApi
