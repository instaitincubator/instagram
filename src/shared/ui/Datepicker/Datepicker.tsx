import { useState } from 'react'
import DatePicker from 'react-datepicker'

import { cn } from '@/shared/utils/cn'

import 'react-datepicker/dist/react-datepicker.css'
import './Datepicker.css'

type Props = {
  disabled?: boolean
  error?: boolean
}

export const Datepicker = ({ disabled, error }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  return (
    <div className="p-5">
      <DatePicker
        calendarStartDay={1}
        className={cn(
          'text-regular-16 disabled:text-dark-100 focus:border-accent-500 rounded-sm bg-transparent border border-dark-300 w-40',
          {
            'border-danger-500': error,
          }
        )}
        disabled={disabled}
        onChange={date => setStartDate(date)}
        selected={startDate}
        showIcon
      />
    </div>
  )
}
