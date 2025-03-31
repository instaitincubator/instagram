import React, { useState } from 'react'

import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { LikesCounter } from '@/entities/likesCounter/LikesCounter'
import { Answers } from '@/features/home/ui/PostComments/Answers/Answers'
import { SendAnswer } from '@/features/home/ui/PostComments/SingleComment/SendAnswer'
import { ShowAnswerButton } from '@/features/home/ui/PostComments/SingleComment/ShowAnswerButton'
import { FormatDateForPost } from '@/features/home/ui/formatDateForPost'
import { Comments } from '@/services/comments/CommentsApiTypes'

interface Props {
  comments: Comments[]
  isAllCommentViewed: boolean
  postId: number
}

export const SingleComment = ({ comments, isAllCommentViewed, postId }: Props) => {
  const showAllComments = isAllCommentViewed ? comments?.length : 3
  const [showAnswer, setShowAnswer] = useState<Record<number, boolean>>({})
  const [showAnswerInput, setShowAnswerInput] = useState<Record<number, boolean>>({})

  return comments?.slice(0, showAllComments).map(comment => {
    return (
      <div
        className="flex w-full justify-between p-2 border-2 rounded-2xl border-dark-300"
        key={comment.id}
      >
        <div className="w-full">
          <div>
            <div className="flex gap-2 items-center">
              <UserAvatar
                avatar={comment.from.avatars[1].url}
                avatarSize={24}
                className="py-0"
                userId={comment.from.id}
                userName={comment.from.username}
              />
              <span>{comment.content}</span>
            </div>
            <div className="flex gap-5 pl-9 items-center text-regular-14 text-light-900">
              <FormatDateForPost createdAt={comment.createdAt} />
              {comment.likeCount > 0 && <span>likes: {comment.likeCount}</span>}
              <span
                onClick={() =>
                  setShowAnswerInput(prev => ({
                    ...prev,
                    [comment.id]: !prev[comment.id],
                  }))
                }
              >
                {!showAnswerInput[comment.id] ? 'answer' : "don't answer"}
              </span>
            </div>
          </div>
          {comment.answerCount > 0 && (
            <ShowAnswerButton
              isAnswerShowed={showAnswer[comment.id] || false}
              onShowAnswerClick={() =>
                setShowAnswer(prev => ({
                  ...prev,
                  [comment.id]: !prev[comment.id],
                }))
              }
            />
          )}
          {showAnswer[comment.id] && <Answers commentId={comment.id} postId={postId} />}
          {showAnswerInput[comment.id] && <SendAnswer commentId={comment.id} postId={postId} />}
        </div>
        <div>
          <LikesCounter commentId={comment.id} postId={postId} />
        </div>
      </div>
    )
  })
}
