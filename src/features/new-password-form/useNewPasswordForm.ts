import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface NewPasswordFormType {
  confirm: string
  newPassword: string
  passwordConfirm: string
}

export const useNewPasswordForm = () => {
  const { t } = useTranslation()
  const schema = z
    .object({
      newPassword: z
        .string()
        .min(6, {
          message: t.auth.passwordMin,
        })
        .max(20, { message: t.auth.passwordMax })
        .regex(
          /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~])[a-zA-Z0-9 !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]*$/,
          {
            message: t.auth.passwordValidMessage,
          }
        ),
      passwordConfirm: z
        .string()
        .min(6, {
          message: t.auth.passwordMin,
        })
        .max(20, { message: t.auth.passwordLength })
        .regex(
          /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~])[a-zA-Z0-9 !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]*$/,
          {
            message: t.auth.passwordValidMessage,
          }
        ),
    })
    .refine(data => data.newPassword === data.passwordConfirm, {
      message: t.auth.passwords_notMatch,
      path: ['confirm'],
    })
    .refine(
      values => {
        const passwordContainsSpaces = values.newPassword.includes(' ')

        return !passwordContainsSpaces
      },
      { message: t.auth.errors.passwordCannotContainSpaces, path: ['newPassword'] }
    )

  const {
    control,
    formState: { errors, validatingFields },
    getValues,
    handleSubmit,
    register,
  } = useForm<NewPasswordFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return { control, errors, getValues, handleSubmit, register, validatingFields }
}
