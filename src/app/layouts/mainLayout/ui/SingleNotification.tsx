import React, { useState } from 'react'

import {
  useDeleteNotificationMutation,
  useGetNotificationQuery,
  useMarkAsReadMutation,
} from '@/app/layouts/mainLayout/api/NotificationApi'
import { getNotificationParams } from '@/app/layouts/mainLayout/types/ApiTypes'
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

  return notification?.items.map((item, index) => {
    const isLastItem = index !== notification.items.length - 1
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
