import React, { useState } from 'react'

import { useCreateAnswerMutation } from '@/services/comments/answers/answers-api'
import Button from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import { cn } from '@/shared/utils/cn'

interface Props {
  commentId: number
  postId: number
}
export const SendAnswer = ({ commentId, postId }: Props) => {
  const [commentText, setCommentText] = useState<string>('')
  const [createAnswer] = useCreateAnswerMutation()
  const createNewAnswer = () => {
    createAnswer({
      commentId,
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
        placeholder="Add an answer..."
        value={commentText}
      />
      <Button
        className={cn('text-accent-500 active:border-none focus:border-none', {
          'border-none': commentText === '',
        })}
        disabled={commentText === ''}
        onClick={createNewAnswer}
        variant="text"
      >
        Publish
      </Button>
    </div>
  )
}
