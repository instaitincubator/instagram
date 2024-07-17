import { getLayoutWithSidebar } from '@/app/layouts/LayoutWithSidebar/LayoutWithSidebar'
import Button from '@/shared/ui/Button/Button'
import { useRouter } from 'next/router'

const Profile = () => {
  const router = useRouter()

  return (
    <div>
      <Button
        onClick={() => {
          router.push('/public')
        }}
      >
        Public
      </Button>
    </div>
  )
}

Profile.getLayout = getLayoutWithSidebar
export default Profile
