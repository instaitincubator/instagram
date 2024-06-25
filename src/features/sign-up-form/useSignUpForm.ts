import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface SignUpFormType {
  checkboxPolicy: boolean
  confirmPassword: string
  email: string
  password: string
  username: string
}

const schema = z
  .object({
    accept: z.literal(true, {
      invalid_type_error: 'You must accept Terms of Service and Privacy Policy',
    }),
    confirmPassword: z.string(),
    email: z
      .string()
      .min(1, { message: 'email required' })
      .email({ message: 'The email must match the format example@example.com' }),
    password: z
      .string()
      .min(6, { message: 'The password must contain min 6 characters' })
      .max(20, { message: 'The password must contain max 20 characters' })
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~])[a-zA-Z0-9 !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]*$/,
        {
          message:
            'The password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character ( ! " # $ % & \' ( ) * + , . / : ; < = > ? @ [ \\ ] ^ _ ` { | } ~ )',
        }
      ),

    username: z
      .string()
      .min(6, { message: 'The username must contain min 6 characters' })
      .max(30, { message: 'The username must contain max 30 characters' })
      .regex(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[_ -])*$/, {
        message:
          'The password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character ( _ -)',
      }),
  })
  .refine(
    values => {
      return values.password === values.confirmPassword
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword'],
    }
  )

export const useSignUpForm = () => {
  const {
    control,
    formState: { errors, isDirty },
    getValues,
    handleSubmit,
  } = useForm<SignUpFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return { control, errors, getValues, handleSubmit, isDirty }
}
