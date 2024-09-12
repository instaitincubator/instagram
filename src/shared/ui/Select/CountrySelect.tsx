import React from 'react'

import { SelectProps } from '@/shared/ui/Select/types'
import { cn } from '@/shared/utils/cn'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import { SelectItemProps } from '@radix-ui/react-select'

export const CountrySelect: React.FC<SelectProps> = ({
  className,
  disabled = false,
  label,
  onChange,
  options,
  placeholder,
  value,
}) => {
  const items = options.map((o, index) => {
    return (
      <SelectItem className={className} disabled={disabled} key={index} value={o.value}>
        {o.label}
      </SelectItem>
    )
  })

  return (
    <div className="w-full">
      <Select.Root onValueChange={onChange}>
        {label && <div className="text-regular-14 text-light-900 mb-2">{label}</div>}
        <Select.Trigger className="w-full flex justify-between text-regular-16 items-center rounded px-[15px] text-[13px] border border-dark-300 leading-none h-[35px] gap-[5px] bg-dark-700 text-light-100 shadow-[0_2px_10px] shadow-black/10 hover:bg-dark-100 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-light-100 outline-none">
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="text-light-100">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-dark-500 rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
            <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-dark-500 text-light-100 cursor-default">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-[5px]">{items}</Select.Viewport>
            <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-dark-500 text-light-100 cursor-default">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={cn(
          'text-[13px] leading-none text-light-100 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-dark-500 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-dark-300 data-[highlighted]:text-light-100',
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    )
  }
)
