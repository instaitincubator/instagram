import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

export type CheckboxProps = ComponentPropsWithoutRef<'div'> &
  Partial<{
    checked?: boolean
    disabled?: boolean
    label?: string
    onValueChange?: (checked: boolean) => void
  }>

export const Checkbox = forwardRef<ElementRef<'div'>, CheckboxProps>(
  ({ checked, className, disabled = false, label, onValueChange, ...props }, ref) => {
    return (
      <div
        className={clsx('flex select-none gap-2 items-center relative', className)}
        ref={ref}
        {...props}
      >
        <div className="relative group">
          <div
            className={clsx(
              'w-[18px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[18px] border-[2px] border-light-100 rounded-sm z-20',
              disabled && 'border-[2px] border-light-900',
              checked && disabled && 'bg-light-900',
              checked && 'bg-light-100'
            )}
            onClick={() => !disabled && onValueChange?.(!checked)}
          >
            {checked && (
              <div className="flex items-center justify-center">
                <Image alt="checked" height={24} src="/checkIcon.svg" width={24} />
              </div>
            )}
          </div>
          <div className="z-10 absolute w-[34px] h-[34px] group-hover:bg-dark-300 group-active:bg-dark-100 group-focus:bg-dark-500  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl"></div>
        </div>
        {label && <label className="text-regular-14 pl-[15px]">{label}</label>}
      </div>
    )
  }
)
