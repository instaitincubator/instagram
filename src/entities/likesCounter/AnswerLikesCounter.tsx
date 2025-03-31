import { LikesImagesWithUserList } from '@/entities/likesCounter/LikesImagesWithUserList'
import { useUpdateAnswerLikeStatusMutation } from '@/entities/likesCounter/queries/likes-api'

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
      <LikesImagesWithUserList isLiked={isLiked!} onLike={onLike} />
    </div>
  )
}
