
  import { baseApi } from '@/services/inctagram-api'
  import { GetLatestMessagesRequest, GetLatestMessagesResponse } from './MessangerAPItypes'

  export const MessangerApi = baseApi.injectEndpoints({
    endpoints: builder => ({
      getLatestMessages: builder.query<GetLatestMessagesResponse, GetLatestMessagesRequest>({
        query: (arg) => ({
          params: arg,
          url: `/api/v1/messanger`,
        }),
      }),
    }),
  })
  
  export const { useGetLatestMessagesQuery } = MessangerApi
  