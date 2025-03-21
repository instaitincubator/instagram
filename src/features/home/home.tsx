import { useState } from 'react'

import { homePostsPaginationParams } from '@/features/home/const'
import { useGetFollowersPostsQuery } from '@/services/home-posts/home-page-api'
import { homePageRequest } from '@/services/home-posts/home-page-types'

export const HomePage = () => {
  const [postsPaginationParams, setPostsPaginationParams] =
    useState<homePageRequest>(homePostsPaginationParams)
  const { data } = useGetFollowersPostsQuery(postsPaginationParams)

  console.log(data)

  return <div></div>
}
