import { ComponentPropsWithoutRef, useState } from 'react'
import DatePicker from 'react-datepicker'

import { cn } from '@/shared/utils/cn'

import 'react-datepicker/dist/react-datepicker.css'
import './Datepicker.css'

export type DatepickerProps = {
  disabled?: boolean
  error?: string
  fullWidth?: boolean
  label?: string
} & ComponentPropsWithoutRef<typeof DatePicker>

export const Datepicker = ({
  disabled,
  error,
  fullWidth,
  label,
  ...restProps
}: DatepickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  return (
    <div className="flex flex-col">
      {label && <span className="text-regular-14 text-light-900">{label}</span>}

      <DatePicker
        className={cn(
          'text-regular-16 disabled:text-dark-100 focus:border-accent-500 rounded-sm bg-transparent border border-dark-300 w-40',
          {
            'border-danger-500': error,
            'w-full': fullWidth,
          }
        )}
        monthsShown={2}
        onChange={date => setStartDate(date)}
        selected={startDate}
        showYearDropdown
      />
      {error && <span className="text-regular-14 text-danger-500">{error}</span>}
    </div>
  )
}
