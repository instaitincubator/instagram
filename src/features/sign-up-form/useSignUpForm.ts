import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface SignUpFormType {
  checkboxPolicy: boolean
  confirmPassword: string
  email: string
  password: string
  userName: string
}

const schema = z
  .object({
    checkboxPolicy: z.literal(true, {
      invalid_type_error: 'You must accept Terms of Service and Privacy Policy',
    }),
    confirmPassword: z.string(),
    email: z
      .string()
      .min(1, { message: 'email required' })
      .email({ message: 'The email must match the format example@example.com' }),
    password: z
      .string()
      .min(6, { message: 'Minimum number of characters 6' })
      .max(20, { message: 'Maximum number of characters 20' })
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~])[a-zA-Z0-9 !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]*$/,
        {
          message:
            'The password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character ( ! " # $ % & \' ( ) * + , . / : ; < = > ? @ [ \\ ] ^ _ ` { | } ~ )',
        }
      ),
    userName: z
      .string()
      .min(6, { message: 'Minimum number of characters 6' })
      .max(30, { message: 'Maximum number of characters 30' })
      .regex(/^[0-9A-Za-z_-]+$/, {
        message: 'Username can contain: 0-9; A-Z; a-z; _ ; - ',
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
    formState: { errors, isDirty, isValid },
    getValues,
    handleSubmit,
  } = useForm<SignUpFormType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  })

  return { control, errors, getValues, handleSubmit, isDirty, isValid }
}
