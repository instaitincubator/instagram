import React from 'react'

import { Card } from '@/shared/ui/Card/Card'
import Image from 'next/image'

export const SignInForm = () => {
  const onSubmit = () => {}

  return (
    <form>
      <Card className="flex flex-col p-[24px] items-center p-[24px]">
        <span>Sign In</span>
        <Image alt="git" height={36} src="/google.svg" width={36} />
        <Image alt="git" height={36} src="/git.svg" width={36} />
      </Card>
    </form>
  )
}
