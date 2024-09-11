import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CountrySelect } from '@/shared/ui/Select/CountrySelect'
import { SelectProps } from '@/shared/ui/Select/types'

export type ControlledSelectProps<TFieldValues extends FieldValues> = Omit<
  SelectProps,
  'onChange' | 'value'
> &
  UseControllerProps<TFieldValues>
export const ControlledCountrySelect = <TFieldValues extends FieldValues>({
  control,
  name,
  options,
  ...selectProps
}: ControlledSelectProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
  })

  return <CountrySelect onChange={onChange} options={options} value={value} {...selectProps} />
}
