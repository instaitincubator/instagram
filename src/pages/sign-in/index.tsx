import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { SignInForm } from '@/features/sign-in/SignInForm'
import { useSignInMutation } from '@/services/signInApi'

const SignIn = () => {
  const [signIn] = useSignInMutation()

  return (
    <>
      <SignInForm signIn={signIn} />
    </>
  )
}

SignIn.getLayout = getLayout
export default SignIn
