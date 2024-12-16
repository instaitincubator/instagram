import React, { useState } from "react";

import { getPublicLayoutWithSidebar } from "@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar";
import PostModal from "@/entities/Post/PostModal";
import { UserInfo } from "@/features/UserInfo/UserInfo";
import { PostsPublicItems, ProfileInfoPublic, ProfilePublicPosts } from "@/shared/types/ApiTypes/ProfileApiTypes";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { noImage } from "../../../../public";

type Props = {
  posts: ProfilePublicPosts;
  profileInfo: ProfileInfoPublic;
  selectedPost: PostsPublicItems | null
}

export const getServerSideProps: GetServerSideProps<Props> = (async (context) => {
      const { id, postId } = context.query;
      const resProfile = await fetch(`https://inctagram.work/api/v1/public-user/profile/${id}`);
      const profileInfo: ProfileInfoPublic = await resProfile.json();
      const postsRes = await fetch(`https://inctagram.work/api/v1/public-posts/user/${id}`);
      const posts: ProfilePublicPosts = await postsRes.json();
      let selectedPost = null;

      if (postId) {
        const postRes = await fetch(`https://inctagram.work/api/v1/public-posts/${postId}`);

        selectedPost = await postRes.json();
      }

      return {
        props: {
          posts,
          profileInfo,
          selectedPost
        }
      };
    }
  )
;

const Profile = ({ posts, profileInfo, selectedPost }: Props) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);


  const closeModal = () => {
    setIsModalVisible(false)
    const updatedQuery = { ...router.query };

    delete updatedQuery.postId;
    void router.push('/')
    // void router.replace({
    //     pathname: router.pathname,
    //     query: updatedQuery
    //   },
    //   undefined,
    //   { shallow: true });
  };

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
    <div className={"mt-o mx-auto"}>
      <div
        className="flex  items-baseline  flex-col gap-[13px] flex-1 pt-[24px] px-[15px]  md:pr-16 mb:pb-[59px] md:pl-6 md:pt-[35px] w-full">
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
        <div
          className=" grid grid-cols-3 md:grid-cols-4 gap-[3px] md:gap-[12px] pt-[29px]  mb:pt-[59px] justify-items-center ">
          {posts?.items?.map(el => {

            const onPostOpen = () => {
              setIsModalVisible(true)
              void router.push(`/public/profile/${el.ownerId}?postId=${el.id}  `);
            };

            return (
              <div className={"flex justify-center"} key={el.id}>
                <Image alt={el.description} className="md:w-[234px] md:h-[224px] object-cover"
                       height={108}
                       onClick={onPostOpen}
                       src={el.images.length ? el.images[0].url : noImage}
                       width={157} />
              </div>
            );
          })}
        </div>
      </div>
      {isModalVisible && selectedPost && (
        <PostModal onClose={closeModal} post={selectedPost} />
      )}
    </div>
  );
};

Profile.getLayout = getPublicLayoutWithSidebar;
export default Profile;

