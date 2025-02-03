import React from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { Avatar } from '@/features/avatar/avatar'
import { ProfileSettingsForm } from '@/features/profile-settings-form/profile-settings-form'
import { useGetProfileInfoQuery } from '@/services/profile/profileApi'

const GeneralInformation = () => {
  const { data: profileInfo, isSuccess } = useGetProfileInfoQuery()

  return (
    <div className="flex flex-col w-full justify-center pb-[15px] md:pb-0 items-stretch md:items-start  md:flex-row md:self-start md:pl-[24px]  md:pr-[64px] md:w-full md:gap-10">
      <div className="pt-0 flex flex-col items-center md:pt-6">
        <Avatar />
      </div>
      <div className="flex-1 pr-[15px] md:px-0">
        {isSuccess && <ProfileSettingsForm myProfileInfo={profileInfo} />}
      </div>
    </div>
  )
}

GeneralInformation.getLayout = getSettingsLayout
export default GeneralInformation
