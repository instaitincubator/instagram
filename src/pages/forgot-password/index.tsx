import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { ForgotPasswordForm } from '@/features/password-recovery-form/ForgotPasswordForm'
import { Form } from '@/features/password-recovery-form/useForgotPasswordForm'
import { useForgotPasswordMutation } from '@/pages/forgot-password/route'

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation()

  const passwordRecovery = (arg: Form) => {
    forgotPassword({ ...arg, baseUrl: 'breezeapp.club' })
  }

  return (
    <>
      <ForgotPasswordForm forgotPassword={passwordRecovery} />
    </>
  )
}

ForgotPassword.getLayout = getLayout
export default ForgotPassword
