import { useState } from 'react';

import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar';
import { UserInfo } from '@/features/UserInfo/UserInfo';
import { useMeQuery } from '@/services/auth/signInApi';
import { useGetPostsQuery } from '@/services/profile/postsApi';
import {
    useGetFollowersQuery,
    useGetFollowingQuery,
    useGetProfileInfoQuery,
} from '@/services/profile/profileApi';
import { useTranslation } from '@/shared/hooks/useTranslation';
import {
    GetProfilePostsParams,
    ProfileInfo,
} from '@/shared/types/ApiTypes/ProfileApiTypes';

const Profile = () => {
    const { data: me } = useMeQuery();
    const { data: profileInfo } = useGetProfileInfoQuery();

    const params: GetProfilePostsParams = {
        userName: me?.userName!,
    };
    const { t } = useTranslation();
    const { data: posts } = useGetPostsQuery(params);
    const { data: followers } = useGetFollowersQuery(profileInfo?.userName!);
    const { data: following } = useGetFollowingQuery(profileInfo?.userName!);

    const isProfileOwner = me?.userId === profileInfo?.id;

    return (
        <div className="flex flex-col gap-[13px] flex-1 pt-[24px] px-[15px] md:pr-16 md:pl-6 md:pt-[35px] w-full">
            <UserInfo
                followers={followers}
                following={following}
                isProfileOwner={isProfileOwner}
                posts={posts}
                profile={profileInfo}
            />
            <div className={'block md:hidden'}>
                <span className={'block md:hidden'}>
                    {profileInfo?.aboutMe}
                </span>
            </div>
        </div>
    );
};

Profile.getLayout = getLayoutWithSidebar;
export default Profile;
