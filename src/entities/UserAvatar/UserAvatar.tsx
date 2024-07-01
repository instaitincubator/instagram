import React from 'react'

import Image from 'next/image'

type Props = {
  avatar?: string | undefined
  userName: string
}

const UserAvatar = ({ avatar, userName }: Props) => {
  return (
    <div className="flex gap-[12px] items-center py-3">
      <Image
        alt="avatar"
        className="rounded-full"
        height={36}
        src={avatar ? avatar : '/avatar.png'}
        width={36}
      />
      <p>{userName}</p>
    </div>
  )
}

export default UserAvatar
