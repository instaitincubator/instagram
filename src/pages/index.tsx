import React, { useEffect, useLayoutEffect } from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import CountRegisteredUsers from '@/entities/CountRegisteredUsers/CountRegisteredUsers'
import PublicPosts from '@/features/public/PublicPosts'
import { useGoogleSignInMutation, useMeQuery } from '@/services/auth/signInApi'
import { useGetAllPublicPostsQuery } from '@/services/public/allPublicPost'
import { useGetTotalUsersCountQuery } from '@/services/public/publicProfileCounts'
import { AllPublicPosts, GetTotalUsersResponse } from '@/shared/types/public.types'
import { useRouter } from 'next/router'

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

  const router = useRouter()
  const { code } = router.query
  const [googleSignIn, { isLoading: isSignInLoading, isSuccess }] = useGoogleSignInMutation()
  const { data: me, isLoading: isMeLoading } = useMeQuery()

  useEffect(() => {
    if (code) {
      googleSignIn({ code: code })
    }
  }, [router, googleSignIn, code, me])

  useLayoutEffect(() => {
    if (isSuccess && me) {
      const userId = me?.userId

      router.push(`/profile/${userId}`)
    }
  }, [isSuccess, me, router])

  if (isSignInLoading || isMeLoading) {
    return <div>Loading...</div>
  }

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
