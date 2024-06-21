import { useEffect } from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { useSignInMutation } from '@/services/auth/googleSignInApi'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { code } = router.query
  const [googleSignIn] = useSignInMutation()

  useEffect(() => {
    if (code !== undefined && code !== '') {
      googleSignIn({ code: code })
    }
  }, [router])

  return <div className="flex py-[100px] px-[100px]"></div>
}

Home.getLayout = getLayout
