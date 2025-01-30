import React from 'react'

import { CloseIcon } from '@/shared/ui/icons/closeIcon'
import { formatDate } from '@/shared/utils/formatDate'
import { Separator } from 'radix-ui'

type Props = {
  alertVariant: 'error' | 'info' | 'primary'
  children: React.ReactNode
  closeHandler: () => void
}
export const AlertItem = (props: Props) => {
  const { alertVariant, children, closeHandler } = props

  const baseClassName = 'backdrop-blur text-light-100 px-3 py-2 rounded-[8px]'

  const themeClassName =
    alertVariant === 'error'
      ? 'border-danger-700 bg-danger-50'
      : alertVariant === 'info'
        ? 'border-warning-700 bg-warning-50'
        : 'border-accent-700 backdrop-blur bg-dark-50'

  return (
    <div className={baseClassName + themeClassName}>
      <div className="flex flex-col w-full relative ">
        {children}

        <button className="absolute right-0" onClick={closeHandler} type={'button'}>
          <CloseIcon
            className="text-light-100 hover:text-accent-700 transition-colors"
            height="16"
            width="16"
          />
        </button>
      </div>
    </div>
  )
}
