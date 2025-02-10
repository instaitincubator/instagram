import React, { useEffect, useState } from 'react'

import {
  useDeleteNotificationMutation,
  useGetNotificationQuery,
  useMarkAsReadMutation,
} from '@/app/layouts/mainLayout/api/NotificationApi'
import { NotificationItem, getNotificationParams } from '@/app/layouts/mainLayout/types/ApiTypes'
import { PaymentNoticeItem } from '@/shared/ui/PaymentNoticeItem/PaymentNoticeItem'

export const SingleNotification = () => {
  const defaultParams = {
    pageSize: 52,
    sortBy: 'notifyAt',
    sortDirection: 'desc',
  } as getNotificationParams
  const [params, setParams] = useState<getNotificationParams>(defaultParams)
  const { data: notification } = useGetNotificationQuery(params)
  const [markAsRead] = useMarkAsReadMutation()
  const [deleteNotification] = useDeleteNotificationMutation()
  const [sortedNotifications, setSortedNotifications] = useState<NotificationItem[] | undefined>([])

  const sortNotifications = () => {
    if (notification) {
      const noReadableNotions = notification?.items.filter(item => !item.isRead)
      const readableNotions = notification?.items.filter(item => item.isRead)

      readableNotions?.sort((a, b) => {
        const prevDate = new Date(a.createdAt)
        const nextDate = new Date(b.createdAt)

        return prevDate.getTime() - nextDate.getTime()
      })

      return [...noReadableNotions, ...readableNotions]
    }
  }

  useEffect(() => {
    setSortedNotifications(sortNotifications())
  }, [notification])

  return sortedNotifications?.map((item, index) => {
    const isLastItem = index !== sortedNotifications.length - 1
    const EnterHandler = (itemId: number) => {
      if (!item.isRead) {
        markAsRead({ ids: [itemId] })
      }
    }
    const deleteNotificationHandler = (itemId: number) => {
      deleteNotification(itemId)
    }

    return (
      <PaymentNoticeItem
        deleteNotification={deleteNotificationHandler}
        isLastItem={isLastItem}
        key={item.id}
        mouseEnterHandler={EnterHandler}
        notion={item}
      />
    )
  })
}
