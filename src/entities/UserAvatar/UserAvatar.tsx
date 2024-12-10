import React from 'react'

import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'

import { Block } from '../../../public'

type Props = {
  avatar?: string | undefined
  isShowedText?: boolean
  toggleShowedText?: () => void
  userId?: number

  userName: string
}

const UserAvatar = ({ avatar, isShowedText, toggleShowedText, userId, userName }: Props) => {
  return (
    <div className="flex gap-[12px] items-center justify-between py-3">
      <a className="flex gap-[12px] items-center " href={`public/profile/${userId}`}>
        <Image
          alt="avatar"
          className="rounded-full"
          height={36}
          src={avatar ? avatar : '/avatar.png'}
          width={36}
        />
        <p>{userName}</p>
      </a>
      {isShowedText && (
        <Button className="cursor-pointer" onClick={toggleShowedText}>
          <Block />
        </Button>
      )}
    </div>
  )
}

export default UserAvatar
