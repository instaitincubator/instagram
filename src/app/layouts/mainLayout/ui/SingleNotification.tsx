import React, { useState } from 'react'

import {
  useDeleteNotificationMutation,
  useGetNotificationQuery,
  useMarkAsReadMutation,
} from '@/app/layouts/mainLayout/api/NotificationApi'
import { getNotificationParams } from '@/app/layouts/mainLayout/types/ApiTypes'
import { formatDate } from '@/shared/utils/formatDate'
import Image from 'next/image'
import { Separator } from 'radix-ui'

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
      <div
        className="flex flex-col w-full relative "
        key={item.id}
        onMouseEnter={() => EnterHandler(item.id)}
      >
        {!item.isRead && <span className="text-bold-14 text-light-100 ">Новое уведомление!</span>}
        <span className="text-regular-14 text-light-100 pr-[30px]">{item.message}</span>
        <span className="text-regular-14 text-dark-100">{formatDate(item.createdAt)}</span>

        {isLastItem && <Separator.Root className="my-2 bg-dark-100 h-[1px] w-full" />}
        <button
          className="absolute right-0"
          onClick={() => deleteNotificationHandler(item.id)}
          type={'button'}
        >
          <Image alt="close" height={16} src="/deleteNotification.svg" width={16}></Image>
        </button>
      </div>
    )
  })
}
