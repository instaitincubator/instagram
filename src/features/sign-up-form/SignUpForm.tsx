import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

import { SignUpFormType, useSignUpForm } from '@/features/sign-up-form/useSignUpForm'
import { useSignUpMutation } from '@/services/auth/signUpApi'
import { rtkErrorHandling } from '@/shared/hooks/rtkErrorsHandling'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { Input } from '@/shared/ui/Input/Input'
import { Modal } from '@/shared/ui/Modal/Modal'
import { GithubAuth } from '@/shared/ui/githubAuth'
import { GoogleButton } from '@/shared/ui/googleAuth/googleAuth'
import Link from 'next/link'

export const SignUpForm = () => {
  const { t } = useTranslation()
  const { control, errors, getValues, handleSubmit, reset } = useSignUpForm()
  const [SignUp, { error, isLoading, isSuccess }] = useSignUpMutation()
  const [modal, setModal] = useState(true)
  let userNameError = ''
  let emailError = ''

  if (rtkErrorHandling(error!).field === 'userName') {
    userNameError = rtkErrorHandling(error!).message
  } else if (rtkErrorHandling(error!).field === 'email') {
    emailError = rtkErrorHandling(error!).message
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
    })
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
                error={error ? userNameError : errors.userName?.message}
                fullWidth
                label={t.auth.userName}
                placeholder={t.auth.userName}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                error={error ? emailError : errors.email?.message}
                fullWidth
                label={t.auth.email}
                placeholder="Epam@epam.com"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                error={errors.password?.message}
                fullWidth
                label={t.auth.password}
                type="password"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Input
                error={errors.confirmPassword?.message}
                fullWidth
                label={t.auth.passwordConfirmation}
                type="password"
                {...field}
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
        <Button as="a" fullWidth href="/sign-in" type="button" variant="text">
          {t.auth.signIn}
        </Button>
      </Card>
      {isSuccess && modal && (
        <Modal className="w-[378px] m-auto" onClose={onCloseModal} title="Email sent">
          <span>{`We have sent a link to confirm your email to ` + ` ` + getValues().email}</span>
          <Button onClick={onCloseModal} type="button">
            OK
          </Button>
        </Modal>
      )}
    </form>
  )
}
