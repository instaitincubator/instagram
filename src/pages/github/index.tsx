import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { GithubAuthCallback } from '@/shared/ui/gitHubAuthCallBack'

const Github = () => {
  return <GithubAuthCallback />
}

Github.getLayout = getLayout
export default Github
