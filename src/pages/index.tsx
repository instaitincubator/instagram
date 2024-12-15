import React from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import CountRegisteredUsers from '@/entities/CountRegisteredUsers/CountRegisteredUsers'
import PublicPosts from '@/features/public/PublicPosts'
import { AllPublicPosts, GetTotalUsersResponse } from '@/shared/types/public.types'

export async function getStaticProps() {
  const totalUsers = await fetch('https://inctagram.work/api/v1/public-user')
  const totalUsersData = await totalUsers.json()
  const posts = await fetch(
    'https://inctagram.work/api/v1/public-posts/all?pageSize=4&sortDirection=desc'
  )
  const postsData = await posts.json()

  return {
    props: {
      postsData,
      totalUsersData,
    },
    revalidate: 60,
  }
}

type Props = {
  postsData: AllPublicPosts
  totalUsersData: GetTotalUsersResponse
}
export default function Home(props: Props) {
  const { postsData: posts, totalUsersData: data } = props

  return (
    <div className="px-[16px] md:px-16 w-full">
      <div className="py-6 w-full max-w-[976px] mx-auto">
        <CountRegisteredUsers count={data?.totalCount} />
        <PublicPosts posts={posts?.items} />
      </div>
    </div>
  )
}

Home.getLayout = getLayout
