import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface ForgotPasswordFormType {
  email: string
  recaptcha: string
}

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'email required' })
    .email({ message: 'The email must match the format example@example.com' }),
  recaptcha: z.string().min(1),
})

export const useForgotPasswordForm = () => {
  const {
    control,
    formState: { errors, validatingFields },
    getValues,
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return { control, errors, getValues, handleSubmit, register, validatingFields }
}
