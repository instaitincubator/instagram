import { baseApi } from '@/services/inctagram-api'

export type SubscriptionResponse = {
  amount: number
  baseUrl: string
  paymentType: string
  typeSubscription: string
}

const paymentsApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      createSubscription: build.mutation<string, SubscriptionResponse>({
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/subscriptions',
          }
        },
      }),
      getSubscription: build.query({
        query: () => {
          return {
            url: '/api/v1/subscriptions/my-payments',
          }
        },
      }),
    }
  },
})

export const { useCreateSubscriptionMutation, useGetSubscriptionQuery } = paymentsApi
