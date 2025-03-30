import React from 'react'

import { LikesCounter } from '@/entities/likesCounter/LikesCounter'
import { MessageCircleMoreIcon } from '@/shared/ui/Animate-icons/message-circle-more'

import { Bookmark, Plane } from '../../../../public'

interface Props {
  id: number
}

export const PostActionPanel = ({ id }: Props) => {
  return (
    <div className="flex justify-between items-center py-2">
      <LikesCounter postId={id} withAvatar />
      <div className="flex gap-2 items-center">
        <MessageCircleMoreIcon className="bg-dark-700 hover:bg-dark-700" size={20} />
        <div className="pr-1">
          <Plane />
        </div>
        <Bookmark />
      </div>
    </div>
  )
}
