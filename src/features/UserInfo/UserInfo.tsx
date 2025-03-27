import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'

import { ButtonForOtherUsersProfile } from '@/entities/ButtonforOtherUsersProfile/buttonForOtherUsersProfile'
import { useMeQuery } from '@/services/auth/signInApi'
import { useLazyGetPublicUserQuery } from '@/services/public/publicProfileCounts'
import { useGetUserWithFollowingStatusQuery } from '@/services/users/users-following/usersFollowing-api'
import useIsMobile from '@/shared/hooks/useIsMobile'
import { useTranslation } from '@/shared/hooks/useTranslation'
import {
  ProfileInfo,
  ProfilePosts,
  ProfilePublicPosts,
} from '@/shared/types/ApiTypes/ProfileApiTypes'
import Button from '@/shared/ui/Button/Button'
import { cn } from '@/shared/utils/cn'
import Link from 'next/link'

interface Props {
  posts?: ProfilePosts
  postsForPublic?: ProfilePublicPosts
  profileInfo: ProfileInfo
}

export const UserInfo = ({ posts, postsForPublic, profileInfo }: Props) => {
  const [profile, setProfile] = useState<ProfileInfo>(profileInfo)
  const [fetchProfile, { data: newProfileInfo, isSuccess }] = useLazyGetPublicUserQuery()
  const { t } = useTranslation()
  const me = useMeQuery()
  const isMobile = useIsMobile(480)
  const isProfileOwner = me?.data?.userId === profile.id
  const { data: userFollowingStatus } = useGetUserWithFollowingStatusQuery(profile.userName)

  useEffect(() => {
    if (profileInfo) {
      setProfile(profileInfo)
    }
  }, [profileInfo])

  useEffect(() => {
    if (newProfileInfo && isSuccess) {
      setProfile(newProfileInfo)
    }
  }, [newProfileInfo])

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full pb-4">
        <div className="hidden md:block min-w-40">
          <Avatar
            name={profile.userName}
            round
            size="160px"
            src={profile.avatars?.[0]?.url || ''}
          />
        </div>
        <div className="flex gap-1.5 flex-col md:hidden w-full">
          <Avatar name={profile.userName} round size="72px" src={profile.avatars?.[0]?.url || ''} />
          <span className="text-bold-16 md:hidden">{profile.userName}</span>
        </div>
        <div className="w-full pl-[7px] md:pl-9 flex flex-col">
          <div className="flex justify-between w-full">
            <span className="hidden text-h1 md:block">{profile.userName}</span>
            {isProfileOwner && (
              <Link className="hidden md:block" href="/public-profile/settings">
                <Button className="text-h3" variant="secondary">
                  {t.profile.profileSetting}
                </Button>
              </Link>
            )}
            {!isMobile && (
              <ButtonForOtherUsersProfile
                fetchProfile={fetchProfile}
                isFollowing={userFollowingStatus?.isFollowing!}
                isProfileOwner={isProfileOwner}
                userId={profile.id}
              />
            )}
          </div>
          <div className="flex gap-[33px] md:gap-[100px] pb-6 pt-5">
            <div className="flex items-center flex-col ">
              <span className="text-semibold-small min-h-[20px] md:text-bold-14">
                {userFollowingStatus?.followingCount}
              </span>
              <span className="text-small md:text-regular-14">{t.profile.following}</span>
            </div>
            <div className="flex  items-center flex-col">
              <span className="text-semibold-small min-h-[20px] md:text-bold-14">
                {userFollowingStatus?.followersCount}
              </span>
              <span className="text-small md:text-regular-14">{t.profile.followers}</span>
            </div>
            <div className="flex items-center flex-col ">
              <span className="text-semibold-small min-h-[20px] md:text-bold-14">
                {posts?.totalCount ?? postsForPublic?.totalCount}
              </span>
              <span className="text-small md:text-regular-14">{t.profile.publications}</span>
            </div>
          </div>
          <p
            className={cn('hidden md:block ', { 'max-w-[750px]': !me?.data?.userId })}
            dangerouslySetInnerHTML={{
              __html: (profile.aboutMe || '').replace(/\n\r?/g, '<br/>'),
            }}
          />
        </div>
      </div>
      <div className="block md:hidden">
        <span className="block md:hidden">{profile?.aboutMe}</span>
      </div>
      {isMobile && (
        <ButtonForOtherUsersProfile
          fetchProfile={fetchProfile}
          isFollowing={userFollowingStatus?.isFollowing!}
          isProfileOwner={isProfileOwner}
          userId={profile.id}
        />
      )}
    </div>
  )
}
