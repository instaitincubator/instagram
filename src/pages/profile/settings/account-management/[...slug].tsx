import React from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { useRouter } from 'next/router'

import AccountManagement from './index'

const AccountManagementPage = () => {
  const router = useRouter()
  const { slug } = router.query

  return <AccountManagement slug={slug!} />
}

AccountManagementPage.getLayout = getSettingsLayout
export default AccountManagementPage
