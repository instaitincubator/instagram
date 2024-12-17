import React, { useLayoutEffect } from 'react'

import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import { useMeQuery } from '@/services/auth/signInApi'
import { useRouter } from 'next/router'

const Profile = () => {
  const { data: me } = useMeQuery()
  const router = useRouter()

  useLayoutEffect(() => {
    if (me) {
      const userId = me?.userId

      void router.push(`/profile/${userId}`)
    }
  }, [me, router])

  return (
    <div className="flex flex-col gap-[13px] flex-1 pt-[24px] px-[15px] md:pr-16 md:pl-6 md:pt-[35px] w-full"></div>
  )
}

Profile.getLayout = getLayoutWithSidebar
export default Profile
