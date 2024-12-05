import React from 'react'

import Image from 'next/image'

type Props = {
  avatar?: string | undefined
  userId?: number
  userName: string
}

const UserAvatar = ({ avatar, userId, userName }: Props) => {
  return (
    <a className="flex gap-[12px] items-center py-3" href={`public/profile/${userId}`}>
      <Image
        alt="avatar"
        className="rounded-full"
        height={36}
        src={avatar ? avatar : '/avatar.png'}
        width={36}
      />
      <p>{userName}</p>
    </a>
  )
}

export default UserAvatar
