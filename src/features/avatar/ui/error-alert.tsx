import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

type Props = {
  className?: string
  error: string
} & Omit<ComponentPropsWithoutRef<'div'>, 'className'>

const ErrorAlert = forwardRef<ElementRef<'div'>, Props>(({ className, error, ...rest }, ref) => {
  const classObj = clsx(
    className,
    'flex justify-center bg-danger-900 gap-[7px] border border-danger-500 w-[420px] mb-6 px-[24px]'
  )

  return (
    <div className={classObj} ref={ref} {...rest}>
      <span className={'text-bold-14'}>Error!</span>
      <p className={'flex w-[247px] text-center text-regular-14'}>{error}</p>
    </div>
  )
})

export default ErrorAlert
