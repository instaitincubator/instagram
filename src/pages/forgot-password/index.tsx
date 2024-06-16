import { getLayout } from '@/app/layouts/mainLayout/Layout'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Input } from '@/shared/ui/Input/Input'

const ForgotPassword = () => {
  return (
    <Card className="flex flex-col items-center max-w-[378px] p-[24px] gap-2">
      <span className="pb-[20px] text-h1">Forgot Password</span>
      <Input fullWidth label="Email" placeholder="Example@example.com" />
      <span className="text-regular-14 text-light-900">
        Enter your email address and we will send you further instructions{' '}
      </span>
      <Button fullWidth>Send Link</Button>
      <Button fullWidth variant="text">
        Back to Sign In
      </Button>
    </Card>
  )
}

ForgotPassword.getLayout = getLayout
export default ForgotPassword
