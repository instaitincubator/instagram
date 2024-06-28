import {getLayout} from '@/app/layouts/mainLayout/Layout';
import CountRegisteredUsers from '@/entities/CountRegisteredUsers/CountRegisteredUsers';
import PublicPosts from '@/entities/PublicPosts/PublicPosts';
import {useGetAllPublicPostsQuery} from '@/features/public/allPublicPost';
import {useGetTotalUsersCountQuery} from '@/features/public/publicProfileCounts';

const Public = () => {
    const { data } = useGetTotalUsersCountQuery()
    const { data: posts } = useGetAllPublicPostsQuery({})

    return <div>
        <CountRegisteredUsers count={data?.totalCount} />
        <PublicPosts posts={posts?.items} />
    </div>
}

Public.getLayout = getLayout
export default Public