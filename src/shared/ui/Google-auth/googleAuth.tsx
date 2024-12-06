import React from 'react'

import Image from 'next/image'
import NProgress from 'nprogress'

export const GoogleButton = () => {
  const login = () => {
    NProgress.start()
    const CLIENT_ID = '272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com'
    const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIREC_DOMAIN
    const SCOPE = 'email profile'
    const RESPONSE_TYPE = 'code'
    const PROMPT = 'select_account'

    const URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&prompt=${PROMPT}`

    window.location.assign(URL)
  }

  return (
    <Image
      alt="google"
      className="cursor-pointer"
      height={36}
      onClick={login}
      src="/google.svg"
      width={36}
    />
  )
}
