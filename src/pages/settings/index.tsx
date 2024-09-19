import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

const Settings = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/settings/general-information')
  }, [])

  // flex pl-[24px] pr-[64px] w-full gap-10
  return <div></div>
}

export default Settings
