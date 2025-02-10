import { useEffect, useLayoutEffect } from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { useGoogleSignInMutation, useMeQuery } from '@/services/auth/signInApi'
import { useRouter } from 'next/router'

export const Google = () => {
  const [googleSignIn, { isSuccess }] = useGoogleSignInMutation()
  const { data: me } = useMeQuery()

  const router = useRouter()
  const { code } = router.query

  useEffect(() => {
    if (code) {
      googleSignIn({ code: code })
    }
  }, [router, googleSignIn, code, me])

  useLayoutEffect(() => {
    if (isSuccess && me) {
      const userId = me?.userId

      void router.push(`/public-profile/profile/${userId}`)
    }
  }, [isSuccess, me, router])

  return <></>
}
Google.getLayout = getLayout
export default Google
