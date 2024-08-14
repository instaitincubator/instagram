import { getLayoutWithSidebar } from '@/app/layouts/LayoutWithSidebar/LayoutWithSidebar'
import { useMeQuery } from '@/services/auth/signInApi'
import { useGetPostsQuery } from '@/services/profile/postsApi'
import { Datepicker } from '@/shared/ui/Datepicker/Datepicker'

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
      <Datepicker />
    </div>
  )
}

Profile.getLayout = getLayoutWithSidebar
export default Profile
