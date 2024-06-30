import React, {useState} from 'react'

import { Slider } from '@/entities/Slider/Slider'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { Description } from '@/entities/description/Description'
import {Modal} from '@/shared/ui/Modal/Modal';

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
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)



  return (
    <div className="flex gap-3 py-[36px] justify-between flex-wrap flex-grow">
      {posts?.map(post => {
        return (
          <div key={post.id}>
            {/*<Image alt={'PostImages'} height={240} src={post.images[0].url} width={234} />*/}
            <div onClick={() => setModalIsOpen(true)}>
              <Slider arrImages={post.images}  height={240} width={240} />
            </div>
            <UserAvatar avatar={post.avatarOwner} userName={post.userName} />
            <TimePublish createdAt={post.createdAt} />
            {post.description && <Description description={post.description} />}
            {modalIsOpen&&<Modal onClose={() => setModalIsOpen(false) } withOutHeader={true}>
              <div className="flex">
                <div>
                  <Slider arrImages={post.images}  height={560} width={490} />
                </div>
                <div className="px-[24px] py-[8px]">
                  <UserAvatar avatar={post.avatarOwner} userName={post.userName} />
                  <TimePublish createdAt={post.createdAt} />
                  Comments
                </div>
              </div>
            </Modal>}
          </div>
        )
      })}
    </div>
  )
}

export default PublicPosts
