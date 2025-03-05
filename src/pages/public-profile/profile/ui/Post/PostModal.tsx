import React from 'react'

import { LikesCounter } from '@/entities/PostImage/LikesCounter'
import { PostImage } from '@/entities/PostImage/PostImage'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { Comment } from '@/pages/public-profile/profile/ui/Post/Comment'
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
      contentClassName="p-0 pt-8 lg:pt-0 items-start justify-between"
      headerClassName="h-[60px]"
      modalClassName="lg:w-[50%] lg:min-w-[950px] w-[90%] min-w-[320px] h-auto"
      onClose={onClose}
      title={title}
    >
      <div className="lg:flex w-full" key={post.id}>
        <div className="max-w-[490px] flex-shrink-0 m-auto">
          <PostImage arrImages={post.images} height={560} width={490} />
        </div>
        <div className="flex flex-1 flex-col justify-between max-h-[474px]">
          <div className="flex flex-col gap-6 pl-6 py-6 overflow-y-auto">
            {comments?.items.length > 0 ? (
              comments?.items.map(comment => <Comment comment={comment} key={comment.id} />)
            ) : (
              <span>no comments</span>
            )}
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
