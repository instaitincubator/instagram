import React from 'react'

import { Owner } from '@/shared/types/ApiTypes/ProfileApiTypes'
import Image from 'next/image'
import Link from 'next/link'

import { Block } from '../../../public'

interface Props {
  avatar?: string | undefined
  isShowedText?: boolean
  toggleShowedText?: () => void
  userId?: number
  userName: Owner | string
}

const UserAvatar = ({ avatar, isShowedText, toggleShowedText, userId, userName }: Props) => {
  return (
    <div className="flex gap-[12px] items-center justify-between py-3">
      <Link className="flex gap-[12px] items-center" href={`/public-profile/profile/${userId}`}>
        <Image
          alt="avatar"
          className="rounded-full"
          height={36}
          src={avatar ? avatar : '/avatar.png'}
          width={36}
        />
        {typeof userName === 'string' ? (
          <p>{userName}</p>
        ) : (
          <p>{`${userName.firstName} ${userName.lastName}`}</p>
        )}
      </Link>
      {isShowedText && (
        <button className="cursor-pointer" onClick={toggleShowedText} type="button">
          <Block />
        </button>
      )}
    </div>
  )
}

export default UserAvatar
