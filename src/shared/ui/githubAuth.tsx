import React from 'react'

import Image from 'next/image'

export const GithubAuth = () => {
  const login = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login')
  }

  return (
    <Image
      alt="gitHub"
      className="cursor-pointer"
      height={36}
      onClick={login}
      src="/git.svg"
      width={36}
    />
  )
}
