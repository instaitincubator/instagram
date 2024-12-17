import Image from 'next/image'

import { OutlinedHeart } from '../../../public'

interface Props {
  avatarWhoLikes: string[]
  likesCount: number
}

export const LikesCounter = ({ avatarWhoLikes, likesCount }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-[-5px]">
        {avatarWhoLikes.slice(0, 3).map((ph, i) => (
          <Image
            alt="likersAvatar"
            className="rounded-full ml-[5px]"
            height={20}
            key={i}
            src={ph}
            width={20}
          />
        ))}
      </div>
      {likesCount}
      <OutlinedHeart />
    </div>
  )
}
