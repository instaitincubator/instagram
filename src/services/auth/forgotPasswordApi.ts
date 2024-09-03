import { baseApi } from '@/services/inctagram-api'

const forgotPasswordApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      checkRecoveryCode: build.mutation({
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/auth/check-recovery-code',
          }
        },
      }),
      forgotPassword: build.mutation({
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/auth/password-recovery',
          }
        },
      }),
      newPassword: build.mutation({
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/auth/new-password',
          }
        },
      }),
    }
  },
})

export const { useCheckRecoveryCodeMutation, useForgotPasswordMutation, useNewPasswordMutation } =
  forgotPasswordApi
