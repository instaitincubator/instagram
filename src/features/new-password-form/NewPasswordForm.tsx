import React from 'react'
import { Controller } from 'react-hook-form'

import {
  NewPasswordFormType,
  useNewPasswordForm,
} from '@/features/new-password-form/useNewPasswordForm'
import { useNewPasswordMutation } from '@/services/auth/newPasswordApi'
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
  const [newPasswordRequest, { isSuccess }] = useNewPasswordMutation()

  const onSubmit = ({ newPassword }: NewPasswordFormType) => {
    newPasswordRequest({ newPassword, recoveryCode: code })
    console.log(isSuccess)
    if (isSuccess) {
      router.push('/sign-in')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="flex flex-col items-center w-[378px] p-[24px] ">
        <span className="pb-[20px] text-h1">Create New Password</span>
        <div className="flex flex-col gap-[24px] w-full">
          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.newPassword?.message}
                fullWidth
                label="new Password"
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
                label="Password confirmation"
                type="password"
              />
            )}
          />
        </div>
        <span className="mt-2 text-regular-14 text-light-900">
          Your password must be between 6 and 20 characters
        </span>

        <Button className="mt-10" fullWidth>
          Create new password
        </Button>
      </Card>
    </form>
  )
}
