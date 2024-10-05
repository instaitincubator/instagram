import { useTranslation } from '@/shared/hooks/useTranslation'
import { Tabs } from '@/shared/ui/Tabs'
import { useRouter } from 'next/router'

export const ProfileSettingTabs = () => {
  const { t } = useTranslation()
  const optionArray = [
    { label: t.profileTabs.generalInformation, value: 'general-information' },
    { label: t.profileTabs.devices, value: 'devices' },
    { label: t.profileTabs.accountManagement, value: 'account-management' },
    { label: t.profileTabs.myPayments, value: 'my-payments' },
  ]

  const router = useRouter()
  const changeMenu = (value: string) => {
    router.push(`/profile/settings/${value}`)
  }

  return (
    <div>
      <Tabs
        defaultValue="general-information"
        onValueChange={changeMenu}
        options={optionArray}
      ></Tabs>
    </div>
  )
}
