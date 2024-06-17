import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { SignInForm } from '@/features/SignIn'

const SignIn = () => {
  return (
    <>
      <SignInForm />
    </>
  )
}

SignIn.getLayout = getLayout
export default SignIn
