import React, { useState } from 'react'

import { useCreateCommentMutation } from '@/services/comments/comments-api'
import Button from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'

interface Props {
  postId: number
}

export const SendComment = ({ postId }: Props) => {
  const [commentText, setCommentText] = useState<string>('')
  const [createComment] = useCreateCommentMutation()
  const createNewComment = () => {
    createComment({
      content: commentText,
      postId,
    })
    setCommentText('')
  }

  return (
    <div className="flex py-2">
      <Input
        className="border-none"
        fullWidth
        onChangeText={setCommentText}
        placeholder="Add a Comment..."
        value={commentText}
      />
      <Button
        className="text-accent-500 active:border-none focus:border-none"
        onClick={createNewComment}
        variant="text"
      >
        Publish
      </Button>
    </div>
  )
}
