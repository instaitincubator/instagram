import { getToken, setToken } from '@/shared/utils/storage'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work',
  prepareHeaders: headers => {
    const token = getToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          {
            credentials: 'include',
            method: 'POST',
            url: '/api/v1/auth/update-tokens',
          },
          api,
          extraOptions
        )

        if (
          typeof refreshResult.data === 'object' &&
          refreshResult.data !== null &&
          'accessToken' in refreshResult.data &&
          refreshResult.data?.accessToken &&
          typeof refreshResult.data?.accessToken === 'string'
        ) {
          setToken(refreshResult.data.accessToken)
          result = await baseQuery(args, api, extraOptions)
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
