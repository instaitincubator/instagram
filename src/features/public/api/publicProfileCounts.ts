import {baseApi} from '@/services/inctagram-api';
export interface GetTotalUsersResponse {
    lastUserId: number
    totalCount: number
}


export const publicProfileCountsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getTotalUsersCount: builder.query<GetTotalUsersResponse, void>({
            query: () => ({ url: '/api/v1/public-user' }),
        }),
    }),
})

export const { useGetTotalUsersCountQuery } = publicProfileCountsApi
