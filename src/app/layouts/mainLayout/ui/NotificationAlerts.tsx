import React from 'react'

import { useMarkAsReadMutation } from '@/app/layouts/mainLayout/api/NotificationApi'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { paymentsNotificationsActions } from '@/services/payments-notifications/payments-notifications'
import { Alert } from '@/shared/ui/Alert/Alert'
import { AlertItem } from '@/shared/ui/Alert/AlertItem'
import { formatDate } from '@/shared/utils/formatDate'
import { Separator } from 'radix-ui'

export const NotificationAlerts = () => {
  const paymentsNotions = useAppSelector(state => state.paymentsNotions.notifications)
  const [markAsRead] = useMarkAsReadMutation()
  const dispatch = useAppDispatch()

  return (
    <Alert>
      {paymentsNotions?.map(notion => {
        const EnterHandler = () => {
          // if (!notion.isRead) {
          //   markAsRead({ ids: [itemId] })
          // }
          deleteNotificationHandler()
        }
        const deleteNotificationHandler = () => {
          dispatch(paymentsNotificationsActions.deleteNotification(notion.id))
        }

        return (
          <AlertItem
            alertVariant="primary"
            closeHandler={deleteNotificationHandler}
            key={notion.id}
          >
            <span className="text-bold-14 text-light-100 ">Новое уведомление!</span>
            <span className="text-regular-14 text-light-100 pr-[30px]">{notion.message}</span>
            <span className="text-regular-14 text-light-100">{formatDate(notion.createdAt)}</span>
            <Separator.Root className="my-2 bg-light-100 h-[1px] w-full" />
            <button
              className="text-regular-14 text-light-100 hover:text-accent-700 transition-colors"
              onClick={EnterHandler}
              type="button"
            >
              mark as read
            </button>
          </AlertItem>
        )
      })}
    </Alert>
  )
}
