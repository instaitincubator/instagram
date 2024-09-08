import { baseApi } from '@/services/inctagram-api'
import { Images } from '@/shared/types/public.types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      uploadProfileAvatar: build.mutation<any, any>({
        query: formData => {
          return {
            body: formData,
            method: 'POST',
            url: '/api/v1/users/profile/avatar',
          }
        },
      }),
    }
  },
})
export const { useUploadProfileAvatarMutation } = profileApi
