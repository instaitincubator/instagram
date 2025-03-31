import React, { ReactNode } from 'react'

import { CopyLink } from '@/shared/ui/icons/copyLink'
import { Follow } from '@/shared/ui/icons/follow'
import { Menu } from '@/shared/ui/icons/menu'
import { UnFollow } from '@/shared/ui/icons/unFollow'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface Props {
  children: ReactNode
  imageUrl?: string
}
export const MobilePostMenu = ({ children, imageUrl }: Props) => {
  const copyLinkHandler = () => {
    void navigator.clipboard.writeText(imageUrl!)
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex align-baseline">
        <Menu />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="text-light-100 mr-4 text-regular-14 bg-dark-500 w-fit rounded-sm border border-dark-100 px-2 py-3">
          {children}
          <DropdownMenu.Item className="group leading-none flex items-center h-9  relative select-none outline-none cursor-pointer">
            <Follow />
            <UnFollow />
            <span className="ml-[7px]">UnFollow</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="group leading-none flex items-center h-9 relative select-none outline-none cursor-pointer"
            onClick={copyLinkHandler}
          >
            <CopyLink />
            <span className="ml-[7px]">Copy Link</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
