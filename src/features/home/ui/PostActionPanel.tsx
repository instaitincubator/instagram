import React from 'react'

import { LikesCounter } from '@/entities/likesCounter/LikesCounter'
import { PostLikesCounter } from '@/entities/likesCounter/PostLikesCounter'
import { MessageCircleMoreIcon } from '@/shared/ui/Animate-icons/message-circle-more'
import { cn } from '@/shared/utils/cn'

import { Bookmark, Plane } from '../../../../public'

interface Props {
  id: number
  likesCount: number
  messageIconClassname?: string
}

export const PostActionPanel = ({ id, likesCount, messageIconClassname }: Props) => {

  return (
    <div className="flex justify-between items-center py-2">
      <PostLikesCounter postId={id} withAvatar />
      <div className="flex gap-2 items-center">
        <MessageCircleMoreIcon
          className={cn('bg-dark-700 hover:bg-dark-700', messageIconClassname)}
          size={20}
        />
        <div className="pr-1">
          <Plane />
        </div>
        <Bookmark />
      </div>
    </div>
  )
}
