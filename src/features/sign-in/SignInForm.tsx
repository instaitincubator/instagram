import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

import { SignInFormType, useSignInForm } from '@/features/sign-in/useSignInForm'
import { useLazyMeQuery, useMeQuery, useSignInMutation } from '@/services/auth/signInApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Input } from '@/shared/ui/Input/Input'
import { GithubAuth } from '@/shared/ui/githubAuth'
import { GoogleButton } from '@/shared/ui/googleAuth'
import { setToken } from '@/shared/utils/storage'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const SignInForm = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const { control, errors, handleSubmit } = useSignInForm()
  const [signIn, { isSuccess }] = useSignInMutation()
  const [getMe] = useLazyMeQuery()
  const { refetch } = useMeQuery()
  const [id, setId] = useState<null | number>(null)
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
        setId(userId)
        // void router.replace(`/profile/${userId}`)
      })
      .catch()
  }

  useEffect(() => {
    if (isSuccess && id !== null) {
      router.push(`/profile/${id}`)
    }
  }, [isSuccess, id])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="flex flex-col w-[378px] p-6 m-auto items-center">
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
                error={errors.email?.message}
                fullWidth
                label={t.auth.email}
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
                error={errors.password?.message}
                fullWidth
                label={t.auth.password}
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
