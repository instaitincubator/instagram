import Avatar from 'react-avatar'

import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import { useMeQuery } from '@/services/auth/signInApi'
import { useGetPostsQuery } from '@/services/profile/postsApi'
import {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetProfileInfoQuery,
} from '@/services/profile/profileApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { GetProfilePostsParams } from '@/shared/types/ApiTypes/ProfileApiTypes'
import Button from '@/shared/ui/Button/Button'
import Link from 'next/link'

const Profile = () => {
  const { data: me } = useMeQuery()
  const { data: profileInfo } = useGetProfileInfoQuery()

  const params: GetProfilePostsParams = {
    userName: me?.userName!,
  }
  const { t } = useTranslation()
  const { data: posts } = useGetPostsQuery(params)
  const { data: followers } = useGetFollowersQuery(profileInfo?.userName!)
  const { data: following } = useGetFollowingQuery(profileInfo?.userName!)

  const profileName = `${profileInfo?.firstName} ${profileInfo?.lastName}`
  const isProfileOwner = me?.userId === profileInfo?.id

  return (
    <div className="flex flex-col gap-[13px] flex-1 pt-[24px] px-[15px] md:pr-16 md:pl-6 md:pt-[35px] w-full">
      <div className="flex flex-row">
        <div className=" hidden md:block min-w-40">
          <Avatar
            name={profileName}
            round
            size="160px"
            src={profileInfo?.avatars?.[0]?.url || ''}
          />
        </div>
        <div className="flex gap-1.5 flex-col md:hidden w-full">
          <Avatar name={profileName} round size="72px" src={profileInfo?.avatars?.[0]?.url || ''} />
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
              <span className={'text-semibold-small md:text-bold-14'}>{following?.totalCount}</span>
              <span className={'text-small md:text-regular-14'}>{t.profile.following}</span>
            </div>
            <div className="flex  items-center flex-col">
              <span className={'text-semibold-small md:text-bold-14'}>{followers?.totalCount}</span>
              <span className={'text-small md:text-regular-14'}>{t.profile.followers}</span>
            </div>
            <div className="flex  items-center flex-col ">
              <span className={'text-semibold-small md:text-bold-14'}>{posts?.totalCount}</span>
              <span className={'text-small md:text-regular-14'}>{t.profile.publications}</span>
            </div>
          </div>
          <span className={'hidden md:block'}>{profileInfo?.aboutMe}</span>
        </div>
      </div>
      <div className={'block md:hidden'}>
        <span className={'block md:hidden'}>{profileInfo?.aboutMe}</span>
      </div>
    </div>
  )
}

Profile.getLayout = getLayoutWithSidebar
export default Profile
