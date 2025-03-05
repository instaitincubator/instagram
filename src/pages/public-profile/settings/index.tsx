import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

const Settings = () => {
  const router = useRouter()

  useEffect(() => {
    void router.push('/public-profile/settings/general-information')
  }, [router])

  return <div></div>
}

export default Settings
