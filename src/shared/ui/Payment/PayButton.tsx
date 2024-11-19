import React, { useEffect, useState } from 'react'

import { useCreateSubscriptionMutation } from '@/services/payments/PaymentsApi'
import { PaymentType, SubscriptionAmount, SubscriptionType } from '@/shared/types/public.enums'
import Image from 'next/image'
import { useRouter } from 'next/router'

import config from '../../../../config'

interface Props {
  paymentType: PaymentType
  subAmount: SubscriptionAmount
  subType: SubscriptionType
}

export const PayButton = ({ paymentType, subAmount, subType }: Props) => {
  const [amount, setAmount] = useState<number>(SubscriptionAmount.AMOUNT_1000)
  const [createSub] = useCreateSubscriptionMutation()
  const router = useRouter()

  useEffect(() => {
    setAmount(subAmount)
  }, [subAmount])
  const handleCheckout = async () => {
    const res = await createSub({
      amount,
      baseUrl: `${config.domain}/profile/settings/account-management`,
      paymentType,
      typeSubscription: subType,
    })
    const url = res.data?.url

    if (url) {
      void router.push(url)
    }
  }

  return (
    <div>
      <button onClick={handleCheckout} type="button">
        <Image
          alt={paymentType}
          className="hover:border hover:rounded-lg hover:border-dark-100 cursor-pointer"
          height={64}
          src={paymentType === 'STRIPE' ? '/stripeLogo.svg' : '/paypalLogo.svg'}
          width={96}
        />
      </button>
    </div>
  )
}
