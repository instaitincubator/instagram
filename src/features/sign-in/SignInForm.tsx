import React from 'react'
import { Controller } from 'react-hook-form'

import { SignInFormType, useSignInForm } from '@/features/sign-in/useSignInForm'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Input } from '@/shared/ui/Input/Input'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  signIn: (arg: SignInFormType) => void
}

export const SignInForm = ({ signIn }: Props) => {
  const { control, errors, handleSubmit, isValid } = useSignInForm()
  const onSubmit = (data: SignInFormType) => {
    signIn(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="flex flex-col p-6 items-center">
        <div>
          <span className="text-h1">Sign In</span>
        </div>
        <div className="flex items-center gap-[60px] pt-2">
          <Image alt="git" height={36} src="/google.svg" width={36} />
          <Image alt="git" height={36} src="/git.svg" width={36} />
        </div>
        <div className="flex flex-col gap-[24px] pt-[24px]">
          <Controller
            control={control}
            name="email"
            render={({ field }) => <Input {...field} error={errors.email?.message} label="Email" />}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.password?.message}
                label="Password"
                placeholder="***********"
                type="password"
              />
            )}
          />
        </div>
        <Link className="text-regular-14 text-light-900 ml-auto pt-[36px]" href="/">
          Forgot Password
        </Link>
        <div className="w-full flex flex-col items-center pt-[24px]">
          <Button className="text-h3" fullWidth>
            Sign In
          </Button>
          <span className="text-regular-16 pt-[18px] pb-[6px]">Dont have an account?</span>
          <Button className="text-h3" variant="text">
            Sign Up
          </Button>
        </div>
      </Card>
    </form>
  )
}
