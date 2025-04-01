import React, { useEffect } from 'react'

import { useUnFollowingUserMutation } from '@/services/users/users-following/usersFollowing-api'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { CopyLink } from '@/shared/ui/icons/copyLink'
import { Menu } from '@/shared/ui/icons/menu'
import { UnFollow } from '@/shared/ui/icons/unFollow'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/router'

interface Props {
  imageUrl: string
  userId: number
}

export const MobileFollowerPostMenu = ({ imageUrl, userId }: Props) => {
  const [unFollow, { isSuccess }] = useUnFollowingUserMutation()
  const router = useRouter()
  const t = useTranslation()

  const unFollowUserHandler = () => {
    unFollow(userId)
  }

  useEffect(() => {
    if (isSuccess) {
      router.reload()
    }
  }, [isSuccess])

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(imageUrl)
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex align-baseline">
        <Menu />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="text-light-100 mr-4 text-regular-14 bg-dark-500 w-fit rounded-sm border border-dark-100 px-2 py-3">
          <DropdownMenu.Item className="group leading-none flex items-center h-9  relative select-none outline-none cursor-pointer">
            <UnFollow />
            <span className="ml-[7px]" onClick={unFollowUserHandler}>
              {t.t.home.unfollow}
            </span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="group leading-none flex items-center h-9 relative select-none outline-none cursor-pointer"
            onClick={copyLinkHandler}
          >
            <CopyLink />
            <span className="ml-[7px]">{t.t.home.copyLink}</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
