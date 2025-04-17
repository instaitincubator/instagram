import React from 'react'

import { Input } from '@/shared/ui/Input/Input'
import { Image } from '@/shared/ui/icons/image'
import { MicOutline } from '@/shared/ui/icons/micOutline'

export const MessageBlock = () => {
  return (
    <div className="flex flex-col  rounded-lg w-full h-full">
      <header className="flex items-center bg-dark-500 text-white p-6 text-lg font-semibold h-[72px]">
        <img src={'/avatar.png'} alt={'avatar'} className={'rounded-full w-[48px] h-[48px]'} />
        <p className={'pl-4'}> Ekaterina Ivanova</p>
      </header>
      <div className="flex-1 p-4 overflow-y-auto">{/* Здесь будут сообщения */}</div>
      <div className="p-4 flex items-center">
        <Input
          className={'flex-1 border-none border-t-2 focus:outline-none'}
          fullWidth
          onChange={() => {}}
          placeholder={'Type Message'}
          type={''}
          value={''}
        />
        <div className="flex items-center">
          <MicOutline className="mr-2" />
          <Image />
        </div>
      </div>
    </div>
  )
}
