import React from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import CountRegisteredUsers from '@/entities/CountRegisteredUsers/CountRegisteredUsers'
import PublicPosts from '@/features/public/PublicPosts'
import { useMeQuery } from '@/services/auth/signInApi'
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

  const { data: me } = useMeQuery()

  return (
    <div className="py-6 w-full max-w-[972px] mx-auto">
      {!me && (
        <>
          <CountRegisteredUsers count={data?.totalCount} />
          <PublicPosts posts={posts?.items} />
        </>
      )}
    </div>
  )
}

Home.getLayout = getLayout
