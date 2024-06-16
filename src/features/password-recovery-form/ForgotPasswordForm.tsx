import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Input } from '@/shared/ui/Input/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface Form {
  email: string
}
const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'email required' })
    .email({ message: 'The email must match the format example@example.com' }),
})

export const ForgotPasswordForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<Form>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })
  const onSubmit: SubmitHandler<Form> = data => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="flex flex-col items-center max-w-[378px] p-[24px] gap-2">
        <span className="pb-[20px] text-h1">Forgot Password</span>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              error={errors.email?.message}
              fullWidth
              label="Email"
              placeholder="Example@example.com"
            />
          )}
        />
        <span className="text-regular-14 text-light-900 pb-[10px]">
          Enter your email address and we will send you further instructions{' '}
        </span>
        <Button disabled={!isValid} fullWidth>
          Send Link
        </Button>
        <Button as="a" fullWidth href="/login" type="button" variant="text">
          Back to Sign In
        </Button>
      </Card>
    </form>
  )
}
