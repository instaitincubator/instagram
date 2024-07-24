import React, { useEffect } from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { useConfirmCodeMutation } from '@/services/auth/signUpApi'
import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useTranslation } from '../../../../hooks/useTranslation'

const EmailConfirmed = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [confirmCode, { isSuccess }] = useConfirmCodeMutation()

  useEffect(() => {
    if (isSuccess) {
      confirmCode(router.query.code)
    }
  }, [confirmCode, isSuccess, router.query.code])

  return (
    <div>
      {isSuccess && (
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
      )}

      {!isSuccess && (
        <div className="flex flex-col items-center  m-auto gap-5">
          <span className="text-h1 w-[300px] ">{t.auth.verification}</span>
          <span className="text-regular-16 w-[300px] ">{t.auth.verificationMessage}</span>
          <div className="w-[300px] order-4 sm:order-3">
            <Button as="a" fullWidth href="forgot-password">
              {t.auth.verificationButton}
            </Button>
          </div>
          <Image
            alt="verification-img"
            className="m-auto mt-[30px] order-3 sm:order-4"
            height={352}
            src="/expiredLinkImage.svg"
            width={473}
          />
        </div>
      )}
    </div>
  )
}

EmailConfirmed.getLayout = getLayout
export default EmailConfirmed
