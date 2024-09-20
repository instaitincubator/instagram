import { baseApi } from '@/services/inctagram-api'
import { Profile } from '@/shared/types/public.types'

const profileApi = baseApi.injectEndpoints({
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
      getProfileInfo: build.query({
        providesTags: ['profile'],
        query: () => {
          return {
            method: 'GET',
            url: '/api/v1/users/profile',
          }
        },
      }),
      putSettings: build.mutation({
        invalidatesTags: ['profile'],
        query: body => {
          return {
            body,
            method: 'PUT',
            url: '/api/v1/users/profile',
          }
        },
      }),
      uploadProfileAvatar: build.mutation({
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
  useGetProfileInfoQuery,
  usePutSettingsMutation,
  useUploadProfileAvatarMutation,
} = profileApi
