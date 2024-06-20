import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ForgotPasswordFormType } from '@/features/password-recovery-form/useForgotPasswordForm'

export interface SignUpFormType {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'email required' })
    .email({ message: 'The email must match the format example@example.com' }),
})

export const useSignUpForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return { control, errors, handleSubmit }
}
