import React from 'react'

import Image from 'next/image'

export const GithubAuth = () => {
  const login = () => {
    // const CLIENT_ID = '344513cb4d7cd98d9669'
    // const SCOPE = 'user:email'

    // const URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`

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
