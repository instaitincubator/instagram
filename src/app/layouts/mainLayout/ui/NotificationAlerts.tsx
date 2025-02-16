import React from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import { paymentsNotificationsActions } from '@/services/payments-notifications/payments-notifications'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Alert } from '@/shared/ui/Alert/Alert'
import { AlertItem } from '@/shared/ui/Alert/AlertItem'
import { formatDate } from '@/shared/utils/formatDate'
import { hasDateFormat } from '@/shared/utils/hasDate'
import { Separator } from 'radix-ui'

export const NotificationAlerts = () => {
  const paymentsNotions = useAppSelector(state => state.paymentsNotions.notifications)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  return (
    <Alert>
      {paymentsNotions?.map(notion => {
        const message = notion.message
        const EnterHandler = () => {
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
            <span className="text-regular-14 text-light-100">{formatDate(notion.createdAt)}</span>
            <Separator.Root className="my-[12px] bg-dark-100 h-[1px] w-full" />
            <button
              className="text-regular-14 text-light-100 hover:text-accent-700 transition-colors"
              onClick={EnterHandler}
              type="button"
            >
              {t.paymentNotification.readButtonTitle}
            </button>
          </AlertItem>
        )
      })}
    </Alert>
  )
}
