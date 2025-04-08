import React from 'react'

import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { useGetPostLikeStatusQuery } from '@/entities/likesCounter/queries/likes-api'
import { useMeQuery } from '@/services/auth/signInApi'
import { useLazyGetPublicUserQuery } from '@/services/public/publicProfileCounts'
import {
  useFollowingUserMutation,
  useUnFollowingUserMutation,
} from '@/services/users/users-following/usersFollowing-api'
import useIsMobile from '@/shared/hooks/useIsMobile'
import { usePaginationParams } from '@/shared/hooks/usePaginationParams'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import SearchWithQueries from '@/shared/ui/Input/SearchWithQueries'
import { Modal } from '@/shared/ui/Modal/Modal'
import { cn } from '@/shared/utils/cn'

interface Props {
  onClose: () => void
  postId: number
}
export const LikesModal = ({ onClose, postId }: Props) => {
  const { paginationParams } = usePaginationParams()
  const { data: postLikes } = useGetPostLikeStatusQuery({ ...paginationParams, postId })
  const isMobile = useIsMobile(480)
  const me = useMeQuery()

  const { t } = useTranslation()

  const [fetchProfile, { data: newProfileInfo, isSuccess }] = useLazyGetPublicUserQuery()

  const [followUser] = useFollowingUserMutation()
  const [unFollow] = useUnFollowingUserMutation()

  return (
    <Modal
      className="w-full z-[1000]"
      contentClassName="p-[15px] sm:p-0 pt-0 bg-dark-700 sm:bg-dark-300 sm:pt-0 items-start justify-between"
      headerClassName="h-[60px]"
      modalClassName={cn('lg:w-[50%] sm:w-[80%] lg:min-w-[1000px] w-[100%] min-w-[320px] h-auto', {
        'h-full bg-dark-700 mt-[59px]': isMobile,
      })}
      onClose={onClose}
      title={t.home.likesModalTitle}
      withOutHeader={isMobile}
      withOutHeaderButtonClassName="hidden"
    >
      <div className="flex flex-col px-6 py-3 gap-3 w-full">
        <SearchWithQueries className="border-dark-100" placeholder="Search" />
        <div className="flex flex-col gap-3">
          {postLikes?.items.map(user => {
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
                {me?.data?.userId && me?.data?.userId !== user.userId && (
                  <Button
                    onClick={followUnfollowUser}
                    variant={user.isFollowing ? 'outline' : 'primary'}
                  >
                    {!user.isFollowing && <span>Follow</span>}
                    {user.isFollowing && <span>UnFollow</span>}
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
