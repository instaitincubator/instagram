import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { useMeQuery } from '@/services/auth/signInApi'
import { setToken } from '@/shared/utils/storage'
import { useRouter } from 'next/router'

const Github = () => {
  const router = useRouter()
  const { accessToken } = router.query
  const { data: me } = useMeQuery()

  if (accessToken && me?.userId) {
    setToken(accessToken as string)
    void router.push(`/public-profile/profile/${me.userId}`)
  }

  return <></>
}

Github.getLayout = getLayout
export default Github
