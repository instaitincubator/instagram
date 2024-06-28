import { useEffect } from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { useAppSelector } from '@/app/store'
import { useGoogleSignInMutation, useMeQuery } from '@/services/auth/signInApi'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { code } = router.query

  const [googleSignIn] = useGoogleSignInMutation()
  const accessToken = useAppSelector(state => state.auth.accessToken)
  const { data: me, error } = useMeQuery({}, { skip: !accessToken })

  useEffect(() => {
    if (code !== undefined && code !== '') {
      googleSignIn({ code: code })
    }
  }, [router, googleSignIn, code])

  if (error) {
    router.push('/sign-in')
  }

  return <div className="flex py-[100px] px-[100px]"></div>
}

Home.getLayout = getLayout
