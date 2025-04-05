import React, { useState } from 'react'

import { Comment } from '@/entities/Post/Comment'
import { useGetAllPostCommentsQuery } from '@/services/comments/comments-api'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Modal } from '@storybook/components'

interface Props {
  description: string
  postId: number
  username: string
}

const PostModalComment = ({ description, postId, username }: Props) => {
  const { data: comments } = useGetAllPostCommentsQuery({
    postId,
    sortDirection: 'asc',
  })
  const { t } = useTranslation()
  const [allCommentsViewed, setAllCommentsViewed] = useState<boolean>(false)

  return (
    <div>
      <div className="flex gap-4 pb-2 pl-2">
        <span className="text-bold-16">{username}</span>
        <span>{description}</span>
      </div>

      {comments?.items.length! > 3 && !allCommentsViewed && (
        <span className="opacity-50 pl-2 cursor-pointer" onClick={() => setAllCommentsViewed(true)}>
          {t.home.moreComments}({comments?.items.length! - 3})
        </span>
      )}
      {/*<Modal className={'z-100 bg-white'}>feffefef</Modal>*/}
    </div>
  )
}

export default PostModalComment
