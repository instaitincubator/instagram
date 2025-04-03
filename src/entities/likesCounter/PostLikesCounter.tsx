import { useState } from 'react'

import { LikesImagesWithUserList } from '@/entities/likesCounter/LikesImagesWithUserList'
import { LikesModal } from '@/entities/likesCounter/LikesModal'
import {
  useGetPostLikeStatusQuery,
  useUpdatePostLikeStatusMutation,
} from '@/entities/likesCounter/queries/likes-api'
import Image from 'next/image'

interface Props {
  postId: number
}

export const PostLikesCounter = ({ postId }: Props) => {
  const { data: postLikeStatus } = useGetPostLikeStatusQuery(postId)
  const [updatePostLikeStatus] = useUpdatePostLikeStatusMutation()
  const [isHovered, setIsHovered] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const onLike = () => {
    if (postId) {
      updatePostLikeStatus({
        likeStatus: postLikeStatus?.isLiked ? 'NONE' : 'LIKE',
        postId,
      })
    }
  }

  const likesMouseOutHandler = () => {
    setIsHovered(false)
  }

  const likesMouseOverHandler = () => {
    setIsHovered(true)
  }

  const openLikesModal = () => {
    setIsModalVisible(true)
  }

  const closeLikesModal = () => {
    setIsModalVisible(false)
  }

  return (
    <div
      className="flex gap-2 relative items-center"
      onMouseOut={likesMouseOutHandler}
      onMouseOver={likesMouseOverHandler}
    >
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
      {isHovered && (
        <div className="absolute bottom-[100%] flex gap-2 px-4 py-3 items-end border-amber-100 bg-dark-100 w-max rounded">
          <div className="flex gap-2 relative">
            {postLikeStatus?.items.slice(-3).map((userLiked, index) => {
              return (
                <Image
                  alt="likersAvatar"
                  className={`rounded-full z-[${10 + 10 * -index}] flex first:ml-0 ml-[-25px]`}
                  height={50}
                  key={index}
                  src={userLiked.avatars.length > 1 ? userLiked.avatars[1].url : '/avatar.png'}
                  width={50}
                />
              )
            })}
          </div>
          <div
            className="flex gap-1 items-end hover:text-accent-500 transition cursor-pointer"
            onClick={openLikesModal}
          >
            {postLikeStatus?.items.length}
            <span>likes</span>
          </div>
        </div>
      )}
      {isModalVisible && postLikeStatus?.items.length && (
        <LikesModal
          deletePostCallback={() => {}}
          editPost={() => {}}
          onClose={closeLikesModal}
          users={postLikeStatus.items}
        />
      )}
    </div>
  )
}
