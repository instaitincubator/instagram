import React, { useState } from 'react'

import { Description } from '@/entities/Post/Description'
import { Slider } from '@/entities/Slider/Slider'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { PostCardProps } from '@/shared/types/public.types'
import { motion } from 'framer-motion'

export const PostCard = ({ openModal, post }: PostCardProps) => {
  const [isShowedText, setIsShowedText] = useState(false)
  const toggleShowedText = () => {
    setIsShowedText(!isShowedText)
  }

  return (
    <div
      className="max-w-[234px] max-h-[390px] h-[390px] grow flex flex-col relative"
      key={post.id}
    >
      <Slider arrImages={post.images} height={234} openModal={() => openModal(post)} width={234} />
      <motion.div
        animate={{ position: isShowedText ? 'absolute' : 'static' }}
        className={`${isShowedText ? 'absolute' : ''} bottom-0 bg-dark-700 `}
        initial={{ position: isShowedText ? 'static' : 'absolute' }}
        transition={{ duration: 5 }}
      >
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
