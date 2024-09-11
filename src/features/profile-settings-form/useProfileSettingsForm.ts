import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useProfileSettingsForm = () => {
  const { t } = useTranslation()

  const schema = z.object({
    aboutMe: z.string(),
    city: z.object({
      label: z.string(),
      value: z.string(),
    }),
    country: z.string(),
    datePicker: z.date(),
    firstName: z.string(),
    secondName: z.string(),
    userName: z.string(),
  })

  type schemaType = z.infer<typeof schema>

  const {
    control,
    formState: { defaultValues, errors },
    getFieldState,
    getValues,
    handleSubmit,
    reset,
    watch,
  } = useForm<schemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return { control, defaultValues, errors, getFieldState, getValues, handleSubmit, reset, watch }
}
