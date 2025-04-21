import { useEffect, useState } from 'react'

import NotificationTrigger from '@/app/layouts/mainLayout/ui/NotificationTrigger'
import { SingleNotification } from '@/app/layouts/mainLayout/ui/SingleNotification'
import { useAppDispatch } from '@/app/store'
import { paymentsNotificationsActions } from '@/services/payments-notifications/payments-notifications'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { getToken } from '@/shared/utils/storage'
import { Popover, Separator } from 'radix-ui'
import { io } from 'socket.io-client'

export const NotificationComponent = () => {
  const dispatch = useAppDispatch()
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>()
  const { t } = useTranslation()

  useEffect(() => {
    const socket = io('https://inctagram.work', {
      query: {
        accessToken: getToken(),
      },
    })

    socket.on('notifications', notification => {
      dispatch(paymentsNotificationsActions.addNotification(notification))
      setTimeoutId((_: unknown) =>
        setTimeout(() => {
          dispatch(paymentsNotificationsActions.deleteNotification(notification.id))
        }, 10000)
      )
    })

    return () => {
      socket.disconnect()
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <Popover.Root>
      <Popover.Trigger className="hidden sm:flex ">
        <NotificationTrigger />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          className="bg-dark-500 border-[1px] min-w-[300px] max-w-[355px] border-dark-300 rounded py-4 pl-4 pr-1 z-20"
          sideOffset={5}
        >
          <span className="text-bold-14  text-light-100">{t.paymentNotification.title}</span>
          <Separator.Root className="my-2 mr-4 bg-dark-100 h-[1px]" />
          <div className="max-h-[400px] overflow-auto pr-2">
            <SingleNotification />
          </div>
          <Popover.Arrow className="fill-[#333] ml-1" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
