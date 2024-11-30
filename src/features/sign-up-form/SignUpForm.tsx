import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

import { SignUpFormType, useSignUpForm } from '@/features/sign-up-form/useSignUpForm'
import { useSignUpMutation } from '@/services/auth/signUpApi'
import { rtkErrorHandling } from '@/shared/hooks/rtkErrorsHandling'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { GithubAuth } from '@/shared/ui/Github-auth/githubAuth'
import { GoogleButton } from '@/shared/ui/Google-auth/googleAuth'
import { Input } from '@/shared/ui/Input/Input'
import { Modal } from '@/shared/ui/Modal/Modal'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const SignUpForm = () => {
  const { t } = useTranslation()
  const { control, errors, getValues, handleSubmit, onFieldChange, reset } = useSignUpForm()
  const [SignUp, { error, isLoading, isSuccess }] = useSignUpMutation()
  const [modal, setModal] = useState(true)
  const router = useRouter()
  let userNameError = ''
  let emailError = ''

  if (rtkErrorHandling(error!).field === 'userName') {
    userNameError = rtkErrorHandling(error!).message
    if (rtkErrorHandling(error!).error === 'BAD_REQUEST') {
      userNameError =
        router.locale === 'english'
          ? rtkErrorHandling(error!).message
          : 'Пользователь с таким именем уже существует'
    }
  }
  if (rtkErrorHandling(error!).field === 'email') {
    emailError = rtkErrorHandling(error!).message
    if (rtkErrorHandling(error!).error === 'BAD_REQUEST') {
      emailError =
        router.locale === 'english'
          ? rtkErrorHandling(error!).message
          : 'Пользователь с такой почтой уже существует'
    }
  }

  const onCloseModal = () => {
    setModal(false)
    reset({
      checkboxPolicy: false,
      confirmPassword: '',
      email: '',
      password: '',
      userName: '',
    })
  }

  const onSubmit = (data: SignUpFormType) => {
    SignUp({
      baseUrl: process.env.NEXT_PUBLIC_DOMAIN,
      email: data.email,
      password: data.password.trim(),
      userName: data.userName,
    }).then(() => setModal(true))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-[378px] mx-auto my-auto p-[24px]">
        <h1 className="text-light-100 text-h1 text-center mb-[13px]">{t.auth.signUp}</h1>

        <div className="flex justify-evenly mb-[24px]">
          <GoogleButton />
          <GithubAuth />
        </div>
        <div className="flex flex-col gap-[20px] mb-[20px]">
          <Controller
            control={control}
            name="userName"
            render={({ field }) => (
              <Input
                {...field}
                error={error ? userNameError : errors.userName?.message}
                fullWidth
                label={t.auth.userName}
                onChange={e => {
                  if (userNameError) {
                    userNameError = ''
                  }
                  field.onChange(e)
                  onFieldChange()
                }}
                placeholder={t.auth.userName}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                error={error ? emailError : errors.email?.message}
                fullWidth
                label={t.auth.email}
                onChange={e => {
                  if (userNameError) {
                    userNameError = ''
                  }
                  field.onChange(e)
                  onFieldChange()
                }}
                placeholder="Epam@epam.com"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.password?.message}
                fullWidth
                label={t.auth.password}
                onChange={e => {
                  field.onChange(e)
                  onFieldChange()
                }}
                type="password"
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.confirmPassword?.message}
                fullWidth
                label={t.auth.passwordConfirmation}
                onChange={e => {
                  field.onChange(e)
                  onFieldChange()
                }}
                type="password"
              />
            )}
          />
          <div className="flex justify-start">
            <Controller
              control={control}
              name="checkboxPolicy"
              render={({ field }) => (
                <Checkbox
                  {...field}
                  className="mb-[22px] text-small ml-[15px]"
                  error={errors.checkboxPolicy?.message}
                  onChange={e => {
                    field.onChange(e)
                    onFieldChange()
                  }}
                />
              )}
            />
            <div className="ml-5 gap-0.5 text-[12px] mb-[22px]">
              <span>{t.auth.iAgree} </span>
              <Link className={'text-blue-500 underline'} href={'/termsOfService'}>
                {t.auth.termsOfService}
              </Link>
              <span> {t.auth.and} </span>
              <Link className={'text-blue-500 underline'} href={'/privacy'}>
                {t.auth.privacyPolicy}
              </Link>
            </div>
          </div>
        </div>
        <Button className="btn-primary mb-[20px]" disabled={isLoading} fullWidth>
          {t.auth.signUp}
        </Button>
        <p className="text-light-100 select-none text-center mb-[6px]">
          {t.auth.doYouHaveAnAccount}
        </p>
        <Link href="/sign-in">
          <Button fullWidth variant="text">
            {t.auth.signIn}
          </Button>
        </Link>
      </Card>
      {isSuccess && modal && (
        <Modal className="w-[378px] m-auto" onClose={onCloseModal} title={t.auth.emailSent}>
          <span>{`${t.auth.confirmEmail} ` + ` ` + getValues().email}</span>
          <Button onClick={onCloseModal} type="button">
            OK
          </Button>
        </Modal>
      )}
    </form>
  )
}
