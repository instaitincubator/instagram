import { getLayout } from '@/app/layouts/mainLayout/Layout'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import Image from 'next/image'

const EmailSent = () => {
  return (
    <div>
      <Card className="w-[378px] h-[228px] mx-auto my-auto p-[24px]">
        <div className="flex justify-between mb-[11px]">
          <h1 className="text-light-100 text-h1">Email sent</h1>
          <Image alt="close-icon" height={24} src="/close.svg" width={24}></Image>
        </div>
        <hr className="text-light-100 mb-[30px]" />
        <div>
          <p className="text-light-100 text-regular-16 mb-[18px]">
            We have sent a link to confirm your email to epam@epam.com
          </p>
          <div className="flex justify-end">
            <Button className="btn-primary">OK</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

EmailSent.getLayout = getLayout
export default EmailSent
