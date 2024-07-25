import { ComponentType, ReactElement, useEffect } from 'react'

import { useAppSelector } from '@/app/store'
import { useRouter } from 'next/router'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
  return (props: P): ReactElement | null => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const router = useRouter()

    useEffect(() => {
      if (!isAuth) {
        router.push('/sign-in')
      }
    }, [isAuth, router])

    if (isAuth) {
      return <WrappedComponent {...props} />
    }

    return null
  }
}

export default withAuth
