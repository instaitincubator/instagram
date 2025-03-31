import {
  useGetPostLikeStatusQuery,
  useUpdatePostLikeStatusMutation,
} from '@/entities/likesCounter/queries/likes-api'
import Image from 'next/image'

import { Heart, OutlinedHeart } from '../../../public'

interface Props {
  postId: number
}

export const PostLikesCounter = ({ postId }: Props) => {
  const { data: postLikeStatus } = useGetPostLikeStatusQuery(postId)
  const [updatePostLikeStatus] = useUpdatePostLikeStatusMutation()

  const onLike = () => {
    if (postId) {
      updatePostLikeStatus({
        likeStatus: postLikeStatus?.isLiked ? 'NONE' : 'LIKE',
        postId,
      })
    }
  }

  return (
    <div className="flex gap-2  items-center">
      <div className="flex relative">
        {postLikeStatus?.items.map((userLiked, index) => {
          return (
            <Image
              alt="likersAvatar"
              className={`rounded-full z-[${10 + 10 * -index}] first:ml-0 ml-[-5px] flex`}
              height={20}
              key={index}
              src={userLiked.avatars[1].url}
              width={20}
            />
          )
        })}
      </div>
      {postLikeStatus?.items.length}
      <div className="cursor-pointer relative" onClick={onLike}>
        {!postLikeStatus?.isLiked && <OutlinedHeart />}
        {postLikeStatus?.isLiked && <Heart />}
      </div>
    </div>
  )
}
