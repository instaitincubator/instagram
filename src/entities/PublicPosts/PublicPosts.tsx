import React from 'react'

import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import Image from 'next/image'

type Post = {
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
type Owner = {
  firstname: string
  lastname: string
}
type Images = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
type Props = {
  posts: Post[]
}

const PublicPosts = ({ posts }: Props) => {
  return (
    <div className="flex py-[36px] justify-between">
      {posts?.map(post => {
        return (
          <div key={post.id}>
            <Image alt={'PostImages'} height={240} src={post.images[0].url} width={234} />
            <UserAvatar avatar={post.avatarOwner} userName={post.userName} />
            <div>пару минут назад</div>
          </div>
        )
      })}
    </div>
  )
}

export default PublicPosts
