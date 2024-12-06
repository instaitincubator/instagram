import { useEffect } from 'react'

import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import { useGoogleSignInMutation } from '@/services/auth/signInApi'
import { useRouter } from 'next/router'

export const Google = () => {
  const [googleSignIn] = useGoogleSignInMutation()

  const router = useRouter()
  const { code } = router.query

  useEffect(() => {
    if (code) {
      googleSignIn({ code: code })
    }
  }, [code])

  return <div>google code: {router.query.code}</div>
}
Google.getLayout = getLayoutWithSidebar
export default Google
