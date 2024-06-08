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
      <div className={clsx('flex select-none gap-2 items-center', className)} ref={ref} {...props}>
        <div
          className={clsx(
            'w-[18px] relative h-[18px] border-[2px] border-light-100 rounded-sm ',
            'before:h-[34px] before:w-[34px] before:hover:absolute before:active:bg-dark-100/30 before:hover:bg-dark-300/30 before:focus:bg-dark-500/30',
            'before:rounded-3xl before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:z-[-1]',
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
        {label && <label className="text-regular-14 text-light-100 ">{label}</label>}
      </div>
    )
  }
)
