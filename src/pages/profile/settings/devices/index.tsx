import React from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { useGetDevicesQuery } from '@/services/profile/profileApi'
import Image from 'next/image'

const Devices = () => {
  const { data: devices } = useGetDevicesQuery()

  if (!devices) {
    return null
  }

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-h3 mb-[6px]">Current device</h3>
      <div className=" bg-dark-500 text-regular-16 border rounded-sm p-6 h-[85px] w-[280px] border-dark-100 text-light-900 w-full min-h-[120px]">
        <Image
          alt={devices.current.browserName}
          height={36}
          src={`/${devices.current.browserName.toLowerCase()}.svg`}
          width={36}
        />
      </div>
    </div>
  )
}

Devices.getLayout = getSettingsLayout
export default Devices
