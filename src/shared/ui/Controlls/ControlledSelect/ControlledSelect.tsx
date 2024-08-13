import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import Select from '@/shared/ui/Select/Select'
import { SelectProps } from '@/shared/ui/Select/types'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> = Omit<
  SelectProps,
  'onChange' | 'value'
> &
  UseControllerProps<TFieldValues>
export const ControlledSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  options,
  rules,
  shouldUnregister,
  ...selectProps
}: ControlledCheckboxProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
  })

  return <Select onChange={onChange} options={options} value={value} {...selectProps} />
}
