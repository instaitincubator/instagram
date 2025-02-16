import React from 'react'

import { PaymentNotyfication } from '@/app/layouts/mainLayout/types/ApiTypes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { CloseIcon } from '@/shared/ui/icons/closeIcon'
import { formatDate } from '@/shared/utils/formatDate'
import { hasDateFormat } from '@/shared/utils/hasDate'
import { Separator } from 'radix-ui'

type Props = {
  deleteNotification: (id: number) => void
  isLastItem: boolean
  mouseEnterHandler?: (id: number) => void
  notion: PaymentNotyfication
  readHandler?: (id: number) => void
}

export const PaymentNoticeItem = (props: Props) => {
  const { deleteNotification, isLastItem, mouseEnterHandler, notion, readHandler } = props
  const { t } = useTranslation()
  const message = notion.message

  return (
    <div
      className="flex flex-col w-full relative "
      onMouseEnter={() => mouseEnterHandler?.(notion.id)}
    >
      {!notion.isRead && (
        <span className="text-bold-14 text-light-100 ">
          {t.paymentNotification.notificationsTitle}
        </span>
      )}

      <span className="text-regular-14 text-light-100 pr-[30px]">
        {hasDateFormat(message) && (
          <span>
            {t.paymentNotification.message.subscriptionActivated} {message.slice(-11)}
          </span>
        )}
        {hasDateFormat(message) || <span>{t.paymentNotification.message[message]}</span>}
      </span>
      <span className="text-regular-14 text-light-900">{formatDate(notion.createdAt)}</span>
      {isLastItem && <Separator.Root className="my-[12px] bg-dark-100 h-[1px] w-full" />}
      {readHandler && (
        <button
          className="text-regular-14 text-light-100 hover:text-accent-700 transition-colors"
          onClick={() => readHandler(notion.id)}
          type="button"
        >
          {t.paymentNotification.readButtonTitle}
        </button>
      )}

      <button
        className="absolute right-0"
        onClick={() => deleteNotification(notion.id)}
        type={'button'}
      >
        <CloseIcon
          className="text-light-100 hover:text-accent-700 transition-colors"
          height="16"
          width="16"
        />
      </button>
    </div>
  )
}
