import {
  CreateCommentRequest,
  CreateCommentResponse,
  GetAllPostCommentsRequest,
  GetAllPostCommentsResponse,
} from '@/services/comments/CommentsApiTypes'
import { baseApi } from '@/services/inctagram-api'

export const CommentsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<CreateCommentResponse, CreateCommentRequest>({
      invalidatesTags: ['Comments'],
      query: arg => ({
        body: arg,
        method: 'POST',
        url: `/api/v1/posts/${arg.postId}/comments`,
      }),
    }),
    getAllPostComments: builder.query<GetAllPostCommentsResponse, GetAllPostCommentsRequest>({
      providesTags: ['Comments'],
      query: arg => ({
        params: arg,
        url: `/api/v1/posts/${arg.postId}/comments`,
      }),
    }),
  }),
})

export const { useCreateCommentMutation, useGetAllPostCommentsQuery } = CommentsApi
