import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useProfileSettingsForm = (initialValues: any) => {
  const schema = z.object({
    aboutMe: z.string(),
    city: z.object({
      label: z.string(),
      value: z.string(),
    }),
    country: z.object({
      label: z.string(),
      value: z.string(),
    }),
    dateOfBirth: z.date(),
    firstName: z.string(),
    lastName: z.string(),
    userName: z.string(),
  })

  type schemaType = z.infer<typeof schema>
  const formatDate = new Date(initialValues.dateOfBirth)
  const {
    control,
    formState: { defaultValues, errors },
    getFieldState,
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
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

    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return {
    control,
    defaultValues,
    errors,
    getFieldState,
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  }
}
