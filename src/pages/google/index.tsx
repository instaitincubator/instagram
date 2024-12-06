import { useEffect, useLayoutEffect } from 'react'

import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
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
  }, [code])

  useLayoutEffect(() => {
    if (isSuccess && me) {
      const userId = me?.userId

      router.push(`/profile/${userId}`)
    }
  }, [isSuccess, me, router])

  return <div>google code: {router.query.code}</div>
}
Google.getLayout = getLayoutWithSidebar
export default Google
