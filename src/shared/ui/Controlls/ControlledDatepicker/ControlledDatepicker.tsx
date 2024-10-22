import { forwardRef } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Datepicker, DatepickerProps } from '@/shared/ui/Datepicker/Datepicker'

export type ControlledDatepickerProps<TFieldValues extends FieldValues> = Omit<
  DatepickerProps,
  'onChange' | 'selected' | 'selectsMultiple' | 'selectsRange' | 'setBlur'
  //добвлены в исключения типа 'selectsMultiple' | 'selectsRange' => ошибка на несовместимость типов вероятно тут->(ComponentPropsWithoutRef<typeof DatePicker>)
> &
  UseControllerProps<TFieldValues>

export const ControlledDatepicker = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  ...DatepickerProps
}: ControlledDatepickerProps<TFieldValues>) => {
  const {
    field: { onChange, value, ...rest },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
  })

  return <Datepicker onChange={onChange} {...DatepickerProps} {...rest} selected={value} />
}
