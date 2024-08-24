import { ComponentPropsWithoutRef } from 'react'
import DatePicker from 'react-datepicker'

import { cn } from '@/shared/utils/cn'

import 'react-datepicker/dist/react-datepicker.css'
import './Datepicker.css'

export type DatepickerProps = {
  disabled?: boolean
  error?: boolean
} & ComponentPropsWithoutRef<typeof DatePicker>

export const Datepicker = ({
  calendarStartDay = 1,
  disabled,
  error,
  ...restProps
}: DatepickerProps) => {
  return (
    <div className="p-5">
      <DatePicker
        calendarStartDay={calendarStartDay}
        className={cn(
          'text-regular-16 disabled:text-dark-100 focus:border-accent-500 rounded-sm bg-transparent border border-dark-300 w-40',
          {
            'border-danger-500': error,
          }
        )}
        disabled={disabled}
        showIcon
        {...restProps}
      />
    </div>
  )
}
