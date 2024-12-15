import { getPublicLayoutWithSidebar } from "@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar";
import { UserInfo } from "@/features/UserInfo/UserInfo";
import {
  ProfileInfoPublic, ProfilePublicPosts
} from "@/shared/types/ApiTypes/ProfileApiTypes";
import { GetServerSideProps } from "next";

type ProfileProps = {
  posts: ProfilePublicPosts
  profileInfo: ProfileInfoPublic;
}
export const getServerSideProps: GetServerSideProps<ProfileProps> = (async (context) => {
  const { id } = context.query;
  const resProfile = await fetch(`https://inctagram.work/api/v1/public-user/profile/${id}`);
  const profileInfo: ProfileInfoPublic = await resProfile.json();
  const postsRes = await fetch(`https://inctagram.work/api/v1/public-posts/user/${id}`);
  const posts: ProfilePublicPosts = await postsRes.json();

  return {
    props: {
      posts,
      profileInfo: profileInfo
    }
  };
});
const Profile = ({ posts, profileInfo }: ProfileProps) => {

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
    <div className={'mt-o mx-auto'}>
      <div className="flex  items-baseline  flex-col gap-[13px] flex-1 pt-[24px] px-[15px]  md:pr-16 mb:pb-[59px] md:pl-6 md:pt-[35px] w-full">
        <UserInfo
          followersForPublic={followers}
          followingForPublic={following}
          isProfileOwner={isProfileOwner}
          postsForPublic={posts}
          profile={profileData}
        />
        <div className={"block md:hidden"}>
          <span className={"block md:hidden"}>{profileInfo?.aboutMe}</span>
        </div>
        <div className={''}>
          <div className=" grid grid-cols-3 md:grid-cols-4 gap-[3px] md:gap-[12px] pt-[29px]  mb:pt-[59px] justify-items-center ">
            {posts?.items?.map(el => (
              <div className={'flex justify-center'} key={el.id}>
                <img alt={el.description} className={'w-[157px] h-[108px] md:w-[234px] md:h-[224px] object-cover'} src={el.images[0].url} />{' '}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

Profile.getLayout = getPublicLayoutWithSidebar;
export default Profile;
