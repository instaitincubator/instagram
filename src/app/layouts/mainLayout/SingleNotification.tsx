import { useGetNotificationQuery } from '@/app/layouts/mainLayout/NotificationApi'
import { formatDate } from '@/shared/utils/formatDate'
import { Separator } from 'radix-ui'

export const SingleNotification = () => {
  const { data: notification } = useGetNotificationQuery({})

  return notification?.items.map((item, index) => {
    const isLastItem = index !== notification.items.length - 1

    return (
      <div className="flex flex-col" key={item.id}>
        {item.isRead && <span className="text-bold-14 text-light-100">Новое уведомление!</span>}
        <span className="text-regular-14 text-light-100">{item.message}</span>
        <span className="text-regular-14 text-dark-100">{formatDate(item.createdAt)}</span>
        {isLastItem && <Separator.Root className=" my-2 bg-dark-100 h-[1px]" />}
      </div>
    )
  })
}
