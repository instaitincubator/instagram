import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useProfileSettingsForm = () => {
  const { t } = useTranslation()
  const schema = z.object({
    aboutMe: z.string(),
    city: z.string(),
    country: z.string(),
    dateOfBirth: z.date(),
    firstName: z.string(),
    lastName: z.string(),
    userName: z
      .string({ message: t.auth.field_required })
      .min(6, { message: t.auth.errors.lowLength })
      .max(30, { message: t.auth.errors.highLength30 })
      .regex(/^[0-9A-Za-z_-]+$/, {
        message: t.auth.errors.userName_val,
      }),
  })

  const { control, getValues, handleSubmit } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return { control, getValues, handleSubmit }
}
