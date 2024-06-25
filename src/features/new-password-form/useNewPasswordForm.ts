import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface NewPasswordFormType {
  confirm: string
  newPassword: string
  passwordConfirm: string
}

const schema = z
  .object({
    newPassword: z
      .string()
      .min(6, {
        message: 'The password must contain at least 6 characters',
      })
      .max(20, { message: 'The password must store a maximum of 20 characters' })
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~])[a-zA-Z0-9 !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]*$/,
        {
          message:
            'The password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character ( ! " # $ % & \' ( ) * + , . / : ; < = > ? @ [ \\ ] ^ _ ` { | } ~ )',
        }
      ),
    passwordConfirm: z
      .string()
      .min(6, {
        message: 'The password must contain at least 6 characters',
      })
      .max(20, { message: 'The password must store a maximum of 20 characters' })
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~])[a-zA-Z0-9 !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]*$/,
        {
          message:
            'The password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character ( ! " # $ % & \' ( ) * + , . / : ; < = > ? @ [ \\ ] ^ _ ` { | } ~ )',
        }
      ),
  })
  .refine(data => data.newPassword === data.passwordConfirm, {
    message: 'The passwords must match',
    path: ['confirm'],
  })

export const useNewPasswordForm = () => {
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
