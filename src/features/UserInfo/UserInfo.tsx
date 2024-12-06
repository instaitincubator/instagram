import type {
  Avatars,
  ProfileFollowers,
  ProfileFollowing,
  ProfileInfo,
  ProfilePosts,
  ProfilePublicPosts,
} from '@/shared/types/ApiTypes/ProfileApiTypes'

import Avatar from 'react-avatar'

import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import Link from 'next/link'

type Props = {
  followers?: ProfileFollowers
  followersForPublic?: number
  following?: ProfileFollowing
  followingForPublic?: number
  isProfileOwner: boolean
  posts?: ProfilePosts
  postsForPublic?: ProfilePublicPosts
  profile?: Partial<ProfileInfo>
}

export const UserInfo = ({
  followers,
  followersForPublic,
  following,
  followingForPublic,
  isProfileOwner,
  posts,
  postsForPublic,
  profile,
}: Props) => {
  const { t } = useTranslation()
  const profileName = profile?.userName

  return (
    <div className="flex ">
      <div className="hidden md:block min-w-40">
        <Avatar name={profileName} round size="160px" src={profile?.avatars?.[0]?.url || ''} />
      </div>
      <div className="flex gap-1.5 flex-col md:hidden w-full">
        <Avatar name={profileName} round size="72px" src={profile?.avatars?.[0]?.url || ''} />
        <span className="text-bold-16 md:hidden">{profileName}</span>
      </div>

      <div className="w-full pl-[7px] md:pl-9 flex flex-col">
        <div className="flex justify-between w-full">
          <span className="hidden text-h1 md:block">{profileName}</span>
          {isProfileOwner && (
            <Link className={'hidden md:block'} href="/profile/settings">
              <Button className={'text-h3'} variant="secondary">
                {t.profile.profileSetting}
              </Button>
            </Link>
          )}
        </div>
        <div className="flex gap-[33px]  md:gap-[100px] pb-6 pt-5">
          <div className="flex items-center flex-col ">
            <span className={'text-semibold-small md:text-bold-14'}>
              {following?.totalCount ?? followingForPublic}
            </span>
            <span className={'text-small md:text-regular-14'}>{t.profile.following}</span>
          </div>
          <div className="flex  items-center flex-col">
            <span className={'text-semibold-small md:text-bold-14'}>
              {followers?.totalCount ?? followersForPublic}
            </span>
            <span className={'text-small md:text-regular-14'}>{t.profile.followers}</span>
          </div>
          <div className="flex  items-center flex-col ">
            <span className={'text-semibold-small md:text-bold-14'}>
              {posts?.totalCount ?? postsForPublic?.totalCount}
            </span>
            <span className={'text-small md:text-regular-14'}>{t.profile.publications}</span>
          </div>
        </div>
        <p
          className={'hidden md:block'}
          dangerouslySetInnerHTML={{
            __html: (profile?.aboutMe || '').replace(/\n\r?/g, '<br/>'),
          }}
        />
      </div>
    </div>
  )
}
