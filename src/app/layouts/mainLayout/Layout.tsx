import { PropsWithChildren, ReactElement, useEffect } from 'react'

import { useAppDispatch } from '@/app/store'
import { Header } from '@/features/header/Header'
import { useUpdateTokenMutation } from '@/services/auth/updateToken'
import { NextPage } from 'next'

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props
  const [updateToken, { isError, isLoading }] = useUpdateTokenMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    updateToken({})
  }, [])

  return (
    <div className="flex flex-col min-h-screen text-light-100 bg-dark-700 min-w-[360px]">
      <Header isLoading={isLoading} />
      <div className="flex flex-1 sm:justify-center sm:items-center">{children}</div>
    </div>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
