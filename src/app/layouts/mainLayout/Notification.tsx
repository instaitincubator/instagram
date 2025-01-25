import { useEffect } from 'react'

import { SingleNotification } from '@/app/layouts/mainLayout/SingleNotification'
import { Notification } from '@/shared/ui/icons/notification'
import { getToken } from '@/shared/utils/storage'
import { Popover, Separator } from 'radix-ui'
import { io } from 'socket.io-client'

export const NotificationComponent = () => {
  // const defaultParams = {
  //   pageSize: 10,
  //   sortBy: 'notifyAt',
  //   sortDirection: 'desc',
  // } as getNotificationParams
  //
  // const { data: notification } = useGetNotificationQuery(defaultParams)

  useEffect(() => {
    const socket = io('https://inctagram.work', {
      query: {
        accessToken: getToken(),
      },
    })

    socket.on('notifications', notification => {
      console.log('Received notification:', notification)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <Popover.Root>
      <Popover.Trigger className="hidden sm:flex">
        <Notification />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          className="bg-dark-500 border-[1px] min-w-[300px] max-w-[355px] border-dark-300 rounded py-4 pl-4 pr-1 z-20"
          sideOffset={5}
        >
          <span className="text-bold-14 text-light-100">уведомления</span>
          <Separator.Root className="my-2 mr-6 bg-dark-100 h-[1px]" />
          <div className="max-h-[400px] overflow-auto pr-4">
            <SingleNotification />
          </div>
          <Popover.Arrow className="fill-[#333] ml-1" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
