import React from 'react'

import Image from 'next/image'

export const GoogleButton = () => {
  const login = () => {
    const CLIENT_ID = '617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com'
    const REDIRECT_URI = process.env.NEXT_PUBLIC_BREEZEAPP
    const SCOPE = 'email profile'
    const RESPONSE_TYPE = 'code'

    const URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

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
