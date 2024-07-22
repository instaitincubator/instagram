import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/app/layouts/mainLayout/Layout'
import { SideBar } from '@/features/SideBar/SideBar'
import { NextPage } from 'next'

import withAuth from '../../../../hooks/authHOK'

export const LayoutWithSidebar: NextPage<PropsWithChildren> = props => {
  const { children } = props

  return (
    <Layout>
      <div className="sm:flex sm:flex-1 w-full h-headerHeight overflow-y-auto">
        <div className="flex flex-1 flex-col overflow-x-auto order-1">{children}</div>
        <div className="sm:border-r border-dark-300 min-h-full h-fit">
          <SideBar />
        </div>
      </div>
    </Layout>
  )
}

export const WrappedLayoutWithSidebar = withAuth(LayoutWithSidebar)

export const getLayoutWithSidebar = (page: ReactElement) => {
  return <WrappedLayoutWithSidebar>{page}</WrappedLayoutWithSidebar>
}
