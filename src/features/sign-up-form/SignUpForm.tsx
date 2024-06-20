import { SignUpFormType, useSignUpForm } from '@/features/sign-up-form/useSignUpForm'
import { Card } from '@/shared/ui/Card/Card'
import { Input } from '@/shared/ui/Input/Input'
import { Controller } from 'react-hook-form'
import Image from 'next/image'
import Link from 'next/link'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import Button from '@/shared/ui/Button/Button'

interface Props {
  SignUp: (arg: SignUpFormType) => void
}

export const SignUpForm = ({ SignUp }: Props) => {
  const { control, errors, handleSubmit } = useSignUpForm()

  const onSubmit = (data: SignUpFormType) => {
    SignUp(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-[378px] h-[648px] mx-auto my-auto p-[24px]">
        <h1 className="text-light-100 text-h1 text-center mb-[13px]">Sign Up</h1>

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
            name="username"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.email?.message}
                fullWidth
                label="Username"
                placeholder="Epam11"
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
                label="Email"
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
                error={errors.email?.message}
                fullWidth
                label="Password"
                placeholder="******************"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                error={errors.email?.message}
                fullWidth
                label="Password confirmation"
                placeholder="******************"
              />
            )}
          />

          <Checkbox
            checked
            className="mb-[22px] text-small ml-[15px]"
            label="I agree to the Terms of Service and Privacy Policy"
          />
        </div>

        <Button className="btn-primary mb-[20px]" fullWidth>
          Sign Up
        </Button>

        <p className="text-light-100 text-center mb-[6px]">Do you have an account?</p>

        <Button fullWidth variant="text">
          Sign In
        </Button>
      </Card>
    </form>
  )
}
