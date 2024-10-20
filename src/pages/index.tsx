import { useEffect } from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { useGoogleSignInMutation, useMeQuery } from '@/services/auth/signInApi'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { code } = router.query
  const [googleSignIn, { isSuccess }] = useGoogleSignInMutation()
  const { data: me } = useMeQuery()

  useEffect(() => {
    if (code !== undefined && code !== '') {
      googleSignIn({ code: code })
    }
  }, [router, googleSignIn, code, me])

  useEffect(() => {
    if (isSuccess && me) {
      const userId = me.userId

      router.push(`/profile/${userId}`)
    }
  }, [isSuccess, me, router])

  return <div className="flex py-[100px] px-[100px]"></div>
}

Home.getLayout = getLayout
