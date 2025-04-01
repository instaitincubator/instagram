import { PropsWithChildren, ReactElement } from 'react'

import { NotificationAlerts } from '@/app/layouts/mainLayout/ui/NotificationAlerts'
import { Header } from '@/features/header/Header'
import { NextPage } from 'next'

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props

  return (
    <div className="flex flex-col min-h-screen text-light-100 bg-dark-700 min-w-[360px] relative">
      <div className="sticky top-0 z-40">
        <Header />
      </div>
      <div className="flex flex-1 sm:justify-center">{children}</div>
      <NotificationAlerts />
    </div>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
