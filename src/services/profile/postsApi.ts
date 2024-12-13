import { baseApi } from '@/services/inctagram-api'
import {
  GetProfilePostsParams,
  GetPublicProfilePostsParams,
  ProfilePosts,
  ProfilePublicPosts,
} from '@/shared/types/ApiTypes/ProfileApiTypes'

const getPostsApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getPosts: build.query<ProfilePosts, GetProfilePostsParams>({
        providesTags: ['Posts'],
        query: arg => {
          const params = new URLSearchParams()

          if (arg.pageNumber !== undefined) {
            params.append('pageNumber', arg.pageNumber.toString())
          }
          if (arg.pageSize !== undefined) {
            params.append('pageSize', arg.pageSize.toString())
          }
          if (arg.sortBy) {
            params.append('sortBy', arg.sortBy)
          }
          if (arg.sortDirection) {
            params.append('sortDirection', arg.sortDirection)
          }

          return {
            url: `/api/v1/posts/${arg.userName}?${params.toString()}`,
          }
        },
      }),
      getPublicPost: build.query<ProfilePublicPosts, GetPublicProfilePostsParams>({
        providesTags: ['Posts'],
        query: arg => {
          const params = new URLSearchParams()

          if (arg.pageSize !== undefined) {
            params.append('pageSize', arg.pageSize.toString())
          }
          if (arg.sortBy) {
            params.append('sortBy', arg.sortBy)
          }
          if (arg.sortDirection) {
            params.append('sortDirection', arg.sortDirection)
          }

          return {
            url: `/api/v1/public-posts/user/${arg.userId}`,
          }
        },
      }),
    }
  },
})

export const { useGetPostsQuery } = getPostsApi
