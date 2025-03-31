import React from 'react'

import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { LikesCounter } from '@/entities/likesCounter/LikesCounter'
import { FormatDateForPost } from '@/features/home/ui/formatDateForPost'
import { useGetCommentAnswersQuery } from '@/services/comments/answers/answers-api'

interface Props {
  commentId: number
  postId: number
}

export const Answers = ({ commentId, postId }: Props) => {
  const { data: answers } = useGetCommentAnswersQuery({ commentId, postId, sortDirection: 'asc' })

  return (
    <div className="flex flex-col gap-2 pt-2">
      {answers?.items.map(answer => (
        <div className="w-full flex justify-between" key={answer.id}>
          <div>
            <div className="flex gap-2 items-center pl-9">
              <UserAvatar
                avatar={answer.from.avatars[1].url}
                avatarSize={24}
                className="py-0"
                userId={answer.from.id}
                userName={answer.from.username}
              />
              <span>{answer.content}</span>
            </div>
            <div className="flex gap-5 pl-9 items-center text-regular-14 text-light-900">
              <FormatDateForPost createdAt={answer.createdAt} />
              {answer.likeCount > 0 && <span>likes: {answer.likeCount}</span>}
            </div>
          </div>
          <div>
            <LikesCounter commentId={answer.id} postId={postId} />
          </div>
        </div>
      ))}
    </div>
  )
}
