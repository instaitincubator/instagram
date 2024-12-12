import { baseApi } from '@/services/inctagram-api'
import {
  Payments,
  SubscriptionRequest,
  SubscriptionResponse,
  getCurrentSubscriptionResponse,
} from '@/shared/types/ApiTypes/SubscriptionApiTypes'

const paymentsApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      cancelAutoRenewal: build.mutation<void, void>({
        invalidatesTags: ['currentSub'],
        query: () => {
          return {
            method: 'POST',
            url: '/api/v1/subscriptions/canceled-auto-renewal',
          }
        },
      }),
      createSubscription: build.mutation<SubscriptionResponse, SubscriptionRequest>({
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/api/v1/subscriptions',
          }
        },
      }),
      getCurrentSubscription: build.query<getCurrentSubscriptionResponse, void>({
        providesTags: ['currentSub'],
        query: () => {
          return {
            url: '/api/v1/subscriptions/current-payment-subscriptions',
          }
        },
      }),
      getPayments: build.query<Payments[], void>({
        query: () => {
          return {
            url: '/api/v1/subscriptions/my-payments',
          }
        },
      }),
    }
  },
})

export const {
  useCancelAutoRenewalMutation,
  useCreateSubscriptionMutation,
  useGetCurrentSubscriptionQuery,
  useGetPaymentsQuery,
} = paymentsApi
