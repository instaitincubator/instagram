import React, { useState } from 'react'

import { LikesCounter } from '@/entities/likesCounter/LikesCounter'
import { SendComment } from '@/features/home/ui/PostComments/SendComment'
import { useGetAllPostCommentsQuery } from '@/services/comments/comments-api'

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

  const [allCommentsViewed, setAllCommentsViewed] = useState<boolean>(false)
  const showAllComments = allCommentsViewed ? comments?.items.length : 3

  return (
    <div>
      <div className="flex gap-4 pb-2 pl-2 ">
        <span className="text-bold-16">{username}</span>
        <span>{description}</span>
      </div>
      <div>
        {comments?.items.slice(0, showAllComments).map(comment => (
          <div className="flex w-full justify-between" key={comment.id}>
            <div className="flex gap-2">
              <div className="flex gap-4 pb-2 pl-2">
                <span className="text-bold-16">{comment.from.username}</span>
              </div>
              <span>{comment.content}</span>
            </div>
            <LikesCounter commentId={comment.id} postId={postId} />
          </div>
        ))}
        {comments?.items.length! > 3 && !allCommentsViewed && (
          <span
            className="opacity-50 pl-2 cursor-pointer"
            onClick={() => setAllCommentsViewed(true)}
          >
            View more Comments({comments?.items.length! - 3})
          </span>
        )}
      </div>
      <SendComment postId={postId} />
    </div>
  )
}
