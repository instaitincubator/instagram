'use client'

import * as React from 'react'

import { cn } from '@/shared/utils/cn'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { FaCircle } from 'react-icons/fa6'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />
})

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ children, className, ...props }, ref) => {
  return (
    <div className="flex gap-2 items-center">
      <RadioGroupPrimitive.Item
        className={cn(
          'h-5 w-5 rounded-full border-2 border-light-100 hover:bg-dark-100 text-light-100 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex w-fit m-auto">
          <FaCircle className="h-2.5 w-2.5" id={props.value} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <label className="text-regular-14 text-light-100" htmlFor={props.value}>
        {children}
      </label>
    </div>
  )
})

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
