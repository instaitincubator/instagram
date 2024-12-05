import { FC, useEffect, useLayoutEffect, useMemo, useState } from "react";

import { getPublicLayoutWithSidebar } from "@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar";
import { ProfileInfoProps, UserInfo } from "@/features/UserInfo/UserInfo";
import { useGetPublicUserQuery, useLazyGetPublicUserQuery } from "@/features/public/api/publicProfileCounts";
import profile from "@/pages/profile";
import { useGetPostsQuery } from "@/services/profile/postsApi";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { GetProfilePostsParams, ProfileInfo, ProfileInfoPublic } from "@/shared/types/ApiTypes/ProfileApiTypes";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState<ProfileInfoPublic | undefined>();

  const [getProfileInfo] = useLazyGetPublicUserQuery();


  useEffect(() => {
    if (router.query.id) {
      getProfileInfo(Number(router.query.id)).then(res => setProfileInfo(res.data));
    }
  }, [router.query]);
  const params: GetProfilePostsParams = {
    userName: profileInfo?.userName!
  };

  console.log(profileInfo);
  const { t } = useTranslation();
  const { data: posts } = useGetPostsQuery(params);
  const isProfileOwner = false;
  let profileData;
  let followers;
  let following;

  if (profileInfo) {
    profileData = {
      aboutMe: profileInfo?.aboutMe,
      avatars: profileInfo?.avatars,
      userName: profileInfo?.userName

    };
    followers = profileInfo?.userMetadata.followers;
    following = profileInfo?.userMetadata.following;
  }

  return (
    <div className="flex flex-col gap-[13px] flex-1 pt-[24px] px-[15px] md:pr-16 md:pl-6 md:pt-[35px] w-full">
      <UserInfo
        // followers={followers}
        followersForPublic={followers}
        // following={following}
        followingForPublic={following}
        isProfileOwner={isProfileOwner}
        posts={posts}
        profile={profileData}
      />
      <div className={"block md:hidden"}>
        <span className={"block md:hidden"}>{profileInfo?.aboutMe}</span>
      </div>
    </div>
  );
};

Profile.getLayout = getPublicLayoutWithSidebar;
export default Profile;
