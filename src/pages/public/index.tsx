import React from "react";

import { getLayout } from "@/app/layouts/mainLayout/Layout";
import CountRegisteredUsers from "@/entities/CountRegisteredUsers/CountRegisteredUsers";
import PublicPosts from "@/features/public/PublicPosts";
import { useGetAllPublicPostsQuery } from "@/services/public/allPublicPost";
import { useGetTotalUsersCountQuery } from "@/services/public/publicProfileCounts";


const Public = () => {
  const { data, error, isLoading } = useGetTotalUsersCountQuery();
  const { data: posts, error: errorPost, isLoading: isLoadingPost } = useGetAllPublicPostsQuery({});

  if (isLoading || isLoadingPost) {
    return <div>Loading...</div>;
  }
  if (error || errorPost) {
    return <div>Error...</div>;
  }

  return <div className="py-6 w-full max-w-[972px] mx-auto">
    <CountRegisteredUsers count={data?.totalCount} />
    <PublicPosts posts={posts?.items} />
  </div>;

};

Public.getLayout = getLayout;
export default Public;