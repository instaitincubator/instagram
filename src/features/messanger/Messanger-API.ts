import { baseApi } from '@/services/inctagram-api'

import { GetLatestMessagesRequest, GetLatestMessagesResponse } from './MessangerAPItypes'

export const MessangerApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getLatestMessages: builder.query<GetLatestMessagesResponse, GetLatestMessagesRequest>({
      forceRefetch({ currentArg, previousArg }) {
        if (!currentArg || !previousArg) {
          return true
        }

        return (
          currentArg.searchName !== previousArg.searchName ||
          currentArg.cursor !== previousArg.cursor
        )
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.searchName) {
          return newItems
        }

        const existingIds = new Set(currentCache.items.map(item => item.id))
        const newMessages = newItems.items.filter(item => !existingIds.has(item.id))

        return {
          ...newItems,
          items: [...currentCache.items, ...newMessages],
        }
      },
      query: arg => ({
        params: arg,
        url: `/api/v1/messanger`,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
    }),
    getUserMessage: builder.query({
      query: arg => ({
        url: `/api/v1/messanger/${arg.id}`,
      }),
    }),
  }),
})

export const { useGetLatestMessagesQuery, useGetUserMessageQuery } = MessangerApi
