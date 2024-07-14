import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/app/layouts/mainLayout/Layout'
import { SideBar } from '@/shared/ui/SideBar/SideBar'
import { NextPage } from 'next'

export const LayoutWithSidebar: NextPage<PropsWithChildren> = props => {
  const { children } = props

  return (
    <Layout>
      <div className="flex flex-1">
        <SideBar />
        <div className="flex flex-col">{children}</div>
      </div>
    </Layout>
  )
}

export const getLayoutWithSidebar = (page: ReactElement) => {
  return <LayoutWithSidebar>{page}</LayoutWithSidebar>
}
