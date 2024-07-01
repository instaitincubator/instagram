import React from 'react'

import { Description } from '@/entities/Post/Description'
import { Slider } from '@/entities/Slider/Slider'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'

export type Post = {
  avatarOwner: string | undefined
  createdAt: string
  description: string | undefined
  id: number
  images: Images[]
  likesCount: number
  location: string | undefined
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}
export type Images = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export type Owner = {
  firstname: string
  lastname: string
}

type PostCardProps = {
  openModal: (post: Post) => void
  post: Post
}

export const PostCard = ({ openModal, post }: PostCardProps) => {
  return (
    <div>
      <div key={post.id}>
        {/*<Image alt={'PostImages'} height={240} src={post.images[0].url} width={234} />*/}
        <div>
          <Slider
            arrImages={post.images}
            height={240}
            openModal={() => openModal(post)}
            width={240}
          />
        </div>
        <UserAvatar avatar={post.avatarOwner} userName={post.userName} />
        <TimePublish createdAt={post.createdAt} />
        {post.description && <Description description={post.description} />}
      </div>
    </div>
  )
}
