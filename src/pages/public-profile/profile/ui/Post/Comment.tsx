import React from 'react'

import { TimePublish } from '@/entities/TimePublish/TimePublish'
import { SingleComment } from '@/shared/types/public.types'
import Image from 'next/image'

interface Props {
  comment: SingleComment
}
export const Comment = ({ comment }: Props) => {
  const {
    answerCount,
    content,
    createdAt,
    from,
    id: commentId,
    isLiked,
    likeCount,
    postId,
  } = comment
  const { avatars, id: commentatorId, username } = from

  return (
    <div className="flex min-h-fit gap-2">
      <Image
        alt="likersAvatar"
        className={`rounded-full h-[36px] w-[36px]`}
        height={36}
        src={avatars[1].url}
        width={36}
      />
      <div className="flex flex-col justify-between">
        <div className="flex gap-2">
          {username} {content}
          <div className="text-bold-14"></div>
          <div className="text-regular-14"></div>
        </div>
        <TimePublish createdAt={createdAt} />
      </div>
    </div>
  )
}
