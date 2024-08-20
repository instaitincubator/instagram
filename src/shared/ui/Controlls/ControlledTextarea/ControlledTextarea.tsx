import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Textarea, TextareaProps } from '@/shared/ui/Textarea/Textarea'

export type ControlledTextareaProps<TFieldValues extends FieldValues> = Omit<
  TextareaProps,
  'onChange' | 'value'
> &
  UseControllerProps<TFieldValues>
export const ControlledTextarea = <TFieldValues extends FieldValues>({
  control,
  name,
  ...TextareaProps
}: ControlledTextareaProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
  })

  return <Textarea onChange={onChange} value={value} {...TextareaProps} />
}
