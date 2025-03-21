import { GetAvatarResponse, LikesApiType } from '@/entities/likesCounter/queries/likesApiTypes'
import { baseApi } from '@/services/inctagram-api'

export const LikesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPostLikeStatus: builder.query<GetAvatarResponse, number>({
      providesTags: ['PostLikeStatus'],
      query: arg => ({
        method: 'GET',
        url: `/api/v1/posts/${arg}/likes`,
      }),
    }),
    updateLikeStatus: builder.mutation<void, LikesApiType>({
      invalidatesTags: ['FollowersPost', 'PostLikeStatus'],
      query: arg => ({
        body: arg,
        method: 'PUT',
        url: `/api/v1/posts/${arg.postId}/like-status`,
      }),
    }),
  }),
})

export const { useGetPostLikeStatusQuery, useUpdateLikeStatusMutation } = LikesApi
