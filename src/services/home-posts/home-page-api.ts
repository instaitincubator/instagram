import { homePageRequest, homePageResponse } from '@/services/home-posts/home-page-types'
import { baseApi } from '@/services/inctagram-api'

export const HomePageApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFollowersPosts: builder.query<homePageResponse, homePageRequest>({
      providesTags: ['FollowersPost'],
      query: arg => ({
        params: arg,
        url: `/api/v1/home/publications-followers`,
      }),
    }),
  }),
})

export const { useGetFollowersPostsQuery } = HomePageApi
