import {
  CreateAnswerRequest,
  CreateAnswerResponse,
  GetCommentAnswerRequest,
  GetCommentAnswerResponse,
} from '@/services/comments/answers/AnswerApiTypes'
import { baseApi } from '@/services/inctagram-api'

export const CommentsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createAnswer: builder.mutation<CreateAnswerResponse, CreateAnswerRequest>({
      invalidatesTags: ['Answer'],
      query: arg => ({
        body: arg,
        method: 'POST',
        url: `/api/v1/posts/${arg.postId}/comments/${arg.commentId}/answers`,
      }),
    }),
    getCommentAnswers: builder.query<GetCommentAnswerResponse, GetCommentAnswerRequest>({
      providesTags: ['Answer'],
      query: arg => ({
        params: arg,
        url: `/api/v1/posts/${arg.postId}/comments/${arg.commentId}/answers`,
      }),
    }),
  }),
})

export const { useCreateAnswerMutation, useGetCommentAnswersQuery } = CommentsApi
