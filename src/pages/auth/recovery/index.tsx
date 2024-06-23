import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { NewPasswordForm } from '@/features/new-password-form/NewPasswordForm'
import { useRouter } from 'next/router'

export const Recovery = () => {
  const router = useRouter()
  const { code } = router.query

  return <NewPasswordForm code={code ? code : null} />
}

Recovery.getLayout = getLayout
export default Recovery
