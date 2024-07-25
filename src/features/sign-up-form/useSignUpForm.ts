import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface SignUpFormType {
  checkboxPolicy: boolean
  confirmPassword: string
  email: string
  password: string
  userName: string
}

export const useSignUpForm = () => {
  const { t } = useTranslation()

  const schema = z
    .object({
      checkboxPolicy: z.literal(true, {
        invalid_type_error: t.auth.errors.termsAccept,
      }),
      confirmPassword: z.string(),
      email: z.string().min(1, { message: t.auth.email }).email({ message: t.auth.email_val }),
      password: z
        .string()
        .min(6, { message: t.auth.errors.lowLength })
        .max(20, { message: t.auth.errors.highLength20 })
        .regex(
          /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~])[a-zA-Z0-9 !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]*$/,
          {
            message: t.auth.passwordValidMessage,
          }
        ),
      userName: z
        .string()
        .min(6, { message: t.auth.errors.lowLength })
        .max(30, { message: t.auth.errors.highLength30 })
        .regex(/^[0-9A-Za-z_-]+$/, {
          message: t.auth.errors.userName_val,
        }),
    })
    .refine(
      values => {
        return values.password === values.confirmPassword
      },
      {
        message: t.auth.passwords_notMatch,
        path: ['confirmPassword'],
      }
    )

  const {
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    handleSubmit,
  } = useForm<SignUpFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return { control, errors, getValues, handleSubmit, isDirty, isValid }
}
