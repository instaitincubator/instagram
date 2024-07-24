import { getLayout } from '@/app/layouts/mainLayout/Layout'
import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useTranslation } from '../../../../hooks/useTranslation'

const EmailConfirmed = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div>
      <div className="pt-[35px]">
        <h1 className="text-center text-h1 text-light-100 mb-[19px]">{t.auth.congratulations}</h1>
        <p className="text-regular-16 text-center text-light-100 mb-[54px]">
          {t.auth.confirmMessage}
        </p>

        <Button className="mx-auto my-auto mb-[72px]" onClick={() => router.push('/sign-in')}>
          {t.auth.signIn}
        </Button>

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
