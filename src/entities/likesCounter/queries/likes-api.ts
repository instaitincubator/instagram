import {
  GetPostLikesResponse,
  updateAnswerLikesRequest,
  updateCommentLikesRequest,
  updatePostLikesRequest,
} from '@/entities/likesCounter/queries/likesApiTypes'
import { baseApi } from '@/services/inctagram-api'

export const LikesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPostLikeStatus: builder.query<GetPostLikesResponse, number>({
      providesTags: ['PostLikeStatus'],
      query: arg => ({
        method: 'GET',
        url: `/api/v1/posts/${arg}/likes`,
      }),
    }),
    updateAnswerLikeStatus: builder.mutation<void, updateAnswerLikesRequest>({
      query: arg => ({
        body: arg,
        method: 'PUT',
        url: `/api/v1/posts/${arg.postId}/comments/${arg.commentId}/answers/${arg.answerId}/like-status`,
      }),
    }),
    updateCommentLikeStatus: builder.mutation<void, updateCommentLikesRequest>({
      invalidatesTags: ['PostLikeStatus'],
      query: arg => ({
        body: arg,
        method: 'PUT',
        url: `/api/v1/posts/${arg.postId}/comments/${arg.commentId}/answers`,
      }),
    }),
    updatePostLikeStatus: builder.mutation<void, updatePostLikesRequest>({
      query: arg => ({
        body: arg,
        method: 'PUT',
        url: `/api/v1/posts/${arg.postId}/like-status`,
      }),
    }),
  }),
})

export const {
  useGetPostLikeStatusQuery,
  useUpdateAnswerLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
  useUpdatePostLikeStatusMutation,
} = LikesApi
