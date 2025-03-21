import {
  useGetPostLikeStatusQuery,
  useUpdateLikeStatusMutation,
} from '@/entities/likesCounter/queries/likes-api'
import { useMeQuery } from '@/services/auth/signInApi'
import Image from 'next/image'

import { OutlinedHeart } from '../../../public'

interface Props {
  avatarWhoLikes: string[]
  likesCount: number
  postId?: number
}

export const LikesCounter = ({ avatarWhoLikes, likesCount, postId }: Props) => {
  const [updateLikeStatus] = useUpdateLikeStatusMutation()
  const { data: postLikeStatus } = useGetPostLikeStatusQuery(postId!)

  const onLike = () => {
    if (postId) {
      updateLikeStatus({
        likeStatus: postLikeStatus?.isLiked ? 'NONE' : 'LIKE',
        postId: postId,
      })
    }
  }

  return (
    <div className="flex gap-2  items-center">
      <div className="flex relative">
        {avatarWhoLikes.slice(0, 3).map((ph, i) => {
          return (
            <Image
              alt="likersAvatar"
              className={`rounded-full z-[${10 + 10 * -i}] first:ml-0 ml-[-5px] flex`}
              height={20}
              key={i}
              src={ph}
              width={20}
            />
          )
        })}
      </div>
      {likesCount}
      <div className="cursor-pointer" onClick={onLike}>
        <OutlinedHeart />
      </div>
    </div>
  )
}
