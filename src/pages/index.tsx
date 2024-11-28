import React, { useEffect, useLayoutEffect } from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import CountRegisteredUsers from '@/entities/CountRegisteredUsers/CountRegisteredUsers'
import PublicPosts from '@/features/public/PublicPosts'
import { useGetAllPublicPostsQuery } from '@/features/public/api/allPublicPost'
import { useGetTotalUsersCountQuery } from '@/features/public/api/publicProfileCounts'
import { useGoogleSignInMutation, useMeQuery } from '@/services/auth/signInApi'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { code } = router.query
  const [googleSignIn, { isLoading: isSignInLoading, isSuccess }] = useGoogleSignInMutation()
  const { data: me, isLoading: isMeLoading } = useMeQuery()
  const { data, error, isLoading } = useGetTotalUsersCountQuery()
  const { data: posts, error: errorPost, isLoading: isLoadingPost } = useGetAllPublicPostsQuery({})

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

  if (isLoading || isLoadingPost || isSignInLoading || isMeLoading) {
    return <div>Loading...</div>
  }
  if (error || errorPost) {
    return <div>Error...</div>
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
