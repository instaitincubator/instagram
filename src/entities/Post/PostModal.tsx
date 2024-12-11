import React from 'react'

import { Slider } from '@/entities/Slider/Slider'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { Post } from '@/shared/types/public.types'
import { Modal } from '@/shared/ui/Modal/Modal'

export type PostModalProps = {
  onClose: () => void
  post: Post
}

const PostModal = ({ onClose, post }: PostModalProps) => {
  return (
    <Modal onClose={onClose} withOutHeader>
      <div className="flex">
        <div>
          <Slider arrImages={post.images} height={560} width={490} />
        </div>
        <div className="px-[24px] py-[8px]">
          <UserAvatar avatar={post.avatarOwner} userId={post.ownerId} userName={post.userName} />
          <TimePublish createdAt={post.createdAt} />
          Comments
        </div>
      </div>
    </Modal>
  )
}

export default PostModal
