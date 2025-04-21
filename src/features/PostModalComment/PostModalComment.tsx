import React, { useEffect, useState } from 'react'

import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { SingleComment } from '@/features/home/ui/PostComments/SingleComment/SingleComment'
import { useGetAllPostCommentsQuery } from '@/services/comments/comments-api'
import { useTranslation } from '@/shared/hooks/useTranslation'

interface Props {
  avatar: string
  description: string
  ownerId: number
  postId: number
  showCommentsModal: () => void
  username: string
}

const PostModalComment = ({
  avatar,
  description,
  ownerId,
  postId,
  showCommentsModal,
  username,
}: Props) => {
  const { data: comments } = useGetAllPostCommentsQuery({
    postId,
    sortDirection: 'asc',
  })
  const { t } = useTranslation()
  const [allCommentsViewed, setAllCommentsViewed] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1240) {
        setAllCommentsViewed(true)
      } else {
        setAllCommentsViewed(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const showModal = () => {
    showCommentsModal()
  }

  return (
    <div>
      <div className="flex flex-col-reverse gap-2">
        <div className="flex lg:hidden lg:invisible gap-4 pb-2 pl-2 items-center">
          <UserAvatar avatar={avatar} avatarSize={24} userId={ownerId} userName={username} />
          <span>{description}</span>
        </div>
        <div className="h-auto  md:hidden lg:block lg:h-[270px] overflow-y-auto">
          <div className="hidden invisible  lg:flex  lg:visible gap-4 pb-2 pl-2 items-center">
            <UserAvatar avatar={avatar} avatarSize={24} userId={ownerId} userName={username} />
            <span>{description}</span>
          </div>
          <SingleComment
            commentBottom={'hidden lg:flex'}
            comments={comments?.items!}
            isAllCommentViewed={allCommentsViewed}
            postId={postId}
            showAnswerClassName={'hidden md:flex md:flex-col'}
          />
        </div>
        {comments?.items.length! > 3 && !allCommentsViewed && (
          <span className="opacity-50 pl-2 cursor-pointer lg:hidden" onClick={showModal}>
            {t.home.moreComments}({comments?.items.length! - 3})
          </span>
        )}
      </div>
    </div>
  )
}

export default PostModalComment
