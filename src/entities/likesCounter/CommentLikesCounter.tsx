import { LikesImagesWithUserList } from '@/entities/likesCounter/LikesImagesWithUserList'
import { useUpdateCommentLikeStatusMutation } from '@/entities/likesCounter/queries/likes-api'

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
      <LikesImagesWithUserList isLiked={isLiked!} onLike={onLike} />
    </div>
  )
}
