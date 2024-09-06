import { Tabs } from '@/shared/ui/Tabs'
import { useRouter } from 'next/router'

export const ProfileSettingTabs = () => {
  const optionArray = [
    { label: 'General information', value: 'general-information' },
    { label: 'Devices', value: 'devices' },
    { label: 'Account Management', value: 'account-management' },
    { label: 'My payments', value: 'my-payments' },
  ]

  const router = useRouter()

  const changeMenu = (value: string) => {
    router.push(`/settings/${value}`)
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
