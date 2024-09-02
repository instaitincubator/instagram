import { useAppDispatch } from '@/app/store'
import { setToken } from '@/shared/utils/storage'
import { useRouter } from 'next/router'

export const GithubAuthCallback = () => {
  const router = useRouter()
  const { accessToken } = router.query

  if (accessToken) {
    setToken(accessToken as string)
    void router.push('/profile')
  }

  return <div>gitHub</div>
}
