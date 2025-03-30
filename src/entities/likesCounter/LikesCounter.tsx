import {
  useGetPostLikeStatusQuery,
  useUpdateAnswerLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
  useUpdatePostLikeStatusMutation,
} from '@/entities/likesCounter/queries/likes-api'
import Image from 'next/image'

import { Heart, OutlinedHeart } from '../../../public'

interface Props {
  answerId?: number
  commentId?: number
  postId?: number
  withAvatar?: boolean
}

export const LikesCounter = ({ answerId, commentId, postId, withAvatar }: Props) => {
  const { data: postLikeStatus } = useGetPostLikeStatusQuery(postId!)
  const [updatePostLikeStatus] = useUpdatePostLikeStatusMutation()
  const [updateCommentLikeStatus] = useUpdateCommentLikeStatusMutation()
  const [updateAnswerLikeStatus] = useUpdateAnswerLikeStatusMutation()

  const onLike = () => {
    if (postId && !commentId && !answerId) {
      updatePostLikeStatus({
        likeStatus: postLikeStatus?.isLiked ? 'NONE' : 'LIKE',
        postId,
      })
    }
    if (postId && commentId && !answerId) {
      updateCommentLikeStatus({
        commentId,
        likeStatus: postLikeStatus?.isLiked ? 'NONE' : 'LIKE',
        postId,
      })
    }
    if (postId && commentId && answerId) {
      updateAnswerLikeStatus({
        answerId,
        commentId,
        likeStatus: postLikeStatus?.isLiked ? 'NONE' : 'LIKE',
        postId,
      })
    }
  }

  return (
    <div className="flex gap-2  items-center">
      {withAvatar && (
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
      )}
      {withAvatar && postLikeStatus?.items.length}
      <div className="cursor-pointer relative" onClick={onLike}>
        {!postLikeStatus?.isLiked && <OutlinedHeart />}
        {postLikeStatus?.isLiked && <Heart />}
      </div>
    </div>
  )
}
