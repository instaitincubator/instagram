import React, { useState } from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Card } from '@/shared/ui/Card/Card'
import { StripeButton } from '@/shared/ui/Payment/Stripe'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/Radio-group/RadioGroup'
import Image from 'next/image'

const AccountManagement = () => {
  const { t } = useTranslation()
  const [status, setStatus] = useState('personal')
  const [paymentMethod, setPaymentMethod] = useState('')

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
            />
            <span className="text-regular-14">{t.profileSettings.or}</span>
            <StripeButton />
          </div>
        </div>
      )}
    </div>
  )
}

AccountManagement.getLayout = getSettingsLayout
export default AccountManagement
