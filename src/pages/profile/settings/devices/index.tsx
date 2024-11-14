import React from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { useGetDevicesQuery } from '@/services/profile/profileApi'
import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'

import { LogOut } from '../../../../../public'

const Devices = () => {
  const { data: devices } = useGetDevicesQuery()

  if (!devices) {
    return null
  }

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-h3 mb-[6px]">Current device</h3>
      <div className=" bg-dark-500 text-regular-16 border rounded-sm p-6 w-[280px] border-dark-100 text-light-900 w-full min-h-[120px] flex justify-between">
        <div className="flex  items-start gap-x-[12px]">
          <Image
            alt={devices.current.browserName}
            height={36}
            src={`/${devices.current.browserName.toLowerCase()}.svg`}
            width={36}
          />
          <div>
            <div className="text-bold-16 text-light-100 mb-[12px]">
              {devices.current.browserName}
            </div>
            <div className="text-regular-14 text-light-100 mb-[5px] ">{devices.current.ip}</div>
            <div className="text-medium-14 text-accent-100 mb-[5px] ">{devices.current.ip}</div>
          </div>
        </div>
        <div>
          <Button className="text-medium14 text-light-100 mt-auto gap-x-[12px]" variant="text">
            <LogOut />
            Log Out
          </Button>
        </div>
      </div>
      <div>
        <Button className="ml-auto mt-4" variant="outline">
          Terminate all other session
        </Button>
      </div>
    </div>
  )
}

Devices.getLayout = getSettingsLayout
export default Devices
