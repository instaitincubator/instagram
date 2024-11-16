import React from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import {
  useDeleteDeviceMutation,
  useGetDevicesQuery,
  useTerminateAllSessionsMutation,
} from '@/services/profile/profileApi'
import Button from '@/shared/ui/Button/Button'
import DeviceCard from '@/shared/ui/DeviceCard/DeviceCard'

const Devices = () => {
  const { data: devices } = useGetDevicesQuery()
  const [deleteDevice] = useDeleteDeviceMutation()
  const [terminateAllSessions] = useTerminateAllSessionsMutation()

  if (!devices) {
    return null
  }
  const currentDevice = devices.current

  const otherDevices = devices.others.filter(device => device.deviceId !== currentDevice.deviceId)
  const deleteDeviceHandler = (deviceId: number) => {
    deleteDevice(deviceId)
  }
  const terminateAllSessionsHandler = () => {
    terminateAllSessions()
  }
  const OtherDevicesList = otherDevices?.map(device => {
    return (
      <DeviceCard
        deleteDeviceHandler={deleteDeviceHandler}
        device={device}
        isOther
        key={device.deviceId}
      />
    )
  })

  return (
    <div className="flex flex-col w-full pr-[15px]">
      <h3 className="text-h3 mb-[6px]">Current device</h3>
      <DeviceCard device={currentDevice} isOther={false} />
      <div>
        <Button
          className="ml-auto mt-4 disabled:opacity-50 disabled:pointer-events-none w-full md:w-auto"
          disabled={!otherDevices.length}
          onClick={terminateAllSessionsHandler}
          variant="outline"
        >
          Terminate all other session
        </Button>
      </div>
      {!!otherDevices.length && (
        <div>
          <h3 className="text-h3 mb-[6px]">Current device</h3>
          {OtherDevicesList}
        </div>
      )}
    </div>
  )
}

Devices.getLayout = getSettingsLayout
export default Devices
