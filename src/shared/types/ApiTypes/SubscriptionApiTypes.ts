import { PaymentType, SubscriptionAmount, SubscriptionType } from '@/shared/types/public.enums'

export interface SubscriptionRequest {
  amount: number
  baseUrl: string
  paymentType: string
  typeSubscription: string
}
export interface SubscriptionResponse {
  url: string
}

export interface subscription {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}

export interface getCurrentSubscriptionResponse {
  data: subscription[]
  hasAutoRenewal: boolean
}

export interface Payments {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: PaymentType
  price: SubscriptionAmount
  subscriptionId: string
  subscriptionType: SubscriptionType
  userId: number
}
