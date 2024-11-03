import React from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Card } from '@/shared/ui/Card/Card'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/Radio-group/RadioGroup'

const AccountManagement = () => {
  const { t } = useTranslation()

  return (
    <div>
      <div className="pb-[42px]">
        <span>{t.pages.profile.accountType}</span>
        <Card className="py-[14px] px-[20px] mt-[5px]">
          <RadioGroup className="flex flex-col gap-5" defaultValue="personal">
            {/*default value depend of the personal information from server*/}
            <RadioGroupItem value="personal">{t.pages.profile.personal}</RadioGroupItem>
            <RadioGroupItem value="business">{t.pages.profile.business}</RadioGroupItem>
          </RadioGroup>
        </Card>
      </div>
      <div>
        <span>{t.pages.profile.subscriptionCosts}</span>
        <Card className="py-[14px] px-[20px] mt-[5px]">
          <RadioGroup className="flex flex-col gap-5" defaultValue="day">
            <RadioGroupItem value="day">{t.pages.profile.perDay}</RadioGroupItem>
            <RadioGroupItem value="week">{t.pages.profile.perWeek}</RadioGroupItem>
            <RadioGroupItem value="month">{t.pages.profile.perMonth}</RadioGroupItem>
          </RadioGroup>
        </Card>
      </div>
    </div>
  )
}

AccountManagement.getLayout = getSettingsLayout
export default AccountManagement
