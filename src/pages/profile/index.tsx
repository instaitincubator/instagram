import { getLayoutWithSidebar } from '@/app/layouts/LayoutWithSidebar/LayoutWithSidebar'
import { useAppSelector } from '@/app/store'
import { useGetPostsQuery } from '@/services/profile/postsApi'

const Profile = () => {
  const arg = {
    pageNumber: 1,
    pageSize: 10,
    userName: 'gem4ik',
  }

  const { data } = useGetPostsQuery(arg)

  return (
    <div>
      <div>ava и статусы с кнопками</div>
      <div>фотки</div>
    </div>
  )
}

Profile.getLayout = getLayoutWithSidebar
export default Profile
