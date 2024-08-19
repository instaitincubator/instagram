import React, { useEffect, useState } from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { useConfirmCodeMutation } from '@/services/auth/signUpApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { LinkExpired } from '@/widgets/LinkExpired'
import Image from 'next/image'
import { useRouter } from 'next/router'

const EmailConfirmed = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [confirmCode, { isSuccess }] = useConfirmCodeMutation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (router.query.code) {
      confirmCode({ confirmationCode: router.query.code })
      setLoading(false)
    }
  }, [confirmCode, router.query.code])
  if (loading) {
    return <div>isLoading...</div>
  }

  return (
    <>
      {isSuccess && !loading ? (
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
      ) : (
        <LinkExpired href={'/sign-up'} title={t.auth.verification} />
      )}
    </>
  )
}

EmailConfirmed.getLayout = getLayout
export default EmailConfirmed
