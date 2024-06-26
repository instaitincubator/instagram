import { Controller } from 'react-hook-form'

import { SignUpFormType, useSignUpForm } from '@/features/sign-up-form/useSignUpForm'
import { useSignUpMutation } from '@/services/signUpApi'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { Input } from '@/shared/ui/Input/Input'
import Image from 'next/image'
import Link from 'next/link'

import { useTranslation } from '../../../hooks/useTranslation'

export const SignUpForm = () => {
  const { t } = useTranslation()
  const { control, errors, handleSubmit, isDirty, isValid } = useSignUpForm()
  const [SignUp] = useSignUpMutation()

  const onSubmit = (data: SignUpFormType) => {
    SignUp({
      baseUrl: 'http://localhost:3000',
      email: data.email,
      password: data.password,
      userName: data.userName,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-[378px] mx-auto my-auto p-[24px]">
        <h1 className="text-light-100 text-h1 text-center mb-[13px]">{t.auth.signUp}</h1>

        <div className="flex justify-evenly mb-[24px]">
          <Link href={'https://www.google.com/?client=safari'} target="_blank">
            <Image alt="google-icon" height={36} src="/google.svg" width={36}></Image>
          </Link>
          <Link href={'https://github.com'} target="_blank">
            <Image alt="github-icon" height={36} src="/git.svg" width={36}></Image>
          </Link>
        </div>

        <div className="flex flex-col gap-[20px] mb-[20px]">
          <Controller
            control={control}
            name="userName"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.userName?.message}
                fullWidth
                label={t.auth.userName}
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
                error={errors.email?.message}
                fullWidth
                label={t.auth.email}
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
                type="password"
              />
            )}
          />

          <div className="flex justify-start">
            <Controller
              control={control}
              name="checkboxPolicy"
              render={({ field }) => (
                <Checkbox {...field} className="mb-[22px] text-small ml-[15px]" />
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
        <Button className="btn-primary mb-[20px]" disabled={!isDirty || !isValid} fullWidth>
          {t.auth.signUp}
        </Button>
        <p className="text-light-100 text-center mb-[6px]">{t.auth.doYouHaveAnAccount}</p>
        <Button fullWidth type="button" variant="text">
          {t.auth.signIn}
        </Button>
      </Card>
    </form>
  )
}
