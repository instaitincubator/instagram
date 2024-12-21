import React from 'react'

import { Comment } from '@/entities/Post/Comment'
import { LikesCounter } from '@/entities/PostImage/LikesCounter'
import { PostImage } from '@/entities/PostImage/PostImage'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { PostsPublicItems } from '@/shared/types/ApiTypes/ProfileApiTypes'
import { CommentForPost } from '@/shared/types/public.types'
import { Modal } from '@/shared/ui/Modal/Modal'

interface Props {
  comments: CommentForPost
  onClose: () => void
  post: PostsPublicItems
}

const PostModal = ({ comments, onClose, post }: Props) => {
  const title = (
    <UserAvatar
      avatar={post.avatarOwner}
      userId={post.ownerId}
      userName={post.owner ? post.owner : post.userName}
    />
  )

  return (
    <Modal
      contentClassName="p-0 items-start justify-between"
      headerClassName="h-[60px]"
      modalClassName="w-[50%] min-w-[950px]"
      onClose={onClose}
      title={title}
    >
      <div className="flex w-full">
        <div className="flex-1">
          <PostImage arrImages={post.images} height={560} width={490} />
        </div>
        <div className="flex flex-1 flex-col justify-between max-h-[474px]">
          <div className="flex flex-col gap-6 pl-6 py-6 overflow-y-auto">
            {comments?.items.map(comment => <Comment comment={comment} key={comment.id} />)}
          </div>
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
