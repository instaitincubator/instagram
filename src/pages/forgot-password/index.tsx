import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { ForgotPasswordForm } from '@/features/password-recovery-form/ForgotPasswordForm'
import { ForgotPasswordFormType } from '@/features/password-recovery-form/useForgotPasswordForm'
import { useForgotPasswordMutation } from '@/services/auth/forgotPasswordApi'

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation()

  const passwordRecovery = (arg: ForgotPasswordFormType) => {
    forgotPassword({ ...arg, baseUrl: 'http://localhost:3000' })
  }

  return (
    <>
      <ForgotPasswordForm forgotPassword={passwordRecovery} />
    </>
  )
}

ForgotPassword.getLayout = getLayout
export default ForgotPassword
