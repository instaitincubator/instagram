import React, { useLayoutEffect, useState } from 'react'

import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import { UserInfo } from '@/features/UserInfo/UserInfo'
import { useGoogleSignInMutation, useMeQuery } from '@/services/auth/signInApi'
import { useGetPostsQuery } from '@/services/profile/postsApi'
import {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetProfileInfoQuery,
} from '@/services/profile/profileApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { GetProfilePostsParams, ProfileInfo } from '@/shared/types/ApiTypes/ProfileApiTypes'
import { useRouter } from 'next/router'

const Profile = () => {
  const { data: me, isLoading: isMeLoading } = useMeQuery()
  const { data: profileInfo } = useGetProfileInfoQuery()
  const [googleSignIn, { isLoading: isSignInLoading, isSuccess }] = useGoogleSignInMutation()
  const router = useRouter()

  useLayoutEffect(() => {
    if (isSuccess || me) {
      const userId = me?.userId

      router.push(`/profile/${userId}`)
    }
  }, [isSuccess, me, router])
  const params: GetProfilePostsParams = {
    userName: me?.userName!,
  }

  if (isSignInLoading || isMeLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-[13px] flex-1 pt-[24px] px-[15px] md:pr-16 md:pl-6 md:pt-[35px] w-full"></div>
  )
}

Profile.getLayout = getLayoutWithSidebar
export default Profile
