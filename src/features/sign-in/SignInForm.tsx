import React from 'react'
import { Controller } from 'react-hook-form'

import { SignInFormType, useSignInForm } from '@/features/sign-in/useSignInForm'
import { useLazyMeQuery, useMeQuery, useSignInMutation } from '@/services/auth/signInApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { GithubAuth } from '@/shared/ui/Github-auth/githubAuth'
import { GoogleButton } from '@/shared/ui/Google-auth/googleAuth'
import { Input } from '@/shared/ui/Input/Input'
import { setToken } from '@/shared/utils/storage'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const SignInForm = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { control, errors, handleSubmit, onFieldChange } = useSignInForm()
  const [signIn, { isError }] = useSignInMutation()
  const [getMe] = useLazyMeQuery()
  const { refetch } = useMeQuery()

  const onSubmit = (data: SignInFormType) => {
    signIn(data)
      .unwrap()
      .then(async res => {
        setToken(res.accessToken)
        refetch()
        const tokenPayload = res.accessToken.split('.')?.[1]
        const decodedPayload = atob(tokenPayload)
        let parsed

        try {
          parsed = JSON.parse(decodedPayload)
        } catch {
          parsed = {}
        }

        let userId

        if (parsed?.userId) {
          userId = parsed.userId
        } else {
          const meRes = await getMe()

          userId = meRes?.data?.userId
        }

        if (!userId) {
          return
        }
        refetch()
        void router.replace(`/public-profile/profile/${userId}`)
      })
      .catch()
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Card className="flex h-full sm:h-fit bg-dark-700 sm:bg-dark-500 flex-col sm:w-[378px] p-6 m-auto items-center">
        <div>
          <span className="text-h1">{t.auth.signIn}</span>
        </div>
        <div className="flex items-center gap-[60px] pt-2">
          <GoogleButton />
          <GithubAuth />
        </div>
        <div className="flex w-full flex-col gap-[24px] pt-[24px]">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                error={isError ? t.auth.incorrectPassword : errors.email?.message}
                fullWidth
                label={t.auth.email}
                onChange={e => {
                  field.onChange(e)
                  onFieldChange('email')
                }}
                placeholder={t.auth.emailPlaceholder}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                error={isError ? t.auth.incorrectPassword : errors.password?.message}
                fullWidth
                label={t.auth.password}
                onChange={e => {
                  field.onChange(e)
                  onFieldChange('password')
                }}
                type="password"
              />
            )}
          />
        </div>
        <Link className="text-regular-14 text-light-900 ml-auto pt-[36px]" href="/forgot-password">
          {t.auth.forgotPassword}
        </Link>
        <div className="w-full flex flex-col items-center pt-[24px]">
          <Button className="text-h3" fullWidth>
            {t.auth.signIn}
          </Button>
          <span className="text-regular-16 pt-[18px] pb-[6px]">{t.auth.dontHaveAnAccount}</span>
          <Link href="/sign-up">
            <Button className="text-h3" variant="text">
              {t.auth.signUp}
            </Button>
          </Link>
        </div>
      </Card>
    </form>
  )
}
