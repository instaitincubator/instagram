import React, { useState } from 'react'

import { useCreateCommentMutation } from '@/services/comments/comments-api'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import { cn } from '@/shared/utils/cn'

interface Props {
  className?: string
  postId: number
}

export const SendComment = ({ className, postId }: Props) => {
  const [commentText, setCommentText] = useState<string>('')
  const [createComment] = useCreateCommentMutation()
  const { t } = useTranslation()
  const createNewComment = () => {
    createComment({
      content: commentText,
      postId,
    })
    setCommentText('')
  }

  return (
    <div className={cn('flex py-2', className)}>
      <Input
        className="border-none"
        fullWidth
        onChangeText={setCommentText}
        placeholder={t.home.addComment}
        value={commentText}
      />
      <Button
        className={cn('text-accent-500 active:border-none focus:border-none', {
          'border-none': commentText === '',
        })}
        disabled={commentText === ''}
        onClick={createNewComment}
        variant="text"
      >
        {t.home.publish}
      </Button>
    </div>
  )
}
