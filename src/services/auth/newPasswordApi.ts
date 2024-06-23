import { baseApi } from '@/app/inctagram-api'

const newPasswordApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
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

export const { useNewPasswordMutation } = newPasswordApi
