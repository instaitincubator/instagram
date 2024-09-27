import React from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { Avatar } from '@/features/avatar/avatar'
import { ProfileSettingsForm } from '@/features/profile-settings-form/profile-settings-form'
import { useGetProfileInfoQuery } from '@/services/profile/profileApi'

const GeneralInformation = () => {
  const { data: profileInfo, isSuccess } = useGetProfileInfoQuery()

  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:self-start md:pl-[24px] md:items-start md:pr-[64px] md:w-full md:gap-10">
      <div className="pt-6 w-full">
        <Avatar />
      </div>
      {isSuccess && <ProfileSettingsForm myProfileInfo={profileInfo} />}
    </div>
  )
}

GeneralInformation.getLayout = getSettingsLayout
export default GeneralInformation
