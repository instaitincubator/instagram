import { baseApi } from '@/services/inctagram-api'

const followingApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      followingUser: build.mutation<any, any>({
        invalidatesTags: ['following', 'profile'],
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/users/following',
          }
        },
      }),
      getFollowUser: build.query<any, any>({
        providesTags: ['following'],
        query: arg => {
          return {
            method: 'GET',
            url: `/api/v1/users/${arg.userName}/followers`,
          }
        },
      }),
      unFollowingUser: build.mutation<any, any>({
        invalidatesTags: ['following', 'profile'],
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/users/follower/{userId}',
          }
        },
      }),
    }
  },
})

export const { useFollowingUserMutation, useGetFollowUserQuery, useUnFollowingUserMutation } =
  followingApi
