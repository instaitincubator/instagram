import { baseApi } from '@/services/inctagram-api'
import {
  GetProfilePostsParams,
  GetPublicProfilePostsParams,
  ProfilePosts,
  ProfilePublicPosts,
} from '@/shared/types/ApiTypes/ProfileApiTypes'

export type UploadType = {
  uploadId: string
}
export type CreatePost = {
  childrenMetadata: UploadType[]
  description: string
}
type PostView = {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: any
  isLiked: boolean
  likesCount: number
  location: string
  owner: any
  ownerId: number
  updatedAt: string
  userName: string
}
const getPostsApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      UploadImage: build.mutation({
        query: formData => {
          return {
            body: formData,
            method: 'POST',
            url: '/api/v1/posts/image',
          }
        },
      }),
      getCreatePost: build.mutation<any, CreatePost>({
        query: data => ({
          body: data,
          method: 'POST',
          url: '/api/v1/posts',
        }),
      }),
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

export const { useGetCreatePostMutation, useGetPostsQuery, useUploadImageMutation } = getPostsApi
