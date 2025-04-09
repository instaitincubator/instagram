import React, { useState } from 'react'

import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { SendComment } from '@/features/home/ui/PostComments/SendComment'
import { SingleComment } from '@/features/home/ui/PostComments/SingleComment/SingleComment'
import { useGetAllPostCommentsQuery } from '@/services/comments/comments-api'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Image from 'next/image'

interface PropsComments {
  avatar: string
  description: string
  onClose: () => void
  postId: number
  username: string
}

const PostMobileComments = ({ avatar, description, onClose, postId, username }: PropsComments) => {
  const { data: comments } = useGetAllPostCommentsQuery({
    postId,
    sortDirection: 'asc',
  })
  const { t } = useTranslation()
  const [allCommentsViewed, setAllCommentsViewed] = useState<boolean>(false)

  return (
    <div className={'w-full'}>
      <div className="flex mb-[26px]">
        <Image
          alt={'Comments'}
          className={'cursor-pointer'}
          height={24}
          onClick={onClose}
          src={'/arrow-back-outline.svg'}
          width={24}
        />
        <span className={'m-auto text-h2'}>Comments</span>
      </div>
      <div className="flex gap-4 mb-2 pl-2  items-center ">
        <UserAvatar avatar={avatar} avatarSize={24} userName={username} />
        {/*<span className="text-bold-16">{username}</span>*/}
        <span>{description}</span>
      </div>
      <div className="border w-full" />
      <div>
        <SingleComment comments={comments?.items!} isAllCommentViewed postId={postId} />
      </div>
      <div className="fixed  bg-dark-700  bottom-[60px]">
        <SendComment postId={postId} />
      </div>
      {/*<Modal className={'z-100 bg-white'}>feffefef</Modal>*/}
    </div>
  )
}

export default PostMobileComments
