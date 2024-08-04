import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/utils/cn'
import Image from 'next/image'

export type CheckboxProps = ComponentPropsWithoutRef<'div'> &
  Partial<{
    disabled?: boolean
    label?: string
    onChange?: (checked: boolean) => void
    value?: boolean
  }>

export const Checkbox = forwardRef<ElementRef<'div'>, CheckboxProps>(
  ({ className, disabled = false, label, onChange, value, ...props }, ref) => {
    return (
      <div className={cn('flex select-none gap-2 items-center', className)} ref={ref} {...props}>
        <div className="relative group">
          <div
            className={cn(
              'w-[18px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[18px] border-[2px] border-light-100 rounded-sm z-20',
              disabled && 'border-[2px] border-light-900',
              value && disabled && 'bg-light-900',
              value && 'bg-light-100 '
            )}
            onClick={() => !disabled && onChange?.(!value)}
          >
            {value && (
              <div className="flex items-center justify-center">
                <Image alt="checked" height={24} src="/checkIcon.svg" width={24} />
              </div>
            )}
          </div>
          <div className="z-10 absolute w-[34px] h-[34px] group-hover:bg-dark-300 group-active:bg-dark-100 group-focus:bg-dark-500  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl"></div>
        </div>
        {label && <label className="pl-[15px]">{label}</label>}
      </div>
    )
  }
)
