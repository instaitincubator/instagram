import {getLayoutWithSidebar} from '@/app/layouts/LayoutWithSidebar/LayoutWithSidebar'
import {useMeQuery} from '@/services/auth/signInApi'
import {useGetPostsQuery} from '@/services/profile/postsApi'
import Button from '@/shared/ui/Button/Button';
import {useRouter} from 'next/router';

const Profile = () => {
  const { data: me } = useMeQuery({})
    const router = useRouter()

  const arg = {
    pageNumber: 1,
    pageSize: 10,
    userName: me ? me.userName : 'gem4ik',
  }

  const { data } = useGetPostsQuery(arg)

    const handleToProfileSettings = () => {
      router.push('/profile/settings')
    }

  return (
    <div>
      <div>ava и статусы с кнопками</div>
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button onClick={handleToProfileSettings} variant='secondary'>Profile settings</Button>
    </div>
  )
}

Profile.getLayout = getLayoutWithSidebar
export default Profile
