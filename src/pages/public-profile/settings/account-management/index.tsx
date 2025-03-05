import React, { useEffect, useState } from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { PayButton } from '@/pages/public-profile/settings/account-management/ui/PayButton'
import PayConfirmModal from '@/pages/public-profile/settings/account-management/ui/PayConfirmModal'
import {
  useCancelAutoRenewalMutation,
  useGetCurrentSubscriptionQuery,
} from '@/services/payments/PaymentsApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { PaymentType, SubscriptionAmount, SubscriptionType } from '@/shared/types/public.enums'
import { Card } from '@/shared/ui/Card/Card'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/Radio-group/RadioGroup'
import { formatDate } from '@/shared/utils/formatDate'

const AccountManagement = () => {
  const { t } = useTranslation()

  const [subPrice, setSubPrice] = useState<SubscriptionAmount>(SubscriptionAmount.AMOUNT_1000)
  const [subType, setSubType] = useState<SubscriptionType>(SubscriptionType.DAY)
  const { data: currentSub } = useGetCurrentSubscriptionQuery()
  const [status, setStatus] = useState(currentSub ? 'personal' : 'business')
  const [cancelRenewal, { isLoading }] = useCancelAutoRenewalMutation()

  useEffect(() => {
    if (currentSub) {
      setStatus('business')
    }
  }, [currentSub])

  const handleSubChoice = (value: string) => {
    switch (value) {
      case SubscriptionType.MONTHLY:
        setSubPrice(SubscriptionAmount.AMOUNT_10000)
        setSubType(SubscriptionType.MONTHLY)
        break
      case SubscriptionType.WEEKLY:
        setSubPrice(SubscriptionAmount.AMOUNT_5000)
        setSubType(SubscriptionType.WEEKLY)
        break
      default:
        setSubPrice(SubscriptionAmount.AMOUNT_1000)
        setSubType(SubscriptionType.DAY)
    }
  }

  return (
    <div>
      {!!currentSub?.data.length && (
        <div className="pb-[42px]">
          <span className="text-h3">{t.payment.CurrentSubscription}</span>
          <Card className="py-[14px] px-[20px] mt-[5px]">
            <div className="flex gap-12">
              <div className="flex flex-col gap-3">
                <span className="opacity-50 text-regular-14">{t.payment.ExpireAt}</span>
                <span>{formatDate(currentSub.data[currentSub.data.length - 1].dateOfPayment)}</span>
              </div>
              <div className="flex flex-col gap-3 text-regular-14">
                <span className="opacity-50">{t.payment.NextPayment}</span>
                <span>
                  {formatDate(currentSub.data[currentSub.data.length - 1].endDateOfSubscription)}
                </span>
              </div>
            </div>
          </Card>
          <div className="flex mt-[15px]">
            <Checkbox
              className="ml-[15px] mb-[3px]"
              disabled={!currentSub.hasAutoRenewal || isLoading}
              onChange={() => cancelRenewal()}
              value={currentSub.hasAutoRenewal}
            />
            <span className="pl-5 text-regular-14">{t.payment.AutoRenewal}</span>
          </div>
        </div>
      )}
      <div className="pb-[42px]">
        <span className="text-h3">{t.pages.profile.accountType}</span>
        <Card className="py-[14px] px-[20px] mt-[5px]">
          <RadioGroup
            className="flex flex-col gap-5"
            defaultValue={status}
            onValueChange={setStatus}
            value={status}
          >
            <RadioGroupItem value="personal">{t.pages.profile.personal}</RadioGroupItem>
            <RadioGroupItem value="business">{t.pages.profile.business}</RadioGroupItem>
          </RadioGroup>
        </Card>
      </div>
      {status === 'business' && (
        <div>
          <div>
            <span className="text-h3">{t.pages.profile.subscriptionCosts}</span>
            <Card className="py-[14px] px-[20px] mt-[5px]">
              <RadioGroup
                className="flex flex-col gap-5"
                defaultValue="DAY"
                onValueChange={handleSubChoice}
              >
                <RadioGroupItem value={SubscriptionType.DAY}>
                  10$ {t.pages.profile.perDay}
                </RadioGroupItem>
                <RadioGroupItem value={SubscriptionType.WEEKLY}>
                  50$ {t.pages.profile.perWeek}
                </RadioGroupItem>
                <RadioGroupItem value={SubscriptionType.MONTHLY}>
                  100$ {t.pages.profile.perMonth}
                </RadioGroupItem>
              </RadioGroup>
            </Card>
          </div>
          <div className="flex pt-6 items-center gap-10 justify-self-end">
            <PayButton paymentType={PaymentType.PAYPAL} subAmount={subPrice} subType={subType} />
            <span className="text-regular-14">{t.profileSettings.or}</span>
            <PayButton paymentType={PaymentType.STRIPE} subAmount={subPrice} subType={subType} />
          </div>
        </div>
      )}
      <PayConfirmModal />
    </div>
  )
}

AccountManagement.getLayout = getSettingsLayout
export default AccountManagement
