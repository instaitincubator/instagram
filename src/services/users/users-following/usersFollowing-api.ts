import { baseApi } from '@/services/inctagram-api'
import { UserWithFollowingStatusResponse } from '@/services/users/usersApiTypes'

const followingApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      followingUser: build.mutation<any, any>({
        invalidatesTags: ['following', 'profile', 'followingStatus'],
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/users/following',
          }
        },
      }),
      getFollowUser: build.query<any, any>({
        query: arg => {
          return {
            method: 'GET',
            url: `/api/v1/users/${arg.userName}/followers`,
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
      unFollowingUser: build.mutation<any, any>({
        invalidatesTags: ['following', 'profile', 'followingStatus'],
        query: body => {
          return {
            method: 'DELETE',
            url: `/api/v1/users/follower/${body.userId}`,
          }
        },
      }),
    }
  },
})

export const {
  useFollowingUserMutation,
  useGetFollowUserQuery,
  useGetUserWithFollowingStatusQuery,
  useUnFollowingUserMutation,
} = followingApi
