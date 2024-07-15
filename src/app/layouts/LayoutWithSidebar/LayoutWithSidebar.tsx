import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/app/layouts/mainLayout/Layout'
import { SideBar } from '@/shared/ui/SideBar/SideBar'
import { NextPage } from 'next'

export const LayoutWithSidebar: NextPage<PropsWithChildren> = props => {
  const { children } = props

  return (
    <Layout>
      <div className="md:flex md:flex-1 w-full">
        <div className="flex flex-col order-1">{children}</div>
        <SideBar />
      </div>
    </Layout>
  )
}

export const getLayoutWithSidebar = (page: ReactElement) => {
  return <LayoutWithSidebar>{page}</LayoutWithSidebar>
}
