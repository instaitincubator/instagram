import { getLayoutWithSidebar } from '@/app/layouts/LayoutWithSidebar/LayoutWithSidebar'
import { useMeQuery } from '@/services/auth/signInApi'
import { useGetPostsQuery } from '@/services/profile/postsApi'

const Profile = () => {
  const { data: me } = useMeQuery({})

  const arg = {
    pageNumber: 1,
    pageSize: 10,
    userName: me ? me.userName : 'gem4ik',
  }

  const { data } = useGetPostsQuery(arg)

  return (
    <div>
      <div>ava и статусы с кнопками</div>
      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  )
}

Profile.getLayout = getLayoutWithSidebar
export default Profile
