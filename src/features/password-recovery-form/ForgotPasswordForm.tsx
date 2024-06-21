import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form'

import {
  ForgotPasswordFormType,
  useForgotPasswordForm,
} from '@/features/password-recovery-form/useForgotPasswordForm'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Input } from '@/shared/ui/Input/Input'
import { Recaptcha } from '@/shared/ui/Recaptcha/Recaptcha'

import config from '../../../config'

interface Props {
  forgotPassword: (arg: ForgotPasswordFormType) => void
}

export const ForgotPasswordForm = ({ forgotPassword }: Props) => {
  const { control, errors, handleSubmit, register } = useForgotPasswordForm()

  const onSubmit = (data: ForgotPasswordFormType) => {
    forgotPassword(data)
  }

  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

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
          Enter your email address and we will send you further instructions
        </span>
        <Button fullWidth>Send Link</Button>
        <Button as="a" fullWidth href="/login" type="button" variant="text">
          Back to Sign In
        </Button>
        <div data-sitekey={config.captchaKey} data-theme="dark"></div>
        <Recaptcha {...register('captcha')} />
      </Card>
    </form>
  )
}
