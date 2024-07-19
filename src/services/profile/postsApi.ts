import { baseApi } from '@/app/inctagram-api'

const getPostsApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getPosts: build.query({
        query: arg => {
          return {
            body: arg.params,
            url: `/api/v1/posts/${arg.userName}`,
          }
        },
      }),
    }
  },
})

export const { useGetPostsQuery } = getPostsApi
