import { getLayout } from '@/app/layouts/mainLayout/Layout'
import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'

const EmailVerification = () => {
  return (
    <div>
      <div className="mx-auto my-auto">
        <h1 className="text-center text-h1 text-light-100 mb-[19px]">
          Email verification link expired
        </h1>
        <p className="text-center text-light-100 mb-[30px] w-[294px]  mx-auto">
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <Button className="mx-auto my-auto">Resend verification link</Button>
        <Image
          alt="verification-img"
          className="mx-auto my-auto"
          height={352}
          src="/emailVerificationImage.png"
          width={473}
        ></Image>
      </div>
    </div>
  )
}

EmailVerification.getLayout = getLayout
export default EmailVerification
