import { baseApi } from '@/services/inctagram-api'
import {
  UserWithFollowingStatusResponse,
  followingUserRequest,
} from '@/services/users/usersApiTypes'

const followingApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      followingUser: build.mutation<void, followingUserRequest>({
        invalidatesTags: ['following', 'profile', 'followingStatus'],
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/users/following',
          }
        },
      }),
      getUserWithFollowingStatus: build.query<UserWithFollowingStatusResponse, string>({
        providesTags: ['followingStatus'],
        query: arg => {
          return {
            method: 'GET',
            url: `/api/v1/users/${arg}`,
          }
        },
      }),
      unFollowingUser: build.mutation<void, number>({
        invalidatesTags: ['following', 'profile', 'followingStatus', 'FollowersPost'],
        query: body => {
          return {
            method: 'DELETE',
            url: `/api/v1/users/follower/${body}`,
          }
        },
      }),
    }
  },
})

export const {
  useFollowingUserMutation,
  useGetUserWithFollowingStatusQuery,
  useUnFollowingUserMutation,
} = followingApi
