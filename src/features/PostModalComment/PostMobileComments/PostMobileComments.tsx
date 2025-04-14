import React from 'react'

import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { SendComment } from '@/features/home/ui/PostComments/SendComment'
import { SingleComment } from '@/features/home/ui/PostComments/SingleComment/SingleComment'
import { FormatDateForPost } from '@/features/home/ui/formatDateForPost'
import { useGetAllPostCommentsQuery } from '@/services/comments/comments-api'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Image from 'next/image'

interface PropsComments {
  avatar: string
  createdAt: string
  description: string
  onClose: () => void
  ownerId: number
  postId: number
  username: string
}

const PostMobileComments = ({
  avatar,
  createdAt,
  description,
  onClose,
  ownerId,
  postId,
  username,
}: PropsComments) => {
  const { data: comments } = useGetAllPostCommentsQuery({
    postId,
    sortDirection: 'asc',
  })
  const { t } = useTranslation()

  return (
    <div className={'w-full '}>
      <div className="px-[20px] flex mb-[26px]">
        <Image
          alt={'Comments'}
          className={'cursor-pointer'}
          height={24}
          onClick={onClose}
          src={'/arrow-back-outline.svg'}
          width={24}
        />
        <span className={'m-auto text-h2'}>{t.comments}</span>
      </div>
      <div className="px-[20px] pb-[7px]">
        <div className="flex gap-2 pl-2  items-center ">
          <UserAvatar
            avatar={avatar}
            avatarSize={24}
            className={'py-0'}
            userId={ownerId}
            userName={username}
          />
          <span>{description}</span>
        </div>
        <div className={'flex pl-11 items-center text-regular-14 text-light-900'}>
          <FormatDateForPost createdAt={createdAt} />
        </div>
      </div>
      <div className=" border border-dark-100 w-full" />
      <div className={'px-[15px] pt-[19px]'}>
        <SingleComment comments={comments?.items!} isAllCommentViewed postId={postId} />
      </div>
      <div className="bg-dark-700 px-[15px] bottom-[60px]">
        <SendComment postId={postId} />
      </div>
    </div>
  )
}

export default PostMobileComments
