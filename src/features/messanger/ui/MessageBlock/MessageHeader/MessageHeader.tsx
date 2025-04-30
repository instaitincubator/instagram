import React from 'react'

import { ArrowBack } from '@/shared/ui/icons/arrowBack'

interface Props {
  isMobile?: boolean
}

export const MessageHeader = ({ isMobile }: Props) => (
  <header className="flex items-center bg-dark-500 text-white p-6 text-lg font-semibold h-[72px]">
    {isMobile && (
      <div className={isMobile ? '' : 'hidden'}>
        <ArrowBack />
      </div>
    )}
    <p className={'pl-4 ml-[25px] md:hidden text-regular-16'}>{'Ekaterina Ivanova'}</p>
    <img
      src={'/avatar.png'}
      alt={'avatar'}
      className={
        isMobile ? 'rounded-full w-[36px] h-[36px] ml-auto' : 'rounded-full w-[48px] h-[48px]'
      }
    />
    <p className={'pl-4 ml-[25px] hidden md:block text-regular-16'}>{'Ekaterina Ivanova'}</p>
  </header>
)
