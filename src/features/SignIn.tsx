import React from 'react'

import { Card } from '@/shared/ui/Card/Card'
import Image from 'next/image'

export const SignInForm = () => {
  const onSubmit = () => {}

  return (
    <form>
      <Card className="flex flex-col items-center">
        <div className="py-[23px]">
          <span>Sign In</span>
        </div>
        <div className="py-[13px]">
          <Image alt="git" height={36} src="/google.svg" width={36} />
          <Image alt="git" height={36} src="/git.svg" width={36} />
        </div>
      </Card>
    </form>
  )
}
