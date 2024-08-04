import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Controller } from 'react-hook-form'

import {
  ForgotPasswordFormType,
  useForgotPasswordForm,
} from '@/features/password-recovery-form/useForgotPasswordForm'
import { useForgotPasswordMutation } from '@/services/auth/forgotPasswordApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Input } from '@/shared/ui/Input/Input'
import { Modal } from '@/shared/ui/Modal/Modal'
import Link from 'next/link'
import { useRouter } from 'next/router'

import config from '../../../config'

export const ForgotPasswordForm = () => {
  const [forgotPassword, { error, isSuccess }] = useForgotPasswordMutation()
  const [modal, setModal] = useState(true)
  const { control, errors, getValues, handleSubmit, isDirty, isValid } = useForgotPasswordForm()

  const onSubmit = (data: ForgotPasswordFormType) => {
    forgotPassword(data)
  }
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="bg-dark-700 p-[15px] sm:bg-dark-500 sm:p-[24px] sm:max-w-[378px] sm:m-auto flex flex-col items-center gap-2">
        <span className="pb-[20px] text-h1">{t.auth.forgotPassword}</span>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              error={errors.email?.message || error ? t.auth.errors.userNotExist : ''}
              fullWidth
              label={t.auth.email}
              placeholder={t.auth.emailPlaceholder}
            />
          )}
        />
        <span className="text-regular-14 text-light-900 pb-[10px] w-full">
          {t.auth.passwordRecovery}
        </span>
        <Button disabled={!isValid || !isDirty} fullWidth>
          {t.auth.sendLink}
        </Button>
        <Link href="/sign-in">
          <Button fullWidth type="button" variant="text">
            {t.auth.backToSignIn}
          </Button>
        </Link>
        <Controller
          control={control}
          name="recaptcha"
          render={({ field }) => (
            <ReCAPTCHA
              {...field}
              hl={router.locale === 'english' ? 'en' : 'ru'}
              sitekey={config.captchaKey!}
              theme="dark"
            />
          )}
        />
      </Card>
      {isSuccess && modal && (
        <Modal className="w-[378px] m-auto" onClose={() => setModal(false)} title="Email sent">
          <span>
            {t.auth.emailConfirmation}
            {getValues().email}
          </span>
          <Button onClick={() => setModal(false)} type="button">
            OK
          </Button>
        </Modal>
      )}
    </form>
  )
}
