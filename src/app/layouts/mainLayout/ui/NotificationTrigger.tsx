import React from 'react'

import { useGetNotificationQuery } from '@/app/layouts/mainLayout/api/NotificationApi'
import { getNotificationParams } from '@/app/layouts/mainLayout/types/ApiTypes'
import { Notification } from '@/shared/ui/icons/notification'
import { cn } from '@/shared/utils/cn'

const NotificationTrigger = () => {
  const defaultParams = {
    pageSize: 10,
    sortBy: 'notifyAt',
    sortDirection: 'desc',
  } as getNotificationParams

  const { data: notification } = useGetNotificationQuery(defaultParams)

  return (
    <div className="flex relative">
      <Notification />
      {notification?.notReadCount! > 0 && (
        <div className="bg-danger-500 h-4 w-4 rounded-full absolute right-0">
          <span
            className={cn('absolute ', {
              'right-[2px]  text-small ': notification?.notReadCount! > 10,
              'right-[4px] top-[-4px] text-regular-14': notification?.notReadCount! < 10,
            })}
          >
            {notification?.notReadCount!}
          </span>
        </div>
      )}
    </div>
  )
}

export default NotificationTrigger
