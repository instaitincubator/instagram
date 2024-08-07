import React, { useEffect, useState } from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { NewPasswordForm } from '@/features/new-password-form/NewPasswordForm'
import { useCheckRecoveryCodeMutation } from '@/services/auth/forgotPasswordApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { LinkExpired } from '@/widgets/LinkExpired'
import { useRouter } from 'next/router'

export const Recovery = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { code } = router.query
  const [checkCode, { isSuccess }] = useCheckRecoveryCodeMutation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (code) {
      checkCode({ recoveryCode: code })
      setLoading(false)
    }
  }, [checkCode, code])

  if (loading) {
    return <div>isLoading...</div>
  }

  return (
    <>
      {isSuccess ? (
        <NewPasswordForm code={code ? code : null} />
      ) : (
        <LinkExpired href={'/forgot-password'} title={t.auth.verification} />
      )}
    </>
  )
}

Recovery.getLayout = getLayout
export default Recovery
