import React from 'react'

import { Description } from '@/entities/Post/Description'
import { Slider } from '@/entities/Slider/Slider'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { PostCardProps } from '@/shared/types/public.types'

export const PostCard = ({ openModal, post }: PostCardProps) => {
  return (
    <div className="max-w-[240px]" key={post.id}>
      <Slider arrImages={post.images} height={240} openModal={() => openModal(post)} width={240} />
      <UserAvatar avatar={post.avatarOwner} userName={post.userName} />
      <TimePublish createdAt={post.createdAt} />
      {post.description && <Description description={post.description} />}
    </div>
  )
}
