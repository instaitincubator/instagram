import React from 'react'

import { CopyLink } from '@/shared/ui/icons/copyLink'
import { Follow } from '@/shared/ui/icons/follow'
import { Menu } from '@/shared/ui/icons/menu'
import { UnFollow } from '@/shared/ui/icons/unFollow'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type MobilePostMenuProps = {
  imageUrl: string
}

export const MobilePostMenu = ({ imageUrl }: MobilePostMenuProps) => {
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
          <DropdownMenu.Item className="group leading-none flex items-center h-9  relative select-none outline-none">
            <Follow />
            <UnFollow />
            UnFollow
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="group leading-none flex items-center h-9 relative select-none outline-none"
            onClick={copyLinkHandler}
          >
            <CopyLink />
            Copy Link
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
