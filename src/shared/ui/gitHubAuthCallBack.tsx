import { useEffect } from 'react'

import { authActions } from '@/app/authSlice'
import { useAppDispatch } from '@/app/store'
import { useRouter } from 'next/router'

export const GithubAuthCallback = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { accessToken } = router.query

  if (accessToken) {
    dispatch(authActions.setAccessToken(accessToken as string))
    router.push('/')
  }

  return <div>gitHub</div>
}
