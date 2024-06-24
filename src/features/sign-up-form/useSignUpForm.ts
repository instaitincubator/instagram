import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface SignUpFormType {
  email: string
  password: string
  passwordConfirmation: string
  username: string
}

const schema = z.object({
  accept: z.literal(true, {
    invalid_type_error: 'You must accept Terms of Service and Privacy Policy',
  }),
  email: z
    .string()
    .min(1, { message: 'email required' })
    .email({ message: 'The email must match the format example@example.com' }),
  username: z
    .string()
    .min(6, { message: 'The username must contain min 6 characters' })
    .max(30, { message: 'The username must contain max 30 characters' }),
})

export const useSignUpForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignUpFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return { control, errors, handleSubmit, isValid }
}
