import { PropsWithChildren, ReactElement } from 'react'

import { PublicLayoutWithSidebar } from '@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar'
import { ProfileSettingTabs } from '@/widgets/profileSettingTabs/ProfileSettingTabs'
import { NextPage } from 'next'

const SettingsLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props

  return (
    <PublicLayoutWithSidebar>
      <div className="pl-[14px] px-0 md:pr-[64px] md:pl-[24px]">
        <div className="pb-6 overflow-x-auto scroll-hidden pt-6 md:pt-9">
          <ProfileSettingTabs />
        </div>
        <div>{children}</div>
      </div>
    </PublicLayoutWithSidebar>
  )
}

export const getSettingsLayout = (page: ReactElement) => {
  return <SettingsLayout>{page}</SettingsLayout>
}
