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
            document.cookie = 'isLoggedIn=false'
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
    }
  },
})

export const { useLogOutMutation } = logOutApi
