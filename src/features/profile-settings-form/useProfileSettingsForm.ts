import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Profile } from '@/shared/types/public.types'
import { isOlderThan13 } from '@/shared/utils/isOlderThen'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useProfileSettingsForm = (initialValues: { aboutMe: string } & Profile) => {
  type schemaType = z.infer<typeof schema>
  const { t } = useTranslation()
  const aboutMeRegex = /^[0-9A-Za-zА-Яа-я!@#$%^&*( )_+=\-`~{}[\]:;"'<>,.?/\\| \s]*$/
  const schema = z.object({
    aboutMe: z
      .string()
      .max(200, { message: t.profileSettings.fewerThan200 })
      .regex(aboutMeRegex, {
        message: t.profileSettings.aboutMeSymbols,
      })
      .nullable(),
    city: z.object({
      label: z.string(),
      value: z.string(),
    }),
    country: z.object({
      label: z.string(),
      value: z.string(),
    }),
    dateOfBirth: z
      .date()
      .optional()
      .refine(date => isOlderThan13(date!), {
        message: t.profileSettings.less13,
      }),
    firstName: z
      .string()
      .min(1, { message: t.profileSettings.moreThan1 })
      .max(50, { message: t.profileSettings.fewerThan50 })
      .regex(/^[A-Za-zА-Яа-я]+$/, { message: t.profileSettings.nameSymbols }),
    lastName: z
      .string()
      .min(1, { message: t.profileSettings.moreThan1 })
      .max(50, { message: t.profileSettings.fewerThan50 })
      .regex(/^[A-Za-zА-Яа-я]+$/, { message: t.profileSettings.nameSymbols }),
    userName: z
      .string()
      .min(6, { message: t.profileSettings.moreThan6 })
      .max(30, { message: t.profileSettings.fewerThan30 })
      .regex(/^[0-9A-Za-z_-]+$/, { message: t.profileSettings.userNameSymbols }),
  })

  const formatDate = new Date(initialValues.dateOfBirth!)
  const {
    clearErrors,
    control,
    formState: { defaultValues, errors },
    getFieldState,
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
    watch,
  } = useForm<schemaType>({
    defaultValues: {
      aboutMe: initialValues.aboutMe,
      city: {
        label: initialValues.city || '',
        value: initialValues.city || '',
      },
      country: {
        label: initialValues.country || '',
        value: initialValues.country || '',
      },
      dateOfBirth: formatDate,
      firstName: initialValues.firstName,
      lastName: initialValues.lastName,
      userName: initialValues.userName,
    },

    mode: 'onBlur',
    resolver: zodResolver(schema),
  })
  const hasInteracted = useRef(false)

  useEffect(() => {
    clearErrors()
  }, [t, trigger])
  const onFieldChange = () => {
    hasInteracted.current = true
  }

  return {
    control,
    defaultValues,
    errors,
    getFieldState,
    getValues,
    handleSubmit,
    onFieldChange,
    register,
    reset,
    setValue,
    watch,
  }
}
