import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/app/layouts/mainLayout/Layout'
import { MobileSideBar } from '@/features/SideBar/MobileSidebar'
import { SideBar } from '@/features/SideBar/SideBar'
import withAuth from '@/shared/hooks/authHOK'
import { NextPage } from 'next'

export const LayoutWithSidebar: NextPage<PropsWithChildren> = props => {
  const { children } = props

  return (
    <Layout>
      <div className="sm:flex sm:flex-1 w-full h-headerHeight overflow-y-auto">
        <div className="flex flex-1 flex-col overflow-x-auto order-1">{children}</div>
        <div className=" sm:block sm:border-r border-dark-300 min-h-full h-fit">
          <div className="hidden sm:flex">
            <SideBar />
          </div>
          <div className="flex sm:hidden">
            <MobileSideBar />
          </div>
        </div>
      </div>
    </Layout>
  )
}

const WrappedLayoutWithSidebar = withAuth(LayoutWithSidebar)

export const getLayoutWithSidebar = (page: ReactElement) => {
  return <WrappedLayoutWithSidebar>{page}</WrappedLayoutWithSidebar>
}
