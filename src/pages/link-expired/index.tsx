import React from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'

import { useTranslation } from '../../../hooks/useTranslation'

const VerificationLinkExpired = () => {
  const { t } = useTranslation()

  return (
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
  )
}

VerificationLinkExpired.getLayout = getLayout
export default VerificationLinkExpired
