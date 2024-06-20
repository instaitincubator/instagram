import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { useSignUpMutation } from '@/services/signUpApi'
import { SignUpForm } from '@/features/sign-up-form/SignUpForm'
import { SignUpFormType } from '@/features/sign-up-form/useSignUpForm'

const SignUp = () => {
  const [SignUp] = useSignUpMutation()

  const signUpRecovery = (arg: SignUpFormType) => {
    SignUp({ ...arg, baseUrl: 'breezeapp.club' })
  }

  return (
    <>
      <SignUpForm SignUp={signUpRecovery} />
    </>
  )
}

SignUp.getLayout = getLayout
export default SignUp
