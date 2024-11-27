import { useMeQuery } from '@/services/auth/signInApi'
import { setToken } from '@/shared/utils/storage'
import { useRouter } from 'next/router'

export const GithubAuthCallback = () => {
  const router = useRouter()
  const { accessToken } = router.query
  const { data: me } = useMeQuery()

  if (accessToken) {
    setToken(accessToken as string)
    void router.push(`/profile/${me?.userId}`)
  }

  return <div>gitHub</div>
}
