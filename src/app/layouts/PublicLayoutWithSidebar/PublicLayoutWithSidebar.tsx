import { PropsWithChildren, ReactElement, useEffect } from 'react'

import { Layout } from '@/app/layouts/mainLayout/Layout'
import { MobileSideBar } from '@/features/SideBar/MobileSidebar'
import { SideBar } from '@/features/SideBar/SideBar'
import { NextPage } from 'next'
import { useMeQuery } from '@/services/auth/signInApi'
import { useRouter } from 'next/router'

export const PublicLayoutWithSidebar: NextPage<PropsWithChildren> = props => {
	const { children } = props
	const { isError, isFetching, isLoading, isSuccess } = useMeQuery()
	// const router = useRouter()

	//   useEffect(() => {
	// 	 if (!isError) {
	// 		return
	// 	 }
	// 	 void router.push('/sign-in')
	//   }, [isError])

	//   if (isLoading || isFetching) {
	// 	 return <div>Loading</div>
	//   }

	//   if (isError) {
	// 	 return null
	//   }
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
