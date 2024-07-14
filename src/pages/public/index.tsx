import React from "react";

import { getLayout } from "@/app/layouts/mainLayout/Layout";
import CountRegisteredUsers from "@/entities/CountRegisteredUsers/CountRegisteredUsers";
import PublicPosts from "@/features/public/PublicPosts";
import { useGetAllPublicPostsQuery } from "@/features/public/api/allPublicPost";
import { useGetTotalUsersCountQuery } from "@/features/public/api/publicProfileCounts";
import { PrivateRoute } from "@/shared/HOC/redirect";


const Public = () => {
  const { data, error, isLoading } = useGetTotalUsersCountQuery();
  const { data: posts, error: errorPost, isLoading: isLoadingPost } = useGetAllPublicPostsQuery({});

  if (isLoading || isLoadingPost) {
    return <div>Loading...</div>;
  }
  if (error || errorPost) {
    return <div>Error...</div>;
  }

  return <PrivateRoute>
    <div className="py-6 w-full max-w-[972px] mx-auto">
      <CountRegisteredUsers count={data?.totalCount} />
      <PublicPosts posts={posts?.items} />
    </div>
  </PrivateRoute>;

};

Public.getLayout = getLayout;
export default Public;