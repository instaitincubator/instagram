import React, { useState } from 'react'

import { PostImage } from '@/entities/PostImage/PostImage'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { Description } from '@/pages/public-profile/profile/ui/Post/Description'
import { PostCardProps } from '@/shared/types/public.types'
import { motion } from 'framer-motion'

export const PostCard = ({ openModal, post }: PostCardProps) => {
  const [isShowedText, setIsShowedText] = useState(false)
  const toggleShowedText = () => {
    setIsShowedText(!isShowedText)
  }

  return (
    <div className="max-h-[390px] h-[390px] grow flex-shrink-0 relative" key={post.id}>
      <PostImage
        arrImages={post.images}
        height={234}
        openModal={() => openModal(post)}
        width={234}
      />
      <motion.div className={`absolute bottom-0 bg-dark-700 min-h-[150px] w-full`}>
        <UserAvatar
          avatar={post.avatarOwner}
          isShowedText={isShowedText}
          toggleShowedText={toggleShowedText}
          userId={post.ownerId}
          userName={post.userName}
        />
        <TimePublish createdAt={post.createdAt} />
        {post.description && (
          <Description
            description={post.description}
            isShowedText={isShowedText}
            toggleShowedText={toggleShowedText}
          />
        )}
      </motion.div>
    </div>
  )
}
