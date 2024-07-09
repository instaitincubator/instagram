import Select from '@/shared/ui/Select/Select'
import { getMonth, getYear } from 'date-fns'
import Image from 'next/image'

import './style.css'

import { useTranslation } from '../../../../../hooks/useTranslation'

type RangeType = {
  label: string
  value: string
}

type CustomHeaderProps = {
  changeMonth: ( month: number ) => void
  changeYear: ( year: number ) => void
  date: Date
  decreaseMonth: VoidFunction
  increaseMonth: VoidFunction
}

export const CustomHeader = (props: CustomHeaderProps) => {
  const { changeMonth, changeYear, date, decreaseMonth, increaseMonth } = props
  const { t } = useTranslation()

  const rangeYears = (start: number, end: number): { label: string; value: string }[] => {
    return Array.from({ length: end - start }, (_, i) => {
      const value = (start + i).toString()

      return { label: value, value: value }
    })
  }

  const yearsPicker: RangeType[] = rangeYears(
    getYear(new Date()) - 100,
    getYear(new Date()) + 1
  ).reverse()

  const monthPicker: RangeType[] = [
    { label: t.datePicker.January, value: '0' },
    { label: t.datePicker.February, value: '1' },
    { label: t.datePicker.March, value: '2' },
    { label: t.datePicker.April, value: '3' },
    { label: t.datePicker.May, value: '4' },
    { label: t.datePicker.June, value: '5' },
    { label: t.datePicker.July, value: '6' },
    { label: t.datePicker.August, value: '7' },
    { label: t.datePicker.September, value: '8' },
    { label: t.datePicker.October, value: '9' },
    { label: t.datePicker.November, value: '10' },
    { label: t.datePicker.December, value: '11' },
  ]

  return (
    <div>
      <div className="flex justify-center">
        <Select
          className="no-border"
          onChange={monthOptions => changeMonth(Number(monthOptions.value))}
          options={monthPicker}
          value={monthPicker?.find(p => p.value === getMonth(date).toString())}
          withArrow={false}
        />
        <Select
          className="no-border"
          onChange={yearsOptions => changeYear(Number(yearsOptions.value))}
          options={yearsPicker}
          value={yearsPicker?.find(p => p.value === getYear(date).toString())}
          withArrow={false}
        />
        <Image
          alt={'monthDecrease'}
          height={36}
          onClick={decreaseMonth}
          src="/circleArrowRight.svg"
          width={36}
        />
        <Image
          alt={'monthIncrease'}
          height={36}
          onClick={increaseMonth}
          src="/circleArrowLeft.svg"
          width={36}
        />
      </div>
    </div>
  )
}
