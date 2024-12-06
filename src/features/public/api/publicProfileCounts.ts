import { baseApi } from '@/services/inctagram-api';
import { ProfileInfo } from '@/shared/types/ApiTypes/ProfileApiTypes';
export interface GetTotalUsersResponse {
	lastUserId: number
	totalCount: number
}


export const publicProfileCountsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getPublicUser: builder.query<ProfileInfoPublic, number>({

			query: (profileId) => ({ url: `/api/v1/public-user/profile/${profileId}` })
		}),
		getTotalUsersCount: builder.query<GetTotalUsersResponse, void>({
			query: () => ({ url: '/api/v1/public-user' }),
		})
	}),
})

export const { useGetPublicUserQuery, useGetTotalUsersCountQuery, useLazyGetPublicUserQuery } = publicProfileCountsApi
