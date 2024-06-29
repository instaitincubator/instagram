import React from 'react'

import { Slider } from '@/entities/Slider/Slider'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { Description } from '@/entities/description/Description'

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
export type Images = {
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
  console.log(posts)

  return (
    <div className="flex gap-3 py-[36px] justify-between flex-wrap flex-grow">
      {posts?.map(post => {
        return (
          <div key={post.id}>
            {/*<Image alt={'PostImages'} height={240} src={post.images[0].url} width={234} />*/}
            <Slider arrImages={post.images}/>
            <UserAvatar avatar={post.avatarOwner} userName={post.userName} />
            <TimePublish createdAt={post.createdAt} />
            {post.description && <Description description={post.description} />}
          </div>
        )
      })}
    </div>
  )
}

export default PublicPosts
