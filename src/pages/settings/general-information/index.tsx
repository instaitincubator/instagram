import React from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { Avatar } from '@/features/avatar/avatar'
import { ProfileSettingsForm } from '@/features/profile-settings-form/profile-settings-form'

const GeneralInformation = () => {
  return (
    <div className="flex flex-col items-center md:flex-row md:self-start md:pl-[24px] md:items-start md:pr-[64px] md:w-full md:gap-10">
      <div className="w-[200px] pt-6">
        <Avatar />
      </div>
      <ProfileSettingsForm />
    </div>
  )
}

GeneralInformation.getLayout = getSettingsLayout
export default GeneralInformation
