import { baseApi } from '@/services/inctagram-api'

interface PaymentIntentResponse {
  clientSecret: string
}

const PaymentApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      createPaymentIntent: build.mutation<PaymentIntentResponse, { amount: number }>({
        query: body => ({
          body,
          method: 'POST',
          url: 'create-payment-intent',
        }),
      }),
    }
  },
})

export const { useCreatePaymentIntentMutation } = PaymentApi
