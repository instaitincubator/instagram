import { PropsWithChildren, ReactElement } from 'react'

import { LayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import { ProfileSettingTabs } from '@/widgets/profileSettingTabs/ProfileSettingTabs'
import { NextPage } from 'next'

const SettingsLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props

  return (
    <LayoutWithSidebar>
      <div className="pr-[64px] pl-[24px]">
        <div className="pb-6 pt-9">
          <ProfileSettingTabs />
        </div>
        <div>{children}</div>
      </div>
    </LayoutWithSidebar>
  )
}

export const getSettingsLayout = (page: ReactElement) => {
  return <SettingsLayout>{page}</SettingsLayout>
}
