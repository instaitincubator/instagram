import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useProfileSettingsForm = (initialValues: any) => {
  const schema = z.object({
    aboutMe: z
      .string()
      .min(0, { message: 'Must be 0 or more characters long' })
      .max(200, { message: 'Must be 200 or fewer characters long' })
      .regex(/^[0-9A-Za-zА-Яа-я!@#$%^&*()_+=\-`~{}[\]:;"'<>,.?/\\| ]*$/, {
        message:
          'Only letters A-Z, a-z, А-Я, а-я, digits, and special characters _ - @ are allowed',
      }),
    city: z.object({
      label: z.string(),
      value: z.string(),
    }),
    country: z.object({
      label: z.string(),
      value: z.string(),
    }),
    dateOfBirth: z.date().optional(),
    firstName: z
      .string()
      .min(1, { message: 'Must be 1 or more characters long' })
      .max(50, { message: 'Must be 50 or fewer characters long' })
      .regex(/^[A-Za-zА-Яа-я]+$/, { message: 'Only letters A-Z, a-z, А-Я, а-я are allowed' }),
    lastName: z
      .string()
      .min(1, { message: 'Must be 1 or more characters long' })
      .max(50, { message: 'Must be 50 or fewer characters long' })
      .regex(/^[A-Za-zА-Яа-я]+$/, { message: 'Only letters A-Z, a-z, А-Я, а-я are allowed' }),
    userName: z
      .string()
      .min(6, { message: 'Must be 6 or more characters long' })
      .max(30, { message: 'Must be 30 or fewer characters long' })
      .regex(/^[0-9A-Za-z_-]+$/, { message: 'Only alphanumeric characters, _, and - are allowed' }),
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

    mode: 'onBlur',
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
