import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const usePublicationForm = () => {
  type schemaType = z.infer<typeof PublicationSchema>
  const aboutMeRegex = /^[0-9A-Za-zА-Яа-я!@#$%^&*( )_+=\-`~{}[\]:;"'<>,.?/\\|\s]*$/
  const PublicationSchema = z.object({
    description: z
      .string()
      .max(500, { message: 'Description should be longer than 500' })
      .regex(aboutMeRegex, {
        message: 'Only letters, numbers and special characters are allowed: _-@',
      }),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<schemaType>({
    mode: 'onBlur',
    resolver: zodResolver(PublicationSchema),
  })

  return {
    control,
    errors,
    handleSubmit,
  }
}
