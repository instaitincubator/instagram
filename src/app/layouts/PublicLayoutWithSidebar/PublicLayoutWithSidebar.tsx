import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/app/layouts/mainLayout/Layout'
import { MobileSideBar } from '@/features/SideBar/MobileSidebar'
import { SideBar } from '@/features/SideBar/SideBar'
import { CreatePost } from '@/features/create-post/createPost'
import { useMeQuery } from '@/services/auth/signInApi'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

export const PublicLayoutWithSidebar: NextPage<PropsWithChildren> = props => {
  const { children } = props
  const { isSuccess } = useMeQuery()
  const router = useRouter()

  return (
    <Layout>
      <div className="sm:flex sm:flex-1 w-full overflow-y-auto">
        <div className="flex flex-1 flex-col overflow-x-auto order-1">
          {router.query.createPost === 'true' && <CreatePost />}
          {children}
        </div>
        {isSuccess && (
          <div className="z-0 sm:block sm:border-r border-dark-300">
            <div className="hidden sm:flex">
              <SideBar />
            </div>
            <div className="flex sm:hidden">
              <MobileSideBar />
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getPublicLayoutWithSidebar = (page: ReactElement) => {
  return <PublicLayoutWithSidebar>{page}</PublicLayoutWithSidebar>
}
