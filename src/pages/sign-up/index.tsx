import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { SignUpForm } from '@/features/sign-up-form/SignUpForm'

const SignUp = () => {
  return (
    <>
      <SignUpForm />
    </>
  )
}

SignUp.getLayout = getLayout
export default SignUp
