import React from 'react'

import {
  useFollowingUserMutation,
  useUnFollowingUserMutation,
} from '@/services/users/users-following/usersFollowing-api'
import useIsMobile from '@/shared/hooks/useIsMobile'
import Button from '@/shared/ui/Button/Button'
import { cn } from '@/shared/utils/cn'
import router from 'next/router'

interface Props {
  fetchProfile: any
  isFollowing: boolean
  isProfileOwner: boolean
  userId: number
  name: string
  src: string
}

export const ButtonForOtherUsersProfile = ({
  fetchProfile,
  isFollowing,
  isProfileOwner,
  userId,
  src,
  name,
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

  const handlerClickSendMessage = () => {
    router.push({ pathname: `/message/${userId}`, query: { name, src } })
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
        <Button fullWidth onClick={handlerClickSendMessage} size="xxl" variant="secondary">
          Send Message
        </Button>
      </div>
    )
  )
}
