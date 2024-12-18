import React from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import CountRegisteredUsers from '@/entities/CountRegisteredUsers/CountRegisteredUsers'
import PublicPosts from '@/features/public/PublicPosts'
import { useGetTotalUsersCountQuery } from '@/features/public/api/publicProfileCounts'
import { useGetAllPublicPostsQuery } from '@/services/public/allPublicPost'

const Public = () => {
  const { data } = useGetTotalUsersCountQuery()
  const { data: posts } = useGetAllPublicPostsQuery({})

  return (
    <div className="py-6 w-full max-w-[972px] mx-auto">
      <CountRegisteredUsers count={data?.totalCount} />
      <PublicPosts posts={posts?.items} />
    </div>
  )
}

Public.getLayout = getLayout
export default Public
