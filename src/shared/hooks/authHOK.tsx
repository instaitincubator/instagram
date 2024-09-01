import { ComponentType, ReactElement, useEffect } from 'react'

import { useMeQuery } from '@/services/auth/signInApi'
import { useRouter } from 'next/router'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
  return (props: P): ReactElement | null => {
    const { isError, isLoading } = useMeQuery()
    const router = useRouter()

    useEffect(() => {
      if (isError) {
        void router.push('/sign-in')
      }
    }, [isError, router])

    if (isLoading) {
      return <div>Loading</div>
    }
    if (isError) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
