import {
  GetPostLikesResponse,
  getCommentLikesRequest,
  getPostLikesRequest,
  updateAnswerLikesRequest,
  updateCommentLikesRequest,
  updatePostLikesRequest,
} from '@/entities/likesCounter/queries/likesApiTypes'
import { baseApi } from '@/services/inctagram-api'

export const LikesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCommentLikes: builder.query<GetPostLikesResponse, getCommentLikesRequest>({
      providesTags: ['PostLikeStatus'],
      query: arg => ({
        method: 'GET',
        params: arg,
        url: `/api/v1/posts/${arg.postId}/comments/${arg.commentId}/likes`,
      }),
    }),
    getPostLikeStatus: builder.query<GetPostLikesResponse, getPostLikesRequest>({
      providesTags: ['PostLikeStatus'],
      query: arg => ({
        method: 'GET',
        params: arg,
        url: `/api/v1/posts/${arg.postId}/likes`,
      }),
    }),
    updateAnswerLikeStatus: builder.mutation<void, updateAnswerLikesRequest>({
      invalidatesTags: ['Answer'],
      query: arg => ({
        body: arg,
        method: 'PUT',
        url: `/api/v1/posts/${arg.postId}/comments/${arg.commentId}/answers/${arg.answerId}/like-status`,
      }),
    }),
    updateCommentLikeStatus: builder.mutation<void, updateCommentLikesRequest>({
      invalidatesTags: ['Answer', 'Comments'],
      query: arg => ({
        body: arg,
        method: 'PUT',
        url: `/api/v1/posts/${arg.postId}/comments/${arg.commentId}/like-status`,
      }),
    }),
    updatePostLikeStatus: builder.mutation<void, updatePostLikesRequest>({
      invalidatesTags: ['PostLikeStatus'],
      query: arg => ({
        body: arg,
        method: 'PUT',
        url: `/api/v1/posts/${arg.postId}/like-status`,
      }),
    }),
  }),
})

export const {
  useGetCommentLikesQuery,
  useGetPostLikeStatusQuery,
  useUpdateAnswerLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
  useUpdatePostLikeStatusMutation,
} = LikesApi
