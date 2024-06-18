import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { ForgotPasswordForm } from '@/features/password-recovery-form/ForgotPasswordForm'
import { ForgotPasswordFormType } from '@/features/password-recovery-form/useForgotPasswordForm'
import { useForgotPasswordMutation } from '@/services/forgotPasswordApi'

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation()

  const passwordRecovery = (arg: ForgotPasswordFormType) => {
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
