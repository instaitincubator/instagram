import React from 'react';

import {getLayout} from '@/app/layouts/mainLayout/Layout';
import CountRegisteredUsers from '@/entities/CountRegisteredUsers/CountRegisteredUsers';
import PublicPosts from '@/entities/PublicPosts/PublicPosts';
import {useGetAllPublicPostsQuery} from '@/features/public/allPublicPost';
import {useGetTotalUsersCountQuery} from '@/features/public/publicProfileCounts';

const Public = () => {
    const { data, isLoading, error } = useGetTotalUsersCountQuery()
    const { data: posts, isLoading:isLoadingPost, error:errorPost } = useGetAllPublicPostsQuery({})

    if (isLoading||isLoadingPost) {
        return <div>Loading...</div>
    }
    if(error||errorPost){
        return <div>Error...</div>
    }

    return <div>
        <CountRegisteredUsers count={data?.totalCount} />
        <PublicPosts posts={posts?.items} />
    </div>
}

Public.getLayout = getLayout
export default Public