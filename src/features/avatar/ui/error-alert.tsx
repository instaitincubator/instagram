import React, { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useAppSelector } from '@/app/store'
import { errorActions } from '@/services/notification/error-notification'
import { clsx } from 'clsx'

type Props = {
  className?: string
} & Omit<ComponentPropsWithoutRef<'div'>, 'className'>

const ErrorAlert = forwardRef<ElementRef<'div'>, Props>(({ className, ...rest }, ref) => {
  const dispatch = useDispatch()
  const notions = useAppSelector(state => state.errorNotions.message)
  const error = useAppSelector(state => state.errorNotions.error)

  const classObj = clsx(
    className,
    'bg-danger-900 border py-[6px] w-[300px] border-danger-500 text-center md:w-[444px] mb-6 px-[24px]'
  )

  return (
    <div className={classObj} ref={ref} {...rest}>
      <span className="text-bold-14 pr-4px">Error! </span>
      <span>{notions}</span>
    </div>
  )
})

export default ErrorAlert
