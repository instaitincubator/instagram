import {getLayout} from '@/app/layouts/mainLayout/Layout';
import CountRegisteredUsers from '@/entities/CountRegisteredUsers/CountRegisteredUsers';
import PublicPosts from '@/entities/PublicPosts/PublicPosts';
import {useGetAllPublicPostsQuery} from '@/features/public/allPublicPost';
import {useGetTotalUsersCountQuery} from '@/features/public/publicProfileCounts';
import React from 'react';

const Public = () => {
    const { data, isLoading } = useGetTotalUsersCountQuery()
    const { data: posts, isLoading:isLoadingPost } = useGetAllPublicPostsQuery({})

    if (isLoading||isLoadingPost) {
        return <div>Loading...</div>
    }

    return <div>
        <CountRegisteredUsers count={data?.totalCount} />
        <PublicPosts posts={posts?.items} />
    </div>
}

Public.getLayout = getLayout
export default Public