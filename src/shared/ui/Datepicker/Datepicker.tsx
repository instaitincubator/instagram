import { ComponentPropsWithoutRef } from 'react'
import DatePicker from 'react-datepicker'

import { cn } from '@/shared/utils/cn'

import './Datepicker.css'
import 'react-datepicker/dist/react-datepicker.css'

export type DatepickerProps = {
  disabled?: boolean
  error?: boolean
  fullWidth?: boolean
  label?: string
} & ComponentPropsWithoutRef<typeof DatePicker>

export const Datepicker = ({
  calendarStartDay = 1,
  disabled,
  error,
  fullWidth,
  label,
  ...restProps
}: DatepickerProps) => {
  return (
    <div className="flex flex-col">
      {label && <span className="text-regular-14 text-light-900">{label}</span>}
      <DatePicker
        calendarStartDay={calendarStartDay}
        className={cn(
          'text-regular-16 disabled:text-dark-100 focus:border-accent-500 rounded-sm bg-transparent border border-dark-300 w-40',
          {
            'border-danger-500': error,
            'w-full': fullWidth,
          }
        )}
        disabled={disabled}
        showIcon
        {...restProps}
      />
    </div>
  )
}
