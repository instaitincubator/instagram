import { useEffect, useState } from 'react'
import { useHover } from 'react-use'

import { LikesImagesWithUserList } from '@/entities/likesCounter/LikesImagesWithUserList'
import { LikesModal } from '@/entities/likesCounter/LikesModal'
import { SmallLikesModal } from '@/entities/likesCounter/SmallLikesModal'
import {
  useGetPostLikeStatusQuery,
  useUpdatePostLikeStatusMutation,
} from '@/entities/likesCounter/queries/likes-api'
import { useDeclension } from '@/shared/hooks/useDeclension'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Image from 'next/image'
// import pluralize from 'pluralize'

interface Props {
  postId: number
}

export const PostLikesCounter = ({ postId }: Props) => {
  const { data: postLikeStatus } = useGetPostLikeStatusQuery({ postId })
  const [updatePostLikeStatus] = useUpdatePostLikeStatusMutation()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const onLike = () => {
    if (postId) {
      updatePostLikeStatus({
        likeStatus: postLikeStatus?.isLiked ? 'NONE' : 'LIKE',
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
        <div className="flex relative py-1.5 cursor-pointer">
          {postLikeStatus?.items.slice(-3).map((userLiked, index) => {
            return (
              <Image
                alt="likersAvatar"
                className={`rounded-full z-[${10 + 10 * -index}] first:ml-0 ml-[-5px] flex`}
                height={20}
                key={index}
                src={userLiked.avatars.length > 1 ? userLiked.avatars[1].url : '/avatar.png'}
                width={20}
              />
            )
          })}
        </div>
        {postLikeStatus?.items.length}
        <LikesImagesWithUserList isLiked={postLikeStatus?.isLiked!} onLike={onLike} />
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
