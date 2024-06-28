import React from 'react'

import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { LegalContent } from '@/features/legalContent/legalContent'

import { useTranslation } from '../../../hooks/useTranslation'

const Privacy = () => {
  const { t } = useTranslation()

  return (
    <LegalContent
      content={t.pages.terms.welcome}
      labelButton={t.auth.backToSignUp}
      title={t.auth.privacyPolicy1}
    />
  )
}

Privacy.getLayout = getLayout
export default Privacy
