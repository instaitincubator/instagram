import React, { useState } from 'react'

import { CloseIcon } from '@/shared/ui/icons/closeIcon'
import { cn } from '@/shared/utils/cn'

type Props = {
  alertVariant: 'error' | 'info' | 'primary'
  children: React.ReactNode
  closeHandler: () => void
}

const ALERT_VARIANTS = {
  error: 'border-danger-700 bg-danger-50',
  info: 'border-warning-700 bg-warning-50',
  primary: 'border-accent-700 bg-dark-50',
}

export const AlertItem = (props: Props) => {
  const { alertVariant, children, closeHandler } = props
  const baseClassName = 'backdrop-blur text-light-100 px-3 py-2 rounded-[8px]'

  return (
    <div className={cn(baseClassName, ALERT_VARIANTS[alertVariant])}>
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
