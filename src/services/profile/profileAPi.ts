import { baseApi } from '@/services/inctagram-api'
import {
  ProfileFollowers,
  ProfileFollowing,
  ProfileInfo,
} from '@/shared/types/ApiTypes/ProfileApiTypes'

const profileApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
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
        query: () => {
          return {
            method: 'GET',
            url: '/api/v1/users/profile',
          }
        },
      }),
      putSettings: build.mutation({
        query: body => {
          return {
            body,
            method: 'PUT',
            url: '/api/v1/users/profile',
          }
        },
      }),
    }
  },
})

export const {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetProfileInfoQuery,
  usePutSettingsMutation,
} = profileApi
