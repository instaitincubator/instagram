import { PropsWithChildren } from 'react'

import { useAppSelector } from '@/app/store'
import { useRouter } from 'next/router'

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const router = useRouter()

  if (!isAuth) {
    router.push('/sign-in')
  }

  return <>{children}</>
}
