import { useUpdateCommentLikeStatusMutation } from '@/entities/likesCounter/queries/likes-api'

import { Heart, OutlinedHeart } from '../../../public'

interface Props {
  commentId: number
  isLiked: boolean
  postId: number
}

export const CommentLikesCounter = ({ commentId, isLiked, postId }: Props) => {
  const [updateCommentLikeStatus] = useUpdateCommentLikeStatusMutation()

  const onLike = () => {
    if (postId) {
      updateCommentLikeStatus({
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
