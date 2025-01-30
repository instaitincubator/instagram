import React from 'react'

import { useMarkAsReadMutation } from '@/app/layouts/mainLayout/api/NotificationApi'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { paymentsNotificationsActions } from '@/services/payments-notifications/payments-notifications'
import { formatDate } from '@/shared/utils/formatDate'
import Image from 'next/image'
import { Separator } from 'radix-ui'

export const NotificationAlerts = () => {
  const paymentsNotions = useAppSelector(state => state.paymentsNotions.notifications)
  const [markAsRead] = useMarkAsReadMutation()
  const dispatch = useAppDispatch()

  return (
    <div className="fixed bottom-2 right-2 flex flex-col gap-2">
      {paymentsNotions.map(notion => {
        const deleteNotificationHandler = (itemId: number) => {
          dispatch(paymentsNotificationsActions.deleteNotification(itemId))
        }
        const EnterHandler = (itemId: number) => {
          if (!notion.isRead) {
            markAsRead({ ids: [itemId] })
            deleteNotificationHandler(itemId)
          }
        }

        return (
          <div
            className="border-accent-300 backdrop-blur bg-accent-100 text-light-100 px-3 py-2 rounded-[8px]"
            key={notion.id}
          >
            <div
              className="flex flex-col w-full relative "
              key={notion.id}
              // onMouseEnter={() => EnterHandler(notion.id)}
            >
              {!notion.isRead && (
                <span className="text-bold-14 text-light-100 ">Новое уведомление!</span>
              )}
              <span className="text-regular-14 text-light-100 pr-[30px]">{notion.message}</span>
              <span className="text-regular-14 text-dark-100">{formatDate(notion.createdAt)}</span>
              <Separator.Root className="my-2 bg-amber-100 h-[1px] w-full" />
              <button
                className="text-regular-14"
                onClick={() => EnterHandler(notion.id)}
                type="button"
              >
                mark as read
              </button>

              <button
                className="absolute right-0"
                onClick={() => deleteNotificationHandler(notion.id)}
                type={'button'}
              >
                <Image alt="close" height={16} src="/deleteNotification.svg" width={16}></Image>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
