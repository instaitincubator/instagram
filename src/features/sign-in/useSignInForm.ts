import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface SignInFormType {
  email: string
  password: string
}

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'email required' })
    .email({ message: 'The email must match the format example@example.com' }),
  password: z
    .string()
    .min(6, {
      message: 'The password must contain at least 6 characters',
    })
    .max(20, { message: 'The password must store a maximum of 20 characters' })
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~])[a-zA-Z0-9 !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]*$/,
      {
        message:
          'The password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character ( ! " # $ % & \' ( ) * + , . / : ; < = > ? @ [ \\ ] ^ _ ` { | } ~ )',
      }
    ),
})

export const useSignInForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignInFormType>({
    defaultValues: { email: '' },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return { control, errors, handleSubmit, isValid }
}
