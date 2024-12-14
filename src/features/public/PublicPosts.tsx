import React from "react";

import { PostCard } from "@/entities/Post/PostCard";
import { Post } from "@/shared/types/public.types";
import { useRouter } from "next/router";

interface Props {
  posts: Post[];
}

const PublicPosts = ({ posts }: Props) => {

  const router = useRouter();
  const openModal = (post: Post) => {
    void router.push(`/public/profile/${post.ownerId}/?postId=${post.id}`);
  };

  return (
    <div
      className="grid grid-cols-posts py-[36px] justify-between mx-auto flex-wrap flex-grow gap-[12px]"
    >
      {posts?.map(post => (
        <PostCard key={post.id} openModal={() => openModal(post)} post={post} />
      ))}
    </div>

  );
};

export default PublicPosts;
