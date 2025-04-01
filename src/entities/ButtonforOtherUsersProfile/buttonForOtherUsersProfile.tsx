import React from 'react'

import {
  useFollowingUserMutation,
  useUnFollowingUserMutation,
} from '@/services/users/users-following/usersFollowing-api'
import useIsMobile from '@/shared/hooks/useIsMobile'
import Button from '@/shared/ui/Button/Button'
import { cn } from '@/shared/utils/cn'

interface Props {
  fetchProfile: any
  isFollowing: boolean
  isProfileOwner: boolean
  userId: number
}

export const ButtonForOtherUsersProfile = ({
  fetchProfile,
  isFollowing,
  isProfileOwner,
  userId,
}: Props) => {
  const [followUser] = useFollowingUserMutation()
  const [unFollow] = useUnFollowingUserMutation()
  const isMobile = useIsMobile(480)

  const followUnfollowUser = () => {
    if (!isFollowing) {
      followUser({ selectedUserId: userId })
    } else {
      unFollow(userId)
    }
    setTimeout(() => {
      fetchProfile(userId)
    }, 500)
  }

  return (
    !isProfileOwner && (
      <div
        className={cn('w-full', {
          'flex gap-4': !isMobile,
        })}
      >
        <Button
          className="mb-4"
          fullWidth
          onClick={followUnfollowUser}
          size="xxl"
          variant={isFollowing ? 'outline' : 'primary'}
        >
          {!isFollowing && <span>Follow</span>}
          {isFollowing && <span>UnFollow</span>}
        </Button>
        <Button fullWidth size="xxl" variant="secondary">
          Send Message
        </Button>
      </div>
    )
  )
}
