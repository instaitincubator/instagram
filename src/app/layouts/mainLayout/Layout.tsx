import { PropsWithChildren, ReactElement, useEffect } from 'react'

import { authActions } from '@/app/authSlice'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { Header } from '@/features/header/Header'
import { useMeQuery } from '@/services/auth/signInApi'
import { useUpdateTokenMutation } from '@/services/auth/updateToken'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props
  const [updateToken, { error, isError }] = useUpdateTokenMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const { data: me } = useMeQuery({}, { skip: !isAuth })

  useEffect(() => {
    if (error && 'status' in error! && error?.status === 401) {
      router.push('/sign-in')
      dispatch(authActions.setIsAuth(false))
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen text-light-100 bg-dark-700 min-w-[360px]">
      <Header isError={isError} />
      <div className="flex flex-1 sm:justify-center sm:items-center">{children}</div>
    </div>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
