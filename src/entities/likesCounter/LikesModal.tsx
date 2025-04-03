import React, { useState } from 'react'

import { ButtonForOtherUsersProfile } from '@/entities/ButtonforOtherUsersProfile/buttonForOtherUsersProfile'
import { EDIT_POST_STATUS } from '@/entities/Post/PostTypes'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { Items } from '@/entities/likesCounter/queries/likesApiTypes'
import { usePublicationForm } from '@/features/publication-form/usePublicationForm'
import { useLazyGetPublicUserQuery } from '@/services/public/publicProfileCounts'
import {
  useFollowingUserMutation,
  useUnFollowingUserMutation,
} from '@/services/users/users-following/usersFollowing-api'
import useIsMobile from '@/shared/hooks/useIsMobile'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { PostsPublicItems } from '@/shared/types/ApiTypes/ProfileApiTypes'
import { CommentForPost } from '@/shared/types/public.types'
import Button from '@/shared/ui/Button/Button'
import SearchWithQueries from '@/shared/ui/Input/SearchWithQueries'
import { Modal } from '@/shared/ui/Modal/Modal'
import { cn } from '@/shared/utils/cn'
import Image from 'next/image'

interface Props {
  deletePostCallback: () => void
  editPost: () => void
  onClose: () => void
  users: Items[]
}
export const LikesModal = ({ deletePostCallback, editPost, onClose, users }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenForEdit, setIsOpenForEdit] = useState(false)
  const [status, setStatus] = useState<EDIT_POST_STATUS.EDIT | EDIT_POST_STATUS.INITIAL>(
    EDIT_POST_STATUS.INITIAL
  )
  const isMobile = useIsMobile(480)
  const { t } = useTranslation()
  // const { control, errors, handleSubmit } = usePublicationForm({ description: post.description })
  const onSubmit = (data: { description?: string }) => {
    if (data.description) {
      // if (data.description === post.description) {
      //   setStatus(EDIT_POST_STATUS.INITIAL)
      // } else {
      // editPost(post.id, data.description)
      // setStatus(EDIT_POST_STATUS.INITIAL)
      // }
    }
  }
  const [fetchProfile, { data: newProfileInfo, isSuccess }] = useLazyGetPublicUserQuery()
  const onCloseEditor = (data: { description?: string }) => {
    // if (status === EDIT_POST_STATUS.INITIAL) {
    //   onClose()
    // }
    // if (data.description === post.description) {
    //   setStatus(EDIT_POST_STATUS.INITIAL)
    // } else {
    //   setIsOpenForEdit(true)
    // }
  }

  const [followUser] = useFollowingUserMutation()
  const [unFollow] = useUnFollowingUserMutation()

  return (
    <Modal
      className="w-full z-80"
      contentClassName="p-[15px] sm:p-0 pt-0 bg-dark-700 sm:bg-dark-300 sm:pt-0 items-start justify-between"
      headerClassName="h-[60px]"
      modalClassName={cn('lg:w-[50%] sm:w-[80%] lg:min-w-[1000px] w-[100%] min-w-[320px] h-auto', {
        'h-full bg-dark-700 mt-[59px]': isMobile,
      })}
      onClose={onClose}
      title="Likes"
      withOutHeader={isMobile}
      withOutHeaderButtonClassName="hidden"
    >
      <div className="flex flex-col px-6 py-3 gap-3 w-full">
        <SearchWithQueries placeholder="Search" />
        <div className="flex flex-col gap-3">
          {users.map(user => {
            console.log(user)
            const followUnfollowUser = () => {
              if (!user.isFollowing) {
                followUser({ selectedUserId: user.userId })
              } else {
                unFollow(user.userId)
              }
              setTimeout(() => {
                fetchProfile(user.userId)
              }, 500)
            }

            return (
              <div className="flex justify-between items-center" key={`User-${user.id}`}>
                <div className="flex gap-[12px] items-center">
                  <UserAvatar
                    avatar={user.avatars.length > 1 ? user.avatars[1].url : '/avatar.png'}
                    userId={user.userId}
                    userName={user.userName}
                  />
                </div>
                <Button
                  onClick={followUnfollowUser}
                  variant={user.isFollowing ? 'outline' : 'primary'}
                >
                  {!user.isFollowing && <span>Follow</span>}
                  {user.isFollowing && <span>UnFollow</span>}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
