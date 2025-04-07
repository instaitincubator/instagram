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
      <div className="flex gap-4 pb-2 pl-2  items-center border-b">
        <UserAvatar avatar={avatar} avatarSize={24} userName={username} />
        {/*<span className="text-bold-16">{username}</span>*/}
        <span>{description}</span>
      </div>
      <SingleComment comments={comments?.items!} isAllCommentViewed postId={postId} />
      <SendComment postId={postId} />
      {/*<Modal className={'z-100 bg-white'}>feffefef</Modal>*/}
    </div>
  )
}

export default PostMobileComments
