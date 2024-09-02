import { baseApi } from '@/services/inctagram-api'

const TerminateAllSessionsApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      terminateSessions: build.mutation({
        query: () => {
          return {
            method: 'DELETE',
            url: '/api/v1/sessions/terminate-all',
          }
        },
      }),
    }
  },
})

export const { useTerminateSessionsMutation } = TerminateAllSessionsApi
