import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import { useRouter } from 'next/router'

export const Google = () => {
  const router = useRouter()

  return <div>google code: {router.query.code}</div>
}
Google.getLayout = getLayoutWithSidebar
export default Google
