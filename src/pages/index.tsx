import { useEffect } from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { useGoogleSignInMutation } from '@/services/auth/signInApi'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { code } = router.query
  const [googleSignIn] = useGoogleSignInMutation()

  useEffect(() => {
    if (code !== undefined && code !== '') {
      googleSignIn({ code: code })
    }
  }, [router, googleSignIn, code])

  return <div className="flex py-[100px] px-[100px]"></div>
}

Home.getLayout = getLayout
