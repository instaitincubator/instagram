import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/shared/ui/Checkbox/Checkbox'

type ControlledInputProps<T extends FieldValues> = Omit<
  CheckboxProps,
  'id' | 'onChange' | 'value'
> &
  UseControllerProps<T>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  ...restProps
}: ControlledInputProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
  })

  return <Checkbox onChange={onChange} value={value} {...restProps} />
}
