import React from 'react'

import { LikesCounter } from '@/entities/PostImage/LikesCounter'
import { PostImage } from '@/entities/PostImage/PostImage'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { PostsPublicItems } from '@/shared/types/ApiTypes/ProfileApiTypes'
import { Modal } from '@/shared/ui/Modal/Modal'

type Props = {
  onClose: () => void
  post: PostsPublicItems
}

const PostModal = ({ onClose, post }: Props) => {
  const title = (
    <UserAvatar avatar={post.avatarOwner} userId={post.ownerId} userName={post.userName} />
  )

  return (
    <Modal
      className="w-[50%] min-w-[950px]"
      contentClassName="p-0 items-start justify-between"
      headerClassName="h-[60px]"
      onClose={onClose}
      title={title}
    >
      <div className="flex w-full">
        <div className="flex-1">
          <PostImage arrImages={post.images} height={560} width={490} />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          Comments
          <div className="h-fit">
            <div className="w-full h-[1px] bg-dark-100" />
            <div className="p-2 flex flex-col gap-2">
              <LikesCounter avatarWhoLikes={post.avatarWhoLikes} likesCount={post.likesCount} />
              <TimePublish createdAt={post.createdAt} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PostModal
