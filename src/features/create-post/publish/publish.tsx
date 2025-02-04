import React from 'react'

import { useAppSelector } from '@/app/store'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { useMeQuery } from '@/services/auth/signInApi'
import { useGetProfileInfoQuery } from '@/services/profile/profileApi'
import ExitButton from '@/shared/ui/exit-button/exit-button'
import { AvatarIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

const Publish = () => {
  const { data: me } = useGetProfileInfoQuery()
  const { images } = useAppSelector(state => state.imageSlice)

  console.log(me)

  return (
    <div className={'mx-[15px] mt-[17px]'}>
      <div className="flex justify-between items-center custom-wrapper">
        <div className={'m-[6px]'}>
          <ExitButton />
        </div>
        <h2 className={'text-h2'}> New Publication</h2>
        <h3 className={'text-h3 text-accent-500 m-[6px]'}>Publish</h3>
      </div>
      <div className="flex gap-[6px] mt-[19px] mb-[12px]">
        {images.map(el => (
          <img
            alt={`img-${el.uploadId}`}
            className={'h-[96px] w-[96]'}
            key={el.uploadId}
            src={el.url}
          />
        ))}
      </div>
      <UserAvatar avatar={me?.avatars[1].url} userId={me?.id} userName={me?.userName || ''} />
    </div>
  )
}

export default Publish
