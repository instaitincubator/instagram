import { baseApi } from '@/services/inctagram-api'
import {
  ProfileFollowers,
  ProfileFollowing,
  ProfileInfo,
  Session,
} from '@/shared/types/ApiTypes/ProfileApiTypes'

const profileApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      deleteDevice: build.mutation<void, number>({
        invalidatesTags: ['sessions'],
        query: (deviceId: number) => {
          return {
            method: 'DELETE',
            url: `/api/v1/sessions/${deviceId}`,
          }
        },
      }),
      deleteProfileAvatar: build.mutation<void, void>({
        invalidatesTags: ['profile'],
        query: () => {
          return {
            method: 'DELETE',
            url: '/api/v1/users/profile/avatar',
          }
        },
      }),
      getDevices: build.query<Session, void>({
        providesTags: ['sessions'],
        query: () => {
          return {
            method: 'GET',
            url: '/api/v1/sessions',
          }
        },
      }),
      getFollowers: build.query<ProfileFollowers, string>({
        query: (userName: string) => {
          return {
            url: `/api/v1/users/${userName}/followers`,
          }
        },
      }),
      getFollowing: build.query<ProfileFollowing, string>({
        query: (userName: string) => {
          return {
            url: `/api/v1/users/${userName}/following`,
          }
        },
      }),
      getProfileInfo: build.query<ProfileInfo, void>({
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
      terminateAllSessions: build.mutation<void, void>({
        invalidatesTags: ['sessions'],
        query: () => {
          return {
            method: 'DELETE',
            url: `/api/v1/sessions/terminate-all`,
          }
        },
      }),
      uploadProfileAvatar: build.mutation<any, any>({
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
  useDeleteDeviceMutation,
  useDeleteProfileAvatarMutation,
  useGetDevicesQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetProfileInfoQuery,
  usePutSettingsMutation,
  useTerminateAllSessionsMutation,
  useUploadProfileAvatarMutation,
} = profileApi
