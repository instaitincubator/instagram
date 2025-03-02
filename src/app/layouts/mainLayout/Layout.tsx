import { PropsWithChildren, ReactElement } from 'react'

import { NotificationAlerts } from '@/app/layouts/mainLayout/ui/NotificationAlerts'
import { Header } from '@/features/header/Header'
import { NextPage } from 'next'

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props

  return (
    <div className="flex flex-col min-h-screen text-light-100 bg-dark-700 min-w-[360px]">
      <Header />
      <div className="flex flex-1 sm:justify-center sm:items-center h-full">{children}</div>
      <NotificationAlerts />
    </div>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
