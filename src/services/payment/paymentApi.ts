import { baseApi } from '@/services/inctagram-api'
import { createApi } from '@reduxjs/toolkit/query/react'

export const paymentSlice = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      createPaymentIntent: build.mutation({
        query: amount => ({
          body: { amount },
          method: 'POST',
          url: 'create-payment-intent',
        }),
      }),
    }
  },
})

export const { useCreatePaymentIntentMutation } = paymentSlice
