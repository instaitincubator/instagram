import { useEffect, useState } from 'react'

import NotificationTrigger from '@/app/layouts/mainLayout/ui/NotificationTrigger'
import { SingleNotification } from '@/app/layouts/mainLayout/ui/SingleNotification'
import { useAppDispatch } from '@/app/store'
import { paymentsNotificationsActions } from '@/services/payments-notifications/payments-notifications'
import { getToken } from '@/shared/utils/storage'
import { Popover, Separator } from 'radix-ui'
import { io } from 'socket.io-client'

export const NotificationComponent = () => {
  const [paymentAlert, setPaymentAlert] = useState()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const socket = io('https://inctagram.work', {
      query: {
        accessToken: getToken(),
      },
    })

    socket.on('notifications', notification => {
      setPaymentAlert(notification)
      dispatch(paymentsNotificationsActions.addNotification(notification))
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  console.log(paymentAlert)

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
          <span className="text-bold-14 text-light-100">уведомления</span>
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
