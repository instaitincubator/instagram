import { useForm } from 'react-hook-form'

import { DataForm } from '@/features/profile-settings-form/profile-settings-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useProfileSettingsForm = (initialValues: DataForm) => {
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
      aboutMe: initialValues?.aboutMe,
      userName: initialValues?.userName,
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
