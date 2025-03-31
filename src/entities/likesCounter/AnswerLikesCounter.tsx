import { useUpdateAnswerLikeStatusMutation } from '@/entities/likesCounter/queries/likes-api'

import { Heart, OutlinedHeart } from '../../../public'

interface Props {
  answerId: number
  commentId: number
  isLiked: boolean
  postId: number
}

export const AnswerLikesCounter = ({ answerId, commentId, isLiked, postId }: Props) => {
  const [updateAnswerLikeStatus] = useUpdateAnswerLikeStatusMutation()

  const onLike = () => {
    if (postId) {
      updateAnswerLikeStatus({
        answerId,
        commentId,
        likeStatus: isLiked ? 'NONE' : 'LIKE',
        postId,
      })
    }
  }

  return (
    <div className="flex gap-2  items-center">
      <div className="cursor-pointer relative" onClick={onLike}>
        {!isLiked && <OutlinedHeart />}
        {isLiked && <Heart />}
      </div>
    </div>
  )
}
