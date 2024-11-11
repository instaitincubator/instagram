import React, { useState } from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { useCreatePaymentIntentMutation } from '@/services/payment/paymentApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Card } from '@/shared/ui/Card/Card'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/Radio-group/RadioGroup'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import Image from 'next/image'

const AccountManagement = () => {
  const { t } = useTranslation()
  const [status, setStatus] = useState('personal')
  // --------------------------------------
  const [createPaymentIntent] = useCreatePaymentIntentMutation()

  const [paymentMethod, setPaymentMethod] = useState('')

  const stripe = useStripe()
  const elements = useElements()
  const getAmount = (method: string) => {
    switch (method) {
      case 'day':
        return 1000 // 10$ в центах
      case 'week':
        return 5000 // 50$ в центах
      case 'month':
        return 10000 // 100$ в центах
      default:
        return 0
    }
  }
  const handlePayment = async () => {
    const amount = getAmount(paymentMethod)

    try {
      const response = await createPaymentIntent({ amount }).unwrap()
      const clientSecret = response.clientSecret
      // Дальше используйте clientSecret для обработки платежа
    } catch (error) {
      console.error('Error creating payment intent:', error)
    }
  }

  // ---------------------
  return (
    <div>
      <div className="pb-[42px]">
        <span>{t.pages.profile.accountType}</span>
        <Card className="py-[14px] px-[20px] mt-[5px]">
          <RadioGroup
            className="flex flex-col gap-5"
            defaultValue={status}
            onValueChange={setStatus}
          >
            {/*default value depend of the personal information from server*/}
            <RadioGroupItem value="personal">{t.pages.profile.personal}</RadioGroupItem>
            <RadioGroupItem value="business">{t.pages.profile.business}</RadioGroupItem>
          </RadioGroup>
        </Card>
      </div>
      {status === 'business' && (
        <div>
          <div>
            <span>{t.pages.profile.subscriptionCosts}</span>
            <Card className="py-[14px] px-[20px] mt-[5px]">
              <RadioGroup
                className="flex flex-col gap-5"
                defaultValue="day"
                onValueChange={setPaymentMethod}
              >
                <RadioGroupItem value="day">10$ {t.pages.profile.perDay}</RadioGroupItem>
                <RadioGroupItem value="week">50$ {t.pages.profile.perWeek}</RadioGroupItem>
                <RadioGroupItem value="month">100$ {t.pages.profile.perMonth}</RadioGroupItem>
              </RadioGroup>
            </Card>
          </div>
          <div className="flex pt-6 items-center gap-10 justify-self-end">
            <Image
              alt="paypal"
              className="hover:border hover:rounded-lg hover:border-dark-100 cursor-pointer"
              height={64}
              src="/paypalLogo.svg"
              width={96}
            ></Image>
            <span className="text-regular-14">{t.profileSettings.or}</span>
            <Image
              alt="stripe"
              className="hover:border hover:rounded-lg hover:border-dark-100 cursor-pointer"
              height={64}
              onClick={handlePayment}
              src="/stripeLogo.svg"
              width={96}
            ></Image>
          </div>
        </div>
      )}
    </div>
  )
}

AccountManagement.getLayout = getSettingsLayout
export default AccountManagement
