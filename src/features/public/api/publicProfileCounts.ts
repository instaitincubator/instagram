import { baseApi } from '@/services/inctagram-api';
import { ProfileInfo } from '@/shared/types/ApiTypes/ProfileApiTypes';
export interface GetTotalUsersResponse {
	lastUserId: number
	totalCount: number
}


export const publicProfileCountsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getTotalUsersCount: builder.query<GetTotalUsersResponse, void>({
			query: () => ({ url: '/api/v1/public-user' }),
		}),
		getPublicUser: builder.query<ProfileInfo, number>({
			query: (profileId) => ({ url: `/api/v1/public-user/profile/${profileId}` })
		})
	}),
})

export const { useGetTotalUsersCountQuery, useGetPublicUserQuery, useLazyGetPublicUserQuery } = publicProfileCountsApi
