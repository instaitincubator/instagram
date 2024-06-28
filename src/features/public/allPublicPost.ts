import {baseApi} from '@/app/inctagram-api';


export const publicPostApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getAllPublicPosts: builder.query({
            query: ({ pageSize = 4, sortDirection = 'desc', ...rest }) => ({
                params: { pageSize, sortDirection, ...rest },
                url: `/api/v1/public-posts/all`,
            }),
        }),
    }),
})

export const { useGetAllPublicPostsQuery } = publicPostApi
