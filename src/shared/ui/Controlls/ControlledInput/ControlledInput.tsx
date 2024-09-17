import { ComponentPropsWithoutRef } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Input } from '@/shared/ui/Input/Input'

type InputProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  error?: string
  fullWidth?: boolean
  label?: string
  onChangeText?: (value: string) => void
  placeholder?: string
  type?: string
} & ComponentPropsWithoutRef<'input'>

export type ControlledTextFieldProps<TFieldValues extends FieldValues> = Omit<
  InputProps,
  'onChangeText' | 'value'
> &
  UseControllerProps<TFieldValues>

export const ControlledInput = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  ...textFieldProps
}: ControlledTextFieldProps<TFieldValues>) => {
  const {
    field: { onChange, value, ...rest },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
  })

  return <Input onChangeText={onChange} value={value} {...textFieldProps} {...rest} />
}
