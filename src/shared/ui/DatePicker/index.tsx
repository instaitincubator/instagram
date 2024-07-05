import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import { CustomHeader } from '@/shared/ui/DatePicker/header/CustomHeader'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css'
import {addDays} from 'date-fns';



export const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date|null>(new Date())
  const router = useRouter()

  return (
    <ReactDatePicker
      calendarStartDay={1}
      locale={router.locale === 'russian' ? ru : enUS}
      onChange={date => setSelectedDate(date)}
      maxDate={addDays(new Date(), 0)}
      renderCustomHeader={({ changeMonth, changeYear, date, decreaseMonth, increaseMonth }) => (
        <CustomHeader
          changeMonth={changeMonth}
          changeYear={changeYear}
          date={date}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
        />
      )}
      selected={selectedDate}/>
  )
}
