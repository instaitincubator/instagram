import React from 'react'

import { Owner } from '@/shared/types/ApiTypes/ProfileApiTypes'
import { cn } from '@/shared/utils/cn'
import Image from 'next/image'
import Link from 'next/link'

import { Block } from '../../../public'

interface Props {
  avatar?: string | undefined
  avatarSize?: number
  className?: string
  isShowedText?: boolean
  toggleShowedText?: () => void
  userId?: number
  userName: Owner | string
}

const UserAvatar = ({
  avatar,
  avatarSize,
  className,
  isShowedText,
  toggleShowedText,
  userId,
  userName,
}: Props) => {
  return (
    <div className={cn('flex gap-[12px] items-center justify-between py-3', className)}>
      <Link className="flex gap-[12px] items-center" href={`/public-profile/profile/${userId}`}>
        <Image
          alt="avatar"
          className="rounded-full"
          height={avatarSize || 36}
          src={avatar ? avatar : '/avatar.png'}
          width={avatarSize || 36}
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
