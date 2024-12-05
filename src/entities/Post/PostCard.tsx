import React from 'react'

import { Description } from '@/entities/Post/Description'
import { Slider } from '@/entities/Slider/Slider'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { PostCardProps } from '@/shared/types/public.types'

export const PostCard = ({ openModal, post }: PostCardProps) => {
  return (
    <div className="max-w-[234px] grow" key={post.id}>
      <Slider arrImages={post.images} height={234} openModal={() => openModal(post)} width={234} />
      <UserAvatar avatar={post.avatarOwner} userId={post.ownerId} userName={post.userName} />
      <TimePublish createdAt={post.createdAt} />
      {post.description && <Description description={post.description} />}
    </div>
  )
}
