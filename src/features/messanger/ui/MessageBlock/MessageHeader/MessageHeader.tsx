import React from 'react'

import { ArrowBack } from '@/shared/ui/icons/arrowBack'
import Image from 'next/image'

interface Props {
  isMobile?: boolean
  userAvatar: string
  userName: string
}

export const MessageHeader = ({ isMobile, userAvatar, userName }: Props) => (
  <header className="flex items-center bg-dark-500 text-white p-6 text-lg font-semibold h-[72px]">
    {isMobile && (
      <div className={isMobile ? '' : 'hidden'}>
        <ArrowBack />
      </div>
    )}
    <p className={'pl-4 ml-[25px] md:hidden text-regular-16'}>{userName}</p>
    {userName ? (
      <Image
        alt={'avatar'}
        className={
          isMobile ? 'rounded-full w-[36px] h-[36px] ml-auto' : 'rounded-full w-[48px] h-[48px]'
        }
        height={48}
        src={userAvatar ? userAvatar : '/avatar.png'}
        width={48}
      />
    ) : (
      ''
    )}
    <p className={'pl-4 ml-[25px] hidden md:block text-regular-16'}>{userName}</p>
  </header>
)
