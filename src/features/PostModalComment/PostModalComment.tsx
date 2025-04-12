import React, { useState } from 'react'

import { Comment } from '@/entities/Post/Comment'
import { SendComment } from '@/features/home/ui/PostComments/SendComment'
import { SingleComment } from '@/features/home/ui/PostComments/SingleComment/SingleComment'
import { useGetAllPostCommentsQuery } from '@/services/comments/comments-api'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Modal } from '@storybook/components'

interface Props {
  description: string
  postId: number
  showCommentsModal: () => void
  username: string
}

const PostModalComment = ({ description, postId, showCommentsModal, username }: Props) => {
  const { data: comments } = useGetAllPostCommentsQuery({
    postId,
    sortDirection: 'asc',
  })
  const { t } = useTranslation()
  const [allCommentsViewed, setAllCommentsViewed] = useState<boolean>(false)

  const showModal = () => {
    showCommentsModal()
  }

  return (
    <div>
      <div className="flex gap-4 pb-2 pl-2">
        <span className="text-bold-16">{username}</span>
        <span>{description}</span>
      </div>
      <div className="h-60 overflow-y-auto">
        <SingleComment comments={comments?.items!} isAllCommentViewed postId={postId} />
      </div>
      {/*<SendComment postId={postId} />*/}
      {comments?.items.length! > 3 && !allCommentsViewed && (
        <span className="opacity-50 pl-2 cursor-pointer lg:hidden" onClick={showModal}>
          {t.home.moreComments}({comments?.items.length! - 3})
        </span>
      )}
    </div>
  )
}

export default PostModalComment
