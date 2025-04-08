import React, { useState } from 'react'

import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { SendComment } from '@/features/home/ui/PostComments/SendComment'
import { SingleComment } from '@/features/home/ui/PostComments/SingleComment/SingleComment'
import { useGetAllPostCommentsQuery } from '@/services/comments/comments-api'
import { useTranslation } from '@/shared/hooks/useTranslation'

interface PropsComments {
  avatar: string
  description: string
  postId: number
  username: string
}

const PostMobileComments = ({ avatar, description, postId, username }: PropsComments) => {
  const { data: comments } = useGetAllPostCommentsQuery({
    postId,
    sortDirection: 'asc',
  })
  const { t } = useTranslation()
  const [allCommentsViewed, setAllCommentsViewed] = useState<boolean>(false)

  return (
    <div className={'w-full'}>
      <div className=""></div>
      <div className="flex gap-4 mb-2 pl-2  items-center border-b">
        <UserAvatar avatar={avatar} avatarSize={24} userName={username} />
        {/*<span className="text-bold-16">{username}</span>*/}
        <span>{description}</span>
      </div>
      <div>
        <SingleComment comments={comments?.items!} isAllCommentViewed postId={postId} />
      </div>
      <div className="fixed  bg-dark-700  bottom-[60px] md:w-full">
        <SendComment postId={postId} />
      </div>
      {/*<Modal className={'z-100 bg-white'}>feffefef</Modal>*/}
    </div>
  )
}

export default PostMobileComments
