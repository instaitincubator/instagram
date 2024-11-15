import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { GithubAuthCallback } from '@/shared/ui/Github-auth/gitHubAuthCallBack'

const Github = () => {
  return <GithubAuthCallback />
}

Github.getLayout = getLayout
export default Github
