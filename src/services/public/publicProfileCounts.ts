import { baseApi } from '@/services/inctagram-api';
import { ProfileInfo } from '@/shared/types/ApiTypes/ProfileApiTypes';
import { GetTotalUsersResponse } from '@/shared/types/public.types'
export const publicProfileCountsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getPublicUser: builder.query<ProfileInfo, number>({
			query: (profileId) => ({ url: `/api/v1/public-user/profile/${profileId}` })
		}),
		getTotalUsersCount: builder.query<GetTotalUsersResponse, void>({
			query: () => ({ url: '/api/v1/public-user' }),
		})
	}),
})

export const { useGetTotalUsersCountQuery, useLazyGetPublicUserQuery } = publicProfileCountsApi
