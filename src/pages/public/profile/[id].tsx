import { useGetPostsQuery } from '@/services/profile/postsApi'
import {
	useGetFollowersQuery,
	useGetFollowingQuery,
} from '@/services/profile/profileApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { GetProfilePostsParams, ProfileInfo } from '@/shared/types/ApiTypes/ProfileApiTypes'
import { UserInfo } from '@/features/UserInfo/UserInfo'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLazyGetPublicUserQuery } from '@/features/public/api/publicProfileCounts'
import { getPublicLayoutWithSidebar } from '@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar'

const Profile = () => {
	const router = useRouter()
	const [profileInfo, setProfileInfo] = useState<ProfileInfo | undefined>()

	const [getProfileInfo] = useLazyGetPublicUserQuery()
	console.log(router.query);

	useEffect(() => {
		if (router.query.id) {
			getProfileInfo(Number(router.query.id)).then(res => setProfileInfo(res.data))
		}
	}, [router.query])
	const params: GetProfilePostsParams = {
		userName: profileInfo?.userName!,
	}
	const { t } = useTranslation()
	const { data: posts } = useGetPostsQuery(params)
	const { data: followers } = useGetFollowersQuery(profileInfo?.userName!)
	const { data: following } = useGetFollowingQuery(profileInfo?.userName!)

	const isProfileOwner = false

	return (
		<div className="flex flex-col gap-[13px] flex-1 pt-[24px] px-[15px] md:pr-16 md:pl-6 md:pt-[35px] w-full">
			<UserInfo
				profile={profileInfo}
				isProfileOwner={isProfileOwner}
				posts={posts}
				followers={followers}
				following={following}
			/>
			<div className={'block md:hidden'}>
				<span className={'block md:hidden'}>{profileInfo?.aboutMe}</span>
			</div>
		</div>
	)
}

Profile.getLayout = getPublicLayoutWithSidebar
export default Profile
