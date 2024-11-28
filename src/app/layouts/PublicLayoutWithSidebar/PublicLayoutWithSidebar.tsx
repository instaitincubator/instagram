import { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/app/layouts/mainLayout/Layout'
import { MobileSideBar } from '@/features/SideBar/MobileSidebar'
import { SideBar } from '@/features/SideBar/SideBar'
import { NextPage } from 'next'
import { useMeQuery } from '@/services/auth/signInApi'

export const PublicLayoutWithSidebar: NextPage<PropsWithChildren> = props => {
	const { children } = props
	const { isFetching, isLoading, isSuccess } = useMeQuery()

	return (
		<Layout>
			<div className="sm:flex sm:flex-1 w-full h-headerHeight overflow-y-auto">
				<div className="flex flex-1 flex-col overflow-x-auto order-1">{children}</div>
				{isSuccess && (
					<div className=" sm:block sm:border-r border-dark-300 min-h-full h-fit">
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
