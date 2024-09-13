import { baseApi } from '@/services/inctagram-api'
import { Images, Profile } from '@/shared/types/public.types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      deleteProfileAvatar: build.mutation<void, void>({
        invalidatesTags: ['profile'],
        query: () => {
          return {
            method: 'DELETE',
            url: '/api/v1/users/profile/avatar',
          }
        },
      }),
      getProfile: build.query<Profile, void>({
        providesTags: ['profile'],
        query: () => {
          return {
            method: 'GET',
            url: '/api/v1/users/profile',
          }
        },
      }),
      uploadProfileAvatar: build.mutation<any, FormData>({
        invalidatesTags: ['profile'],
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
export const {
  useDeleteProfileAvatarMutation,
  useGetProfileQuery,
  useUploadProfileAvatarMutation,
} = profileApi
