import { authActions } from '@/app/authSlice'
import { useAppDispatch } from '@/app/store'
import { useRouter } from 'next/router'

export const GithubAuthCallback = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { accessToken } = router.query

  if (accessToken) {
    localStorage.setItem('accessToken', accessToken as string)
    dispatch(authActions.setIsAuth(true))

    router.push('/profile')
  }

  return <div>gitHub</div>
}
