import { baseApi } from '@/services/inctagram-api'

const profileApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getProfileInfo: build.query({
        query: () => {
          return {
            method: 'GET',
            url: '/api/v1/users/profile',
          }
        },
      }),
      putSettings: build.mutation({
        query: body => {
          return {
            body,
            method: 'PUT',
            url: '/api/v1/users/profile',
          }
        },
      }),
    }
  },
})

export const { useGetProfileInfoQuery, usePutSettingsMutation } = profileApi
