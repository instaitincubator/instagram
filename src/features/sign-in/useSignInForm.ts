import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { LocaleType } from '../../../locales/english'

export interface SignInFormType {
  email: string
  password: string
}

const schema = (t: LocaleType) =>
  z
    .object({
      email: z
        .string()
        .min(1, { message: t.auth.field_required })
        .email({ message: `${t.auth.email_val}` }),
      password: z
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
    })
    .refine(
      values => {
        const passwordContainsSpaces = values.password.includes(' ')

        return !passwordContainsSpaces
      },
      { message: t.auth.errors.passwordCannotContainSpaces, path: ['password'] }
    )

export const useSignInForm = () => {
  const { t } = useTranslation()
  const {
    clearErrors,
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    trigger,
  } = useForm<SignInFormType>({
    defaultValues: { email: '' },
    mode: 'onSubmit',
    resolver: zodResolver(schema(t)),
  })
  const hasInteracted = useRef(false)

  useEffect(() => {
    reset({ email: '', password: '' })
    clearErrors()
  }, [t])

  const onFieldChange = async (fieldName: keyof SignInFormType) => {
    hasInteracted.current = true
    await trigger(fieldName)
  }

  return { control, errors, handleSubmit, isValid, onFieldChange, trigger }
}
