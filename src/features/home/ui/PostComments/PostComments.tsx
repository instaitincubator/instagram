import React, { useState } from 'react'

import { SendComment } from '@/features/home/ui/PostComments/SendComment'
import { SingleComment } from '@/features/home/ui/PostComments/SingleComment/SingleComment'
import { useGetAllPostCommentsQuery } from '@/services/comments/comments-api'
import { useTranslation } from '@/shared/hooks/useTranslation'

interface Props {
  description: string
  postId: number
  username: string
}

export const PostComments = ({ description, postId, username }: Props) => {
  const { data: comments } = useGetAllPostCommentsQuery({
    postId,
    sortDirection: 'asc',
  })
  const { t } = useTranslation()
  const [allCommentsViewed, setAllCommentsViewed] = useState<boolean>(false)

  return (
    <div>
      <div className="flex gap-4 pb-2 pl-2">
        <span className="text-bold-16">{username}</span>
        <span>{description}</span>
      </div>
      <div className="flex flex-col gap-2">
        <SingleComment
          comments={comments?.items!}
          isAllCommentViewed={allCommentsViewed}
          postId={postId}
        />
        {comments?.items.length! > 3 && !allCommentsViewed && (
          <span
            className="opacity-50 pl-2 cursor-pointer"
            onClick={() => setAllCommentsViewed(true)}
          >
            {t.home.moreComments}({comments?.items.length! - 3})
          </span>
        )}
      </div>
      <SendComment postId={postId} />
    </div>
  )
}
