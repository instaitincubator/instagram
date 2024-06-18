import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { ForgotPasswordForm } from '@/features/password-recovery-form/ForgotPasswordForm'

const ForgotPassword = () => {
  return (
    <>
      <ForgotPasswordForm />
    </>
  )
}

ForgotPassword.getLayout = getLayout
export default ForgotPassword
