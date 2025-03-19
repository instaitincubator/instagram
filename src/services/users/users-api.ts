import { baseApi } from '@/services/inctagram-api'
import { getUsers, getUsersParams } from '@/services/users/usersApiTypes'

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query<getUsers, getUsersParams>({
      query: arg => ({
        params: arg,
        url: `/api/v1/users`,
      }),
    }),
  }),
})

export const { useGetAllUsersQuery, useLazyGetAllUsersQuery } = usersApi
