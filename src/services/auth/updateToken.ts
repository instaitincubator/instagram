import { authActions } from '@/app/authSlice'
import { baseApi } from '@/app/inctagram-api'

const updateTokenApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      updateToken: build.mutation({
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled

          dispatch(authActions.setIsAuth(true))
        },
        query: () => {
          return {
            method: 'POST',
            url: '/api/v1/auth/update-tokens',
          }
        },
      }),
    }
  },
})

export const { useUpdateTokenMutation } = updateTokenApi
