import React from 'react'

import { Device } from '@/shared/types/ApiTypes/ProfileApiTypes'
import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'

import { LogOut } from '../../../../public'

type Props = {
  deleteDeviceHandler?: (id: number) => void
  device: Device

  isOther: boolean
}
enum BrowserList {
  Brave = 'brave',
  Chrome = 'chrome',
  Edge = 'edge',
  Explorer = 'explorer',
  Firefox = 'firefox',
  Opera = 'opera',
  Safari = 'safari',
  Uc = 'uc',
  Yandex = 'yandex',
}
const DeviceCard = ({ deleteDeviceHandler, device, isOther }: Props) => {
  const browserName = device.browserName
  const date = new Date(device.lastActive)

  let browserIcon = ''

  if (browserName in BrowserList) {
    browserIcon = browserName.toLowerCase()
  } else if (device.deviceType === 'mobile') {
    browserIcon = 'mobile'
  } else {
    browserIcon = 'desktop'
  }

  return (
    <div className=" bg-dark-500 text-regular-16 border rounded-sm p-6 w-[280px] border-dark-100 text-light-900 w-full min-h-[120px] flex justify-between">
      <div className="flex  items-start gap-x-[12px]">
        <Image alt={device.browserName} height={36} src={`/${browserIcon}.svg`} width={36} />
        <div>
          <div className="text-bold-16 text-light-100 mb-[12px]">{device.browserName}</div>
          <div className="text-regular-14 text-light-100 mb-[5px] ">IP: {device.ip}</div>
          <div
            className={
              'text-medium-14 ' + (isOther ? 'text-light-100 ' : 'text-accent-100 ') + 'mb-[5px] '
            }
          >
            {isOther ? `Last visit: ${date.toLocaleDateString()}` : 'Online'}
          </div>
        </div>
      </div>
      <div>
        {isOther && (
          <Button
            className="text-medium14 text-light-100 mt-auto gap-x-[12px]"
            onClick={() => {
              deleteDeviceHandler?.(device.deviceId)
            }}
            variant="text"
          >
            <LogOut />
            Log Out
          </Button>
        )}
      </div>
    </div>
  )
}

export default DeviceCard
