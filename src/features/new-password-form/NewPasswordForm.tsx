import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form'

import {
  NewPasswordFormType,
  useNewPasswordForm,
} from '@/features/new-password-form/useNewPasswordForm'
import { useNewPasswordMutation } from '@/services/auth/newPasswordApi'
import { useTerminateSessionsMutation } from '@/services/auth/terminateAllSessionsApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Input } from '@/shared/ui/Input/Input'
import { useRouter } from 'next/router'

interface Props {
  code: null | string | string[]
}

export const NewPasswordForm = ({ code }: Props) => {
  const { control, errors, handleSubmit } = useNewPasswordForm()
  const router = useRouter()
  const [newPasswordRequest, { error, isError, isSuccess }] = useNewPasswordMutation()
  const [TerminateSessions] = useTerminateSessionsMutation()
  const { t } = useTranslation()

  const onSubmit = ({ newPassword }: NewPasswordFormType) => {
    newPasswordRequest({ newPassword, recoveryCode: code })
  }

  useEffect(() => {
    if (isError) {
      if ('status' in error) {
        if (error.status === 400) {
          router.push('/link-expired').then()
        }
      }
    } else if (isSuccess) {
      router.push('/sign-in').then()
      TerminateSessions({})
    }
  }, [isError, isSuccess, error, router, TerminateSessions])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="bg-dark-700 p-[15px] sm:bg-dark-500 sm:p-[24px] sm:max-w-[378px] sm:m-auto  flex flex-col items-center   gap-2">
        <span className="pb-[20px] text-h1">{t.auth.createNewPassword}</span>
        <div className="flex flex-col gap-[24px] w-full">
          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.newPassword?.message}
                fullWidth
                label={t.auth.newPassword}
                type="password"
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.passwordConfirm?.message ?? errors.confirm?.message}
                fullWidth
                label={t.auth.passwordConfirmation}
                type="password"
              />
            )}
          />
        </div>
        <span className="mt-2 text-regular-14 text-light-900">{t.auth.passwordLength}</span>

        <Button className="mt-10" fullWidth>
          {t.auth.createNewPassword}
        </Button>
      </Card>
    </form>
  )
}
