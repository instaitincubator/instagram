import {
  GetPostLikesResponse,
  getPostLikesRequest,
  updateAnswerLikesRequest,
  updateCommentLikesRequest,
  updatePostLikesRequest,
} from '@/entities/likesCounter/queries/likesApiTypes'
import { baseApi } from '@/services/inctagram-api'

export const LikesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPostLikeStatus: builder.query<GetPostLikesResponse, getPostLikesRequest>({
      providesTags: ['PostLikeStatus'],
      query: arg => ({
        method: 'GET',
        url: `/api/v1/posts/${arg.postId}/likes?${arg.pageSize ? '&pageSize=' + arg.pageSize : ''}${arg.cursor ? '&cursor=' + arg.cursor : ''}${arg.search ? '&search=' + arg.search : ''}${arg.pageNumber ? '&pageNumber=' + arg.pageNumber : ''}`,
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
  useGetPostLikeStatusQuery,
  useUpdateAnswerLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
  useUpdatePostLikeStatusMutation,
} = LikesApi
