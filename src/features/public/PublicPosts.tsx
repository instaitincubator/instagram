import React from "react";

import { PostCard } from "@/entities/Post/PostCard";
import { PostsPublicItems } from "@/shared/types/ApiTypes/ProfileApiTypes";
import { useRouter } from "next/router";

interface Props {
  posts: PostsPublicItems[];
}

const PublicPosts = ({ posts }: Props) => {

  const router = useRouter();
  const openModal = (post: PostsPublicItems) => {
    void router.push(`/public-profile/profile/${post.ownerId}/?postId=${post.id}`);
  };

  return (
    <div
      className="md:grid md:grid-cols-posts py-[36px] flex justify-center items-center flex-col md:justify-between mx-auto flex-wrap flex-grow gap-[12px]"
    >
      {posts?.map(post => (
        <PostCard key={post.id} openModal={() => openModal(post)} post={post} />
      ))}
    </div>

  );
};

export default PublicPosts;
