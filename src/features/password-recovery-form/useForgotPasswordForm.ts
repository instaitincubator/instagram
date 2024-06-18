import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface ForgotPasswordFormType {
  email: string
}

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'email required' })
    .email({ message: 'The email must match the format example@example.com' }),
})

export const useForgotPasswordForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ForgotPasswordFormType>({
    defaultValues: { email: '' },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return { control, errors, handleSubmit, isValid }
}
