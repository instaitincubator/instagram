import { getLayout } from '@/app/layouts/mainLayout/Layout'
import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'

const EmailConfirmed = () => {
  return (
    <div>
      <div className="pt-[35px]">
        <h1 className="text-center text-h1 text-light-100 mb-[19px]">Congratulations!</h1>
        <p className="text-regular-16 text-center text-light-100 mb-[54px]">
          Your email has been confirmed
        </p>

        <Button className="mx-auto my-auto mb-[72px]">Sign In</Button>

        <Image
          alt="icon"
          className="mx-auto my-auto"
          height={300}
          src="/emailConfirmedImage.png"
          width={432}
        ></Image>
      </div>
    </div>
  )
}

EmailConfirmed.getLayout = getLayout
export default EmailConfirmed
