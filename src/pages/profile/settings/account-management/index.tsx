import React, { useState } from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import PayConfirmModal from '@/pages/profile/settings/account-management/payConfirmModal/payConfirmModal'
import { useGetSubscriptionQuery } from '@/services/payments/PaymentsApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Card } from '@/shared/ui/Card/Card'
import { StripeButton } from '@/shared/ui/Payment/Stripe'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/Radio-group/RadioGroup'
import Image from 'next/image'

interface Props {
  slug: string | string[]
}

const AccountManagement = ({ slug }: Props) => {
  const { t } = useTranslation()
  const [status, setStatus] = useState('personal')
  const [subPrice, setSubPrice] = useState<number>(1000)
  const [subTitle, setSubTitle] = useState<string>('1 day subscription')
  const { data: sub } = useGetSubscriptionQuery({})

  const handleSubChoice = (value: string) => {
    switch (value) {
      case 'month':
        setSubPrice(10000)
        setSubTitle('month subscription')
        break
      case 'week':
        setSubPrice(5000)
        setSubTitle('week subscription')
        break
      default:
        setSubPrice(1000)
        setSubTitle('1 day subscription')
    }
  }

  return (
    <div>
      {sub && <div>{sub.paymentType}</div>}
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
                onValueChange={handleSubChoice}
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
            <StripeButton subAmount={subPrice} subTitle={subTitle} />
          </div>
        </div>
      )}
      <PayConfirmModal slug={slug} />
    </div>
  )
}

AccountManagement.getLayout = getSettingsLayout
export default AccountManagement
