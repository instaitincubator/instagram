import { signInApi } from '@/services/auth/signInApi'
import { baseApi } from '@/services/inctagram-api'
import { deleteToken } from '@/shared/utils/storage'

const logOutApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      logOut: build.mutation<void, void>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled
            deleteToken()
            dispatch(signInApi.util.invalidateTags(['Me']))
            dispatch(signInApi.util.resetApiState())
          } catch {
            /* empty */
          }
        },
        query() {
          return {
            credentials: 'include',
            method: 'POST',
            url: '/api/v1/auth/logout',
          }
        },
      }),
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

export const { useLogOutMutation, useTerminateSessionsMutation } = logOutApi
