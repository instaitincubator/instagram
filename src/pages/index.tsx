import React from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import CountRegisteredUsers from '@/entities/CountRegisteredUsers/CountRegisteredUsers'
import PublicPosts from '@/features/public/PublicPosts'
import { useGetAllPublicPostsQuery } from '@/features/public/api/allPublicPost'
import { useGetTotalUsersCountQuery } from '@/features/public/api/publicProfileCounts'
import { useMeQuery } from '@/services/auth/signInApi'

export default function Home() {
  const { data: me } = useMeQuery()
  const { data } = useGetTotalUsersCountQuery()
  const { data: posts } = useGetAllPublicPostsQuery({})

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
