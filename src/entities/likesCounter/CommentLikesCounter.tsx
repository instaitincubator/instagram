import { useState } from 'react'
import { useHover } from 'react-use'

import { LikesImagesWithUserList } from '@/entities/likesCounter/LikesImagesWithUserList'
import { LikesModal } from '@/entities/likesCounter/LikesModal'
import { SmallLikesModal } from '@/entities/likesCounter/SmallLikesModal'
import {
  useGetCommentLikesQuery,
  useGetPostLikeStatusQuery,
  useUpdateCommentLikeStatusMutation,
} from '@/entities/likesCounter/queries/likes-api'
import Image from 'next/image'

interface Props {
  commentId: number
  isLiked: boolean
  postId: number
}

export const CommentLikesCounter = ({ commentId, isLiked, postId }: Props) => {
  const [updateCommentLikeStatus] = useUpdateCommentLikeStatusMutation()
  const { data: postLikeStatus } = useGetCommentLikesQuery({ commentId, postId })
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const onLike = () => {
    if (postId) {
      updateCommentLikeStatus({
        commentId,
        likeStatus: isLiked ? 'NONE' : 'LIKE',
        postId,
      })
    }
  }

  const openLikesModal = () => {
    setIsModalVisible(true)
  }

  const closeLikesModal = () => {
    setIsModalVisible(false)
  }

  const element = (hovered: boolean) => {
    return (
      <div className="flex gap-2 relative items-center">
        <LikesImagesWithUserList isLiked={isLiked!} onLike={onLike} />
        <SmallLikesModal
          isHovered={hovered}
          likes={postLikeStatus?.items}
          openLikesModal={openLikesModal}
        />
        {isModalVisible && postLikeStatus?.items.length && (
          <LikesModal onClose={closeLikesModal} postId={postId} />
        )}
      </div>
    )
  }
  const [hoverable, hovered] = useHover(element)

  return <>{hoverable}</>
}
